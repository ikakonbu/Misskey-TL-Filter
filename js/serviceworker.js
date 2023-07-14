chrome.action.disable();
chrome.action.setIcon({path:"../img/icon_disable.png"});

const serverlist = ['misskey.io',
'misskey.design',
'nijimiss.moe',
'sushi.ski',
'trpger.us',
'oekakiskey.com',
'novelskey.tarbin.net',
'misskey.yukineko.me',
'submarin.online',
'misskey.art',
'nekomiya.net',
'ikaskey.bktsk.com',
'misskey.gamelore.fun',
'mattyaski.co',
'misskey.ranranhome.info',
'eostagram.com',
'side.misskey.productions',
'labo.wovs.tk',
'buicha.social',
'misskey.niri.la',
'voskey.icalo.net',
'misskey.04.si',
'live-theater.net',
'otoskey.tarbin.net',
'rhythmisskey.games',
'misskey.backspace.fm',
'mk.shrimpia.network',
'misskey.systems',
'seikora.one',
'mi.cbrx.io',
'misskey.life',
'yurisskey.yubarira.net',
'drdr.club',
'invillage-outvillage.com',
'sk.204.jp',
'45sukey.net',
'misskey.kindworld.one',
'misskey.sda1.net',
'ojousama-tea.party',
'mof.rorea.moe',
'mk.yopo.work',
'maniakey.com',
'friendsyu.me',
'warpday.net',
'mi-wo.site',
'kawaiivrc.site',
'n-kaiwai.work',
'fix.misskey.life',
'msk.ilnk.info'];

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

const currenttab = getCurrentTab();
currenttab.then((result) => {
    if(result.id){
        chrome.tabs.get(result.id, (tab) => { 
            CheckURL(tab);
        }); 
    }
});

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
    if(serverlist.indexOf(uri.hostname) != -1){
        console.log('hit default serverlist');
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
        chrome.action.setIcon({path:"../img/icon_48.png"});
    } else {
        chrome.action.disable(tabid);
        chrome.action.setIcon({path:"../img/icon_disable.png"});
    }
}