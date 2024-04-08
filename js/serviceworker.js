chrome.action.disable();
chrome.action.setIcon({path:"../img/icon_disable.png"});
chrome.action.setTitle({title:"Misskey TL Filter"});

function checkmisskey(test){
    let misskey_elm = document.querySelector("#misskey_app");
    if(misskey_elm != null){
        return document.domain;
    } else {
        return false;
    }
}

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

var currenttab = getCurrentTab();
currenttab.then((result) => {
    if(result.id){
        chrome.tabs.get(result.id, (tab) => { 
            CheckURL(tab);
        }); 
    }
});

chrome.tabs.onUpdated.addListener((tab_Id, changeinfo, tab) => {
    if(changeinfo.status == "complete"){
        CheckURL(tab);
    }
});

chrome.tabs.onActivated.addListener((result) => {
    chrome.tabs.get(result.tabId, (tab) => {
        CheckURL(tab);
    })
});

/*check url and enable tabid's tab popup 
  when url is misskey.io or user seted url*/
function CheckURL(tab){
    let uri = null;
    try {
        uri = new URL(tab.url);
    } catch (e) {
        console.log('url get error: URL check process was aborted');
        return;
    }
    if(uri.toString().indexOf("chrome://")==0){
        return;
    }

    /*misskey auto detection*/
    let elemcheck = chrome.scripting.executeScript({
        target : {tabId: tab.id},
        func : checkmisskey,
    });
    elemcheck.then((value) => {
        if(value[0].result != false){
            setpopupstate(tab.id, true, value[0].result);
            chrome.sidePanel.setOptions({
                path: "popup.html",
                tabId: tab.id,
                enabled: true,
              });
        } else {
            setpopupstate(tab.id, false, false);
            chrome.sidePanel.setOptions({
                path: "disable.html",
                tabId: tab.id,
                enabled: true,
            });
        }
    });
}


function setpopupstate(tabid, flag, domainname){
    let keyname = "nowactive-" + domainname;
    chrome.storage.local.get(keyname, function (value) {
        active = Number(value['nowactive-' + domainname]);
        console.log("storage[nowactive-" + domainname + "]= " + active);
        if(flag){
            if(active==1){
                chrome.action.enable(tabid);
                chrome.action.setIcon({path:"../img/icon_48_active.png"});
                chrome.action.setTitle({title:"Misskey TL Filter - Filtering ON"});
            } else {
                chrome.action.enable(tabid);
                chrome.action.setIcon({path:"../img/icon_48.png"});
                chrome.action.setTitle({title:"Misskey TL Filter - Filtering OFF"});
            }
        } else {
            chrome.action.disable(tabid);
            chrome.action.setIcon({path:"../img/icon_disable.png"});
        }
    });
}