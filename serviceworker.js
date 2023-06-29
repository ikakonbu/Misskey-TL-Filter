chrome.action.disable();
chrome.action.setIcon({path:"icon_disable.png"});

chrome.tabs.onUpdated.addListener((tabId, changeinfo, tab) => {
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
    let uri = new URL(tab.url);

    /*check default setting*/
    if(uri.hostname.indexOf('misskey.io') != -1){
        setpopupstate(tab.id, true);
        return;
    } else {
        setpopupstate(tab.id, false);
    }

    /*check user setting*/
    chrome.storage.local.get(["setting1"]).then((result) => {
    if(result.setting1){
        let urls = result.setting1.split(',');
        for(let url of urls){
            if(uri.hostname.indexOf(url) != -1){
                setpopupstate(tab.id, true);
                return;
            }
        }
    }
    });
}

function setpopupstate(tabid, flag){
    if(flag){
        chrome.action.enable(tabid);
        chrome.action.setIcon({path:"icon_48.png"});
    } else {
        chrome.action.disable(tabid);
        chrome.action.setIcon({path:"icon_disable.png"});
    }
}