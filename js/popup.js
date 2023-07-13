document.addEventListener('DOMContentLoaded', function () {

    // element of checkbox ,text input, button and scroll button
    const chcckbox_elements = document.querySelectorAll(`input[type="checkbox"].filterbtn`);
    const text_elements = document.querySelectorAll(`input[type="text"]`);
    const exportbtn = document.querySelector(`button[class="export"]`);
    let left = document.querySelector('.scrollleft');
    let right = document.querySelector('.scrollright');
    let scrolltarget = document.querySelector('.flex.left');

    const scroolloffset = 450; 
    var csscode='';
    let domainname = '';

    /*CSSs which select specfic timeline*/
    const tlselector = {
        home: ':is(div[style="position: sticky; top: var(--stickyTop, 0); z-index: 1000;"]:has(.xj7PE .xjQuN .ti-home),header:has(.ti-home))~div ',
        local: ':is(div[style="position: sticky; top: var(--stickyTop, 0); z-index: 1000;"]:has(.xj7PE .xjQuN .ti-planet),header:has(.ti-planet))~div ',
        social: ':is(div[style="position: sticky; top: var(--stickyTop, 0); z-index: 1000;"]:has(.xj7PE .xjQuN .ti-rocket),header:has(.ti-rocket))~div ',
        global: ':is(div[style="position: sticky; top: var(--stickyTop, 0); z-index: 1000;"]:has(.xj7PE .xjQuN .ti-whirl),header:has(.ti-whirl))~div ',
        list: ':is(div[style="position: sticky; top: var(--stickyTop, 0); z-index: 1000;"]:has(.x5oN2.xbw4c),header:has(.ti-list))~div ',
        role: ':is(.xbt7a:has(.ti-badge), div[style="position: sticky; top: var(--stickyTop, 0); z-index: 1000;"]:has(.ti-badge),header:has(.ti-badge))~div ',
        all: '',
    }
    /*CSSs which select specfic note and other CSS*/
    const hidecss = {
        rn: '.xcSej.x3762:has(.xBwhh) { display: none;}',
        quote: '.xcSej.x3762:has(.xnihJ) { display: none;}',
        nsfw: '.xcSej.x3762:has(.ti-alert-triangle) { display: none !important; }',
        cw: '.xcSej.x3762:has(.xd2wm) { display: none;}',
        media: '.xcSej.x3762:has(.xbIzI){ display: none;}',
        bot: '.xcSej.x3762:has(.xEKlD) { display: none;}',
        rerly: '.xcSej.x3762:has(.x48yH > .x9PYN) { display: none;}',
        sameserver: '.xcSej.x3762:not(:has(.xuevx)) { display: none; }',
        remoteserver: '.xcSej.x3762:has(.xuevx){ display: none; }',
        channel: '.xcSej.x3762:has(.xww2J) { display: none;}',
        usermute: '.xcSej.x3762:has(a[href="/@unko"]){ display: none; }',
        userrenotemute: '.xcSej.x3762:has(.xBwhh > a[href="/@unko"]){ display: none; }',
        userstatus: '.status a:nth-child(n+2)  b,.x1tDq .x33Tu:nth-child(n+2) div:nth-child(2), .xyEEg .x8w8X:nth-child(n+2) span{font-size: 0;}.status a:nth-child(n+2)  b:after,.x1tDq .x33Tu:nth-child(n+2) div:nth-child(2):after, .xyEEg .x8w8X:nth-child(n+2) span:after{ content: "???"; font-size: 14px;}',
        emojibetter: ':root {    --emoji_default_size: 30px;    --emoji_margin_lr: 6px;    --emoji_margin_tb: 2px;    --emoji_max_size: 80px;    --emoji_displey_style: fill;      --emoji_window_default_height: 400px;      --emoji_window_default_width: 400px;    --emoji_autofill_max_width:  300px;    --emoji_autofill_displey_style: fill;}.emojis {  padding:  10px 5px 5px;  text-align:center;}.emojis section>.body {  display: inline !important;  padding:  0 !important;  line-height: 0;}.emojis section>.body .item{  height: auto !important;}button:has(.emoji){  aspect-ratio: auto!important;  width: fit-content !important;  contain: layout !important;  margin: 0px !important;  padding: var(--emoji_margin_tb)  var(--emoji_margin_lr)  !important;  min-height:  var(--emoji_default_size) !important;}button:has(.emoji) img{  width: auto !important;  height: var(--emoji_default_size) !important;  object-fit: var(--emoji_displey_style) !important;  object-position: 0% 50%;  max-width: var(--emoji_max_size);} .xeJ4G.xuoKL, ._emoji_1pjrm_56 {  width: auto !important;  object-fit: var(--emoji_autofill_displey_style) !important;  object-position: 0% 50%;  max-width: var(--emoji_autofill_max_width);}'

    }
    const transitioncode = "<style> * { transition: background-color .5s; } </style>"
    const exportcomment = '/*今のMisskey-TL-FIlterの設定と同一のフィルタリングができるカスタムCSSです。\nこのコードをコピーして、フィルタを設定したいパソコン、スマホのmisskeyの設定→全般→カスタムCSS の中に貼り付けてください*/\n';


    /*create css code and save from now settings*/
    function CreateCSS(){
        csscode="";
        //Judges which CSS to apply based on the unique attributes assigned to the HTML of the checkbox and generates code
        for (let target of chcckbox_elements) {
            if(target.checked){
                csscode += (tlselector[target.dataset.tl] + hidecss[target.dataset.kinds]) + '\n';
            }
        }
        //User Mute,renotemute input
        for(let i=0;i<2;i++){
            if(text_elements[i].value.replaceAll(' ','')){
                let muteuserlist = text_elements[i].value.replaceAll(' ','').split(',');
                for(let name of muteuserlist){
                    csscode += hidecss[text_elements[i].dataset.kinds].replaceAll('unko',name) + '\n';
                }
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
        for (let target of chcckbox_elements) {
            localStorage.setItem('button-' + target.dataset.tl + '-' + target.dataset.kinds + domainname, target.checked? 1 : 0);
        }
        for (let target of text_elements) {
            localStorage.setItem('list-' + target.dataset.kinds + domainname, target.value);
        }
        /*this setting use service worker. but this dont access localstorage. so save to chrome storage API*/
        chrome.storage.local.set({setting1: text_elements[2].value});
        localStorage.setItem('saved' + domainname , '1');
    }

    /*load settings from localStorage*/
    function LoadSetting(){
        /*when first time, previous setup don't exist, so nothing*/
        if(!localStorage.getItem('saved' + domainname)) {
            return;
        }
        for (let target of chcckbox_elements) {
            target.checked = (localStorage.getItem('button-' + target.dataset.tl + '-' + target.dataset.kinds + domainname)== '1')? 1: 0;
        }
        text_elements[0].value = localStorage.getItem('list-' + text_elements[0].dataset.kinds + domainname);
        text_elements[1].value = localStorage.getItem('list-' + text_elements[1].dataset.kinds + domainname);
        chrome.storage.local.get(["setting1"]).then((result) => {
            text_elements[2].value = result.setting1;
        });
    }

    /*export css code*/
    function ExportCSS(){
        CreateCSS();
        const blob = new Blob([exportcomment + csscode],{type:"text/plain"});
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
    for (let target of chcckbox_elements) {
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
    for (let target of text_elements) {
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