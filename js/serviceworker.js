//init
var BrowserType = "other";
chrome.action.disable();
chrome.action.setIcon({path:"../img/icon_disable.png"});
chrome.action.setTitle({title:"Misskey TL Filter"});


//Get the currently active tab
async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

//Determine if the site you are currently viewing is misskey.
function checkmisskey(test){
    let misskey_elm = document.querySelector("#misskey_app");
    if(misskey_elm != null){
        return document.domain;
    } else {
        return false;
    }
}

//Determine which browser is being used
function judgeChrome(){
    let agent = window.navigator;
    if(agent.vendor != "Google Inc."){
        return "firefox";
    } else {
        if(agent.userAgentData.brands.length > 0) {
            let brandname = agent.userAgentData.brands[0].brand;
            switch(brandname){
                case "Opera":
                    return "opera";
                case "Google Chrome":
                    return "chrome";
            }
            brandname = agent.userAgentData.brands[1].brand;
            switch(brandname){
                case "Google Chrome":
                    return "chrome";
                case "Microsoft Edge":
                    return "edge";
                //case "Chromium":
                //    return "chromium";
            }
        }
        return "chromium";
    }
}


/*check url and enable tabid's tab popup 
  when url is misskey.io or user seted url*/
function Main_Work(tab){

    let tabstate = false;
    let uri = null;
    try{
        tabstate = tab.hasOwnProperty('url');
    } catch(e) {
        console.log(e);
        SetAction(tab.id, false, false);
        return;
    }

    if(!tabstate || (tab.url.indexOf("http://") == -1 && tab.url.indexOf("https://") == -1 && tab.url.indexOf("chrome-extension://") == -1)){
        SetAction(tab.id, false, false);
        return;
    }

    try {
        uri = new URL(tab.url);
    } catch (e) {
        SetAction(tab.id, false, false);
        return;
    }

    /*misskey auto detection*/
    let ismisskey = chrome.scripting.executeScript({
        target : {tabId: tab.id},
        func : checkmisskey,
    });
    let Chromeflg = chrome.scripting.executeScript({
        target : {tabId: tab.id},
        func : judgeChrome,
    });
    Promise.all([ismisskey, Chromeflg])
    .then((values) => {
        let Domain_Name = values[0][0].result;
        let BrowserType = values[1][0].result;

        if(BrowserType == "chrome" || BrowserType == "edge") {
            chrome.sidePanel.setOptions({ path: "disable.html",  enabled: true });
        } else if(BrowserType == "chromium"){
            chrome.sidePanel.setOptions({ path: "disable.html",  enabled: true });
        } else if(BrowserType == "opera"){
            opr.sidebarAction.setPanel({panel: "popup.html"});  
        } else if(BrowserType == "firefox"){
            browser.sidebarAction.setPanel({panel: "disable.html"});
        }
        SetAction(tab.id, (Domain_Name!=false)? true : false , Domain_Name, BrowserType);
    });
}

//Set extension sidebar, popup, and icon status
function SetAction(tabid, active, domainname, browsertype){
    let keyname = "nowactive-" + domainname;
    chrome.storage.local.get(keyname, function (value) {
        isfiltering = Number(value['nowactive-' + domainname]);
        if(active){
            if(isfiltering==1){
                chrome.action.enable(tabid);
                chrome.action.setIcon({path:"../img/icon_48_active.png"});
                chrome.action.setTitle({title:"Misskey TL Filter - Filtering ON"});
            } else {
                chrome.action.enable(tabid);
                chrome.action.setIcon({path:"../img/icon_48.png"});
                chrome.action.setTitle({title:"Misskey TL Filter - Filtering OFF"});
            }
            let keyname = "openinsidebar";
            if(browsertype == "chrome" || browsertype == "edge"){
                chrome.storage.local.get(keyname, function (value) {
                    let state = (value[keyname] === true)? true : false;
                    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: state })
                });
                chrome.sidePanel.setOptions({ path: "popup.html", tabId: tabid, enabled: true });
            } else if(browsertype == "chromium"){
                chrome.sidePanel.setOptions({ path: "popup.html",  enabled: true });
            } else if(browsertype == "opera"){
                opr.sidebarAction.setPanel({panel: "disable.html"});
            } else if(browsertype == "firefox"){
                browser.sidebarAction.setPanel({panel: "popup.html", tabId: tabid});
            } else {
                chrome.sidePanel.setOptions({ path: "disable.html", tabId: tabid, enabled: true });
            }
        } else {
            chrome.action.disable(tabid);
            chrome.action.setIcon({path:"../img/icon_disable.png"});
            if(browsertype == "chrome" || browsertype == "edge"){
                chrome.sidePanel.setOptions({ path: "disable.html", tabId: tabid, enabled: true });
            } else if(browsertype == "chromium"){
                chrome.sidePanel.setOptions({ path: "disable.html",  enabled: true });
            } else if(browsertype == "opera"){
                opr.sidebarAction.setPanel({panel: "disable.html"});
            } else if(browsertype == "firefox"){
                browser.sidebarAction.setPanel({panel: "disable.html", tabId: tabid});
            } else {
                chrome.sidePanel.setOptions({ path: "disable.html", tabId: tabid, enabled: true });
            }
        }
    });
}


chrome.tabs.onUpdated.addListener((tab_Id, changeinfo, tab) => {
    if(changeinfo.status == "complete"){
        Main_Work(tab);
    }
});

chrome.tabs.onActivated.addListener((result) => {
    chrome.tabs.get(result.tabId, (tab) => {
        Main_Work(tab);
    })
});

chrome.tabs.onAttached.addListener((result) => {
    chrome.tabs.get(result.tabId, (tab) => {
        Main_Work(tab);
    })
});


 getCurrentTab().then((result) => {
     if(result.id){
         chrome.tabs.get(result.id, (tab) => { 
             Main_Work(tab);
         }); 
     }
 });