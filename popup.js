document.addEventListener('DOMContentLoaded', function () {

    // element of checkbox ,text input and scroll button
    const targets = document.querySelectorAll(`input[type="checkbox"].filterbtn`);
    const targets2 = document.querySelectorAll(`input[type="text"]`);
    const exportbtn = document.querySelector(`button[class="export"]`);
    let left = document.querySelector('.scrollleft');
    let right = document.querySelector('.scrollright');
    let scrolltarget = document.querySelector('.flex.left');
    const scroolloffset = 450; 
    var csscode='';
    let domainname = '';

    // css code templete
    const stylecode = {
        rn:':is(div[style="position: sticky; top: var(--stickyTop, 0); z-index: 1000;"]:has(.xj7PE .xjQuN unko),header:has(unko))~div .xcSej.x3762:has(.xBwhh) { display: none;}',
        quote:':is(div[style="position: sticky; top: var(--stickyTop, 0); z-index: 1000;"]:has(.xj7PE .xjQuN unko),header:has(unko))~div .xcSej.x3762:has(.xnihJ) { display: none;}',
        nsfw:':is(div[style="position: sticky; top: var(--stickyTop, 0); z-index: 1000;"]:has(.xj7PE .xjQuN unko),header:has(unko))~div .xcSej.x3762:has(.ti-alert-triangle) { display: none !important; }',
        cw: ':is(div[style="position: sticky; top: var(--stickyTop, 0); z-index: 1000;"]:has(.xj7PE .xjQuN unko),header:has(unko))~div .xcSej.x3762:has(.xd2wm) { display: none;}',
        media: ':is(div[style="position: sticky; top: var(--stickyTop, 0); z-index: 1000;"]:has(.xj7PE .xjQuN unko),header:has(unko))~div .xcSej.x3762:has(.xbIzI){ display: none;}',
        bot: ':is(div[style="position: sticky; top: var(--stickyTop, 0); z-index: 1000;"]:has(.xj7PE .xjQuN unko),header:has(unko))~div .xcSej.x3762:has(.xEKlD) { display: none;}',
        samesever: ':is(div[style="position: sticky; top: var(--stickyTop, 0); z-index: 1000;"]:has(.xj7PE .xjQuN .ti-whirl),header:has(.ti-whirl))~div .xcSej.x3762:not(:has(.xuevx)) { display: none; }',
        reply: ':is(div[style="position: sticky; top: var(--stickyTop, 0); z-index: 1000;"]:has(.xj7PE .xjQuN unko),header:has(unko))~div .xcSej.x3762:has(.x48yH > .x9PYN) { display: none;}',
        channel: '.xcSej.x3762:has(.xww2J) { display: none;}',
        allmedia: '.xcSej.x3762:has(.xbIzI){ display: none;}',
        usermute: '.xcSej.x3762:has(a[href="/@unko"]){ display: none; }',
        userrenotemute: '.xcSej.x3762:has(.xBwhh > a[href="/@unko"]){ display: none; }',
        rocket: '.xcSej.x3762:has(.xuevx){ display: none; }',
        norocket: '.xcSej.x3762:not(:has(.xuevx)) { display: none; }',
        userstatus: '.status a:nth-child(n+2)  b,.x1tDq .x33Tu:nth-child(n+2) div:nth-child(2), .xyEEg .x8w8X:nth-child(n+2) span{font-size: 0;}.status a:nth-child(n+2)  b:after,.x1tDq .x33Tu:nth-child(n+2) div:nth-child(2):after, .xyEEg .x8w8X:nth-child(n+2) span:after{ content: "???"; font-size: 14px;}',
        emojibetter: ':root {    --emoji_default_size: 30px;    --emoji_margin_lr: 6px;    --emoji_margin_tb: 2px;    --emoji_max_size: 80px;    --emoji_displey_style: fill;      --emoji_window_default_height: 400px;      --emoji_window_default_width: 400px;    --emoji_autofill_max_width:  300px;    --emoji_autofill_displey_style: fill;}.emojis {  padding:  10px 5px 5px;  text-align:center;}.emojis section>.body {  display: inline !important;  padding:  0 !important;  line-height: 0;}.emojis section>.body .item{  height: auto !important;}button:has(.emoji){  aspect-ratio: auto!important;  width: fit-content !important;  contain: layout !important;  margin: 0px !important;  padding: var(--emoji_margin_tb)  var(--emoji_margin_lr)  !important;  min-height:  var(--emoji_default_size) !important;}button:has(.emoji) img{  width: auto !important;  height: var(--emoji_default_size) !important;  object-fit: var(--emoji_displey_style) !important;  object-position: 0% 50%;  max-width: var(--emoji_max_size);} .xeJ4G.xuoKL, ._emoji_1pjrm_56 {  width: auto !important;  object-fit: var(--emoji_autofill_displey_style) !important;  object-position: 0% 50%;  max-width: var(--emoji_autofill_max_width);}'
    };
    const transitioncode = "<style> * { transition: background-color .5s; } </style>"



    /*create css code and save from now settings*/
    function CreateCSS(){
        csscode="";
        //Judges which CSS to apply based on the unique attributes assigned to the HTML of the checkbox and generates code
        for (let target of targets) {
            if(target.checked){
                if(target.dataset.name == 'x5oN2.xbw4c'){
                    csscode += stylecode[target.dataset.kinds].replaceAll('header:has(unko)',"header:has(.ti-list)").replaceAll('unko',"." + target.dataset.name).replaceAll('.no-add',"").replaceAll('.xj7PE .xjQuN',"") + "\n";
                } else if(target.dataset.name == 'ti-badge'){
                    csscode += stylecode[target.dataset.kinds].replaceAll('header:has(unko)',"header:has(.ti-badge)").replaceAll('unko',"." + target.dataset.name).replaceAll('.no-add',"").replaceAll('.xj7PE .xjQuN',"").replaceAll(':is(',":is(.xbt7a:has(.ti-badge),") + "\n";
                } else {
                    csscode += stylecode[target.dataset.kinds].replaceAll('unko',"." + target.dataset.name).replaceAll('.no-add',"") + "\n";
                }
            }
        }
        //User Mute input
        if(targets2[0].value != ''){
            let muteuserlist = targets2[0].value.split(',');
            for(let name of muteuserlist){
                csscode += stylecode['usermute'].replaceAll('unko',name) + "\n";
            }
        }
        //User Renote Mute input
        if(targets2[1].value != ''){
            let muteuserlist = targets2[1].value.split(',');
            for(let name of muteuserlist){
                csscode += stylecode['userrenotemute'].replaceAll('unko',name) + "\n";
            }
        }
    }

    /*Update CSS from arg (excute script)*/
    function UpdateCSS(styles){
        document.querySelector(`.filtercsswrapper`).innerHTML=styles;
        localStorage.setItem('lastcss',styles);
    }

    /*Get page Domain (excute script)*/
    function GetDomain(){
        return document.domain;
    }

    /*save current setting in localstorage*/
    function SaveSetting(){
        for (let target of targets) {
            localStorage.setItem('button-' + target.dataset.name + '-' + target.dataset.kinds + domainname, target.checked? 1 : 0);
        }
        localStorage.setItem('list-muteuser' + domainname, targets2[0].value);
        localStorage.setItem('list-muteuserrenote' + domainname, targets2[1].value);
        localStorage.setItem('allow-other-server' + domainname, targets2[2].value);
        /*this setting use service worker. but this dont access localstorage. so save to chrome storage API*/
        chrome.storage.local.set({setting1: targets2[2].value});
        localStorage.setItem('saved' + domainname , '1');
    }

    /*load settings from localStorage*/
    function LoadSetting(){
        /*when first time, previous setup don't exist, so nothing*/
        if(!localStorage.getItem('saved' + domainname)) {
            return;
        }
        for (let target of targets) {
            target.checked = (localStorage.getItem('button-' + target.dataset.name + '-' + target.dataset.kinds + domainname)== '1')? 1: 0;
        }
        targets2[0].value = localStorage.getItem('list-muteuser' + domainname);
        targets2[1].value = localStorage.getItem('list-muteuserrenote' + domainname);
        chrome.storage.local.get(["setting1"]).then((result) => {
            targets2[2].value = result.setting1;
        });
    }

    /*export css code*/
    function ExportCSS(){
        CreateCSS();
        const blob = new Blob(['/*今のMisskey-TL-FIlterの設定と同一のフィルタリングができるカスタムCSSです。\nこのコードをコピーして、フィルタを設定したいパソコン、スマホのmisskeyの設定→全般→カスタムCSS の中に貼り付けてください*/\n' + csscode],{type:"text/plain"});
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'Export.css';
        link.click();
        link.remove();
    }

    /*scroll button event*/
    left.addEventListener(`click`, () => {
        var targetpositon = scrolltarget.scrollLeft;
        scrolltarget.scrollTo({
            left: targetpositon - scroolloffset,
            behavior: 'smooth'
          });
    })
    right.addEventListener(`click`, () => {
        var targetpositon = scrolltarget.scrollLeft;
        scrolltarget.scrollTo({
            left: targetpositon + scroolloffset,
            behavior: 'smooth'
          });
    })

    /*Get the domain of tab which currently open 
    & load setting for current domain*/
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        const tabquery = chrome.scripting.executeScript({
            target: { tabId : tabs[0].id },
            func: GetDomain,
        });
        tabquery.then((value) => {
            console.log(value[0].result);
            domainname = value[0].result; 
            LoadSetting();
        })
        .catch(err => alert("設定の読み込みでエラーが発生しました、再読み込みしてみてね"));
    });

    //Set　event listeners to rewrite　CSS when checkbox and textarea are changed
    for (let target of targets) {
    target.addEventListener(`change`, () => {
        CreateCSS();
        SaveSetting();
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.scripting.executeScript({
                target : {tabId : tabs[0].id},
                func : UpdateCSS,
                args : [csscode]
            });
        });
    })
    }
    for (let target of targets2) {
        target.addEventListener(`change`, () => {
            CreateCSS();
            SaveSetting();
            chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                chrome.scripting.executeScript({
                    target : {tabId : tabs[0].id},
                    func : UpdateCSS,
                    args : [csscode]
                });
            });
        })
    }
    /*set export button event*/
    exportbtn.addEventListener('click', () => {
        ExportCSS();
    })

    setTimeout(function(){ 
        document.querySelector(`head`).insertAdjacentHTML('beforeend', transitioncode)
    },500);
});