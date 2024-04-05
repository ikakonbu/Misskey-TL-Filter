chrome.action.disable();
chrome.action.setIcon({path:"../img/icon_disable.png"});
chrome.action.setTitle({title:"Misskey TL Filter"});

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

const currenttab = getCurrentTab();
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

    /*check default setting*/
    /*if(serverlist.indexOf(uri.hostname) != -1){
        console.log('hit default serverlist');
        setpopupstate(tab.id, true);
        return;
    } else {
        setpopupstate(tab.id, false);
    }*/

    /*misskey auto detection*/
    let elemcheck = chrome.scripting.executeScript({
        target : {tabId: tab.id},
        func : checkmisskey,
    });
    elemcheck.then((value) => {
        if(value[0].result != false){
            setpopupstate(tab.id, true, value[0].result);
            //chrome.action.enable(tab.id);
            //chrome.action.setIcon({path:"../img/icon_48.png"});
        } else {
            setpopupstate(tab.id, false, false);
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