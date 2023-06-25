chrome.action.disable();

chrome.tabs.onUpdated.addListener((tabId, changeinfo, tab) => {
    if(changeinfo.status == "complete"){
        if(tab.url.indexOf('misskey.io') != -1){
            chrome.action.enable(tabId);
        } else {
            chrome.action.disable(tabId);
        }
    }
});