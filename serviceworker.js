chrome.action.disable();
chrome.action.setIcon({path:"icon_disable.png"});

chrome.tabs.onUpdated.addListener((tabId, changeinfo, tab) => {
    let uri = new URL(tab.url);
    if(changeinfo.status == "complete"){
        if(uri.hostname.indexOf('misskey.io') != -1){
            chrome.action.enable(tabId);
            chrome.action.setIcon({path:"icon_48.png"});
        } else {
            chrome.action.disable(tabId);
            chrome.action.setIcon({path:"icon_disable.png"});
        }

        /*when access other misskey server which user setting other server address, 
          enable extension.*/
        chrome.storage.local.get(["setting1"]).then((result) => {
        if(result.setting1){
            console.log(result.setting1);
            let urls = result.setting1.split(',');
            for(let url of urls){
                if(uri.hostname.indexOf(url) != -1){
                    chrome.action.enable(tabId);
                    chrome.action.setIcon({path:"icon_48.png"});
                }
            }
        }
        });
    }
});