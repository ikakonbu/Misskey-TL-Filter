const scroolloffset = 462; 
const autoscrolloffset = 41;
let autoscrolled = false;
let willscroll = 0;
let csscode='';
let domainname = '';

/*multiselect buttons*/
let multibtn_texts = [["フィルターなし","チャンネル非表示"],["フィルターなし","リノート非表示","リノート「だけ」表示する"], ["フィルターなし","NSFW非表示","NSFW「だけ」表示する"],["フィルターなし","自分のサーバーの投稿だけ","他のサーバーの投稿だけ"],["フィルターなし","メディア非表示","メディア「だけ」表示する"]];
const multibtn_index = [["no","channel_hide"],["no","renote_hide","renote_only"], ["no","nsfw_hide","nsfw_only"],["no","server_myonly","server_otheronly"],["no","media_hide","media_only"]];
const multibtn_icons = [["&#xee40","&#xf064"],["&#xee40","&#xf18e","&#xeb72"], ["&#xee40","&#xfc69","&#xea06"],["&#xee40","&#xf1ca","&#xeb54"],["&#xee40","&#xecf6","&#xeb0a"]];

/*index for autoscroll */
let tlindex = {"ti-star": "ti-list", "ti-home": "ti-home", "ti-planet": "ti-planet", "ti-universe": "ti-universe", "ti-rocket": "ti-universe", "ti-whirl": "ti-whirl", "ti-device-tv": "ti-device-tv", "ti-badge": "ti-badge", "ti-list": "ti-list","xtWgn":"ti-user", "ti-device-tv":"ti-device-tv", "ti-antenna":"ti-antenna",}

/*CSSs which select specfic timeline*/
const tlselector = {
    home: ':is(div[style="position: sticky; top: var(--stickyTop, 0); z-index: 1000;"]:not(:has(.xlwg4>.ti-device-tv)):has(.xj7PE .xjQuN .ti-home),header:has(.ti-home))~div ',
    local: ':is(div[style="position: sticky; top: var(--stickyTop, 0); z-index: 1000;"]:has(.xj7PE .xjQuN .ti-planet),header:has(.ti-planet))~div ',
    social: ':is(div[style="position: sticky; top: var(--stickyTop, 0); z-index: 1000;"]:has(.xj7PE .xjQuN .ti-rocket),header:has(.ti-rocket))~div ',
    global: ':is(div[style="position: sticky; top: var(--stickyTop, 0); z-index: 1000;"]:has(.xj7PE .xjQuN .ti-whirl),header:has(.ti-whirl))~div ',
    list: ':is(div[style="position: sticky; top: var(--stickyTop, 0); z-index: 1000;"]:has(.xeHR5 .xlwg4 .ti-list),div[style="position: sticky; top: var(--stickyTop, 0); z-index: 1000;"]:has(.xj7PE .xjQuN .ti-star),header:has(.ti-list))~div ',
    role: ':is(.xbt7a:has(.ti-badge), div[style="position: sticky; top: var(--stickyTop, 0); z-index: 1000;"]:has(.ti-badge),header:has(.ti-badge))~div ',
    channel: ':is(.xbt7a:has(.ti-device-tv), div[style="position: sticky; top: var(--stickyTop, 0); z-index: 1000;"]:has(.xeHR5 .xlwg4  .ti-device-tv),header:has(.ti-device-tv))~div ',
    antenna: ':is(.xbt7a:has(.ti-antenna), div[style="position: sticky; top: var(--stickyTop, 0); z-index: 1000;"]:has(.xeHR5 .xlwg4 .ti-antenna),header:has(.ti-antenna))~div ',
    user: ':is(div[style="position: sticky; top: var(--stickyTop, 0); z-index: 1000;"]:has(.xy0IK), .xbt7a:has(.ti-user))~div ',
    all: ':is(div[style="position: sticky; top: var(--stickyTop, 0); z-index: 1000;"]:not(:has(.ti-bell)), header:not(:has(.ti-at)))~div '
}
/*CSSs which select specfic note and other CSS*/
const hidecss = {
    //for spscfic timeline
    rn: '.xcSej.x3762:has(.xBwhh) { display: none;}',
    quote: '.xcSej.x3762:has(.xnihJ) { display: none;}',
    nsfw: '.xcSej.x3762:has(.ti-eye-exclamation) { display: none !important; }',
    cw: '.xcSej.x3762:has(.xd2wm, .xossv) { display: none;}',
    media: '.xcSej.x3762:has(.xbIzI){ display: none;}',
    bot: '.xcSej.x3762:has(.xEKlD) { display: none;}',
    rerly: '.xcSej.x3762:has(.x48yH > .x9PYN) { display: none;}',
    sameserver: '.xcSej.x3762:not(:has(.xuevx)) { display: none; }',

    
    //for selectbox
    no: '{}',
    renote_hide: '.xcSej.x3762:has(.xBwhh) { display: none;}',
    renote_only: '.xcSej.x3762:not(:has(.xBwhh)) { display: none;}',
    channel_hide: '.xcSej.x3762:has(.xww2J) { display: none;}',
    nsfw_hide: '.xcSej.x3762:has(.ti-eye-exclamation) { display: none !important; }',
    nsfw_only: '.xcSej.x3762:not(:has(.ti-eye-exclamation)) { display: none !important; }',
    server_myonly: '.xcSej.x3762:has(.xuevx){ display: none; }',
    server_otheronly: '.xcSej.x3762:not(:has(.xuevx)){ display: none; }',
    media_only: '.xcSej.x3762:not(:has(.xbIzI)){ display: none;}',
    media_hide: '.xcSej.x3762:has(.xbIzI){ display: none;}',
    
    //for all timeline
    usermute: '.xcSej.x3762:has(a[href="/@unko"]){ display: none; }',
    userrenotemute: '.xcSej.x3762:has(.xBwhh > a[href="/@unko"]){ display: none; }',
    userstatus: '{} .status a:nth-child(n+2)  b,.x1tDq .x33Tu:nth-child(n+2) div:nth-child(2), .xyEEg .x8w8X:nth-child(n+2) span{font-size: 0;}.status a:nth-child(n+2)  b:after,.x1tDq .x33Tu:nth-child(n+2) div:nth-child(2):after, .xyEEg .x8w8X:nth-child(n+2) span:after{ content: "???"; font-size: 14px;}',
    emojibetter: '{} :root { --emoji_default_size: 30px; --emoji_margin_lr: 6px; --emoji_margin_tb: 2px; --emoji_max_size: 80px; --emoji_displey_style: fill; --emoji_window_default_height: 400px; --emoji_window_default_width: 400px; --emoji_autofill_max_width: 300px; --emoji_autofill_displey_style: fill; } .emojis { padding: 10px 5px 5px; text-align:center; } .emojis .body { display: inline !important; padding: 0 !important; line-height: 0; } .emojis section>.body ._button.item{ height: auto !important; } .emojis ._button.item{ aspect-ratio: auto!important; width: fit-content !important; contain: layout !important; margin: 0px !important; padding: var(--emoji_margin_tb) var(--emoji_margin_lr) !important; min-height: var(--emoji_default_size) !important; } .emojis .xeJ4G{ width: auto !important; height: var(--emoji_default_size) !important; object-fit: var(--emoji_displey_style) !important; object-position: 0% 50%; max-width: var(--emoji_max_size); } .xeJ4G.xuoKL, ._emoji_1pjrm_56 { width: auto !important; object-fit: var(--emoji_autofill_displey_style) !important; object-position: 0% 50%; max-width: var(--emoji_autofill_max_width); } .omfetrab:is(.s1,.s2,.s3)[data-v-c34d1549] .emojis{ --eachSize: fit-content !important; } .emojis .group:not(.index) section{ text-align: left; } .emojis .group:not(.index) section .body{ display: block !important; text-align: center; } .emojis .item:focus, .emojis .item:hover { background: rgba(255,0,0,0.4 ); }',
    imagehidebtn: '{} .ti.ti-eye-off:is(.xlnR0, .xdz7H){  opacity: 1;  font-size: 20px;  background-color: rgba(10,10,10,0.2);  color: white;  padding: 14px 18px 14px 18px;  margin: 4px;  top: 3px;  right: 3px;  border-radius: 15px;  backdrop-filter: blur(10px);  -webkit-backdrop-filter: blur(10dpx); } .ti.ti-eye-off:is(.xlnR0, .xdz7H):hover{  transition: 0.1s;  transform: scale(1.1);  color: var(--accent);  background: var(--bg);  border: solid 1px var(--accent); } @media screen and (max-width: 600px){ .ti.ti-eye-off:is(.xlnR0, .xdz7H){  opacity: 1;  font-size: 18px;  padding: 13px 12px 13px 12px;  top: 0;  right: 0; } } .xEvDK._button{  display: none; }',
}
const exportcomment = '/*今のMisskey-TL-FIlterの設定と同一のフィルタリングができるカスタムCSSです。\nこのコードをコピーして、フィルタを設定したいパソコン、スマホのmisskeyの設定→全般→カスタムCSS の中に貼り付けてください*/\n/*This is a custom CSS that allows filtering identical to the current Misskey-TL-FIlter settings.\n Copy this code and paste it into misskey settings -> General -> Custom CSS on the computer or smartphone where you want to set the filter*/\n';



    /*element of checkbox ,text input, button, scroll button, and scroll target*/
    const chcckbox_elements = document.getElementsByClassName(`filterbtn`);
    const text_elements = document.querySelectorAll(`input[type="text"]`);
    const multibtn_elements = document.getElementsByClassName(`multiselectbtn`);
    const exportbtn = document.querySelector(`button[class="export"]`);
    const scrollleft  = document.querySelector('.scrollleft');
    const scrollright = document.querySelector('.scrollright');
    const scrolltarget = document.querySelector('.flex.left');
    const langage = document.getElementById('langage');

    /*create css code from current settings*/
    function CreateCSS(){
        csscode="";
        //checkbox
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
        for (let target of multibtn_elements) {
            if(Number(target.dataset.index) != 0){
                csscode += hidecss[multibtn_index[Number(target.dataset.multiindex)][Number(target.dataset.index)]] + '\n';
            }
        }
    }

    /*save current settings*/
    function SaveSetting(){
        for (let target of chcckbox_elements) {
            localStorage.setItem('button-' + target.dataset.tl + '-' + target.dataset.kinds + domainname, target.checked? 1 : 0);
        }
        for (let target of text_elements) {
            localStorage.setItem('list-' + target.dataset.kinds + domainname, target.value);
        }
        for (let target of multibtn_elements) {
            localStorage.setItem('multiselect-' + target.dataset.multiindex + domainname, target.dataset.index);
        }
        //this setting use service worker. but this dont access localstorage. so save to chrome storage API
        chrome.storage.local.set({setting1: text_elements[2].value});
        localStorage.setItem('langage', langage.value);
        localStorage.setItem('saved' + domainname , '1');
        if(langage.value != "japanese"){
        fetch("/lang/" + localStorage.getItem("langage") + ".json")
        .then( response => response.json())
        .then( (data) => {
            localStorage.setItem("multibtntexts", JSON.stringify(data.MultiselectOptions));
        })
        }
    }

    /*load settings*/
    function LoadSetting(){
        //when first time, previous setup don't exist, so init setting
        if(!localStorage.getItem('saved' + domainname)) {
            SaveSetting();
            return;
        }
        let langsetting = localStorage.getItem('langage');
        if(langsetting != "japanese"){
            multibtn_texts = JSON.parse(localStorage.getItem("multibtntexts")); 
        }
        if(langsetting == "japanese"){
            langage.selectedIndex = 0;
        } else if(langsetting == "english"){
            langage.selectedIndex = 1;
        } else if(langsetting == "kansaiben"){
            langage.selectedIndex = 2;
        } else if(langsetting == "ojosama"){
            langage.selectedIndex = 3;
        } else {
            langage.selectedIndex = 0;
        }

        for (let target of chcckbox_elements) {
            target.checked = (localStorage.getItem('button-' + target.dataset.tl + '-' + target.dataset.kinds + domainname)== '1')? 1: 0;
        }
        for (let target of multibtn_elements) {
            if(localStorage.getItem('multiselect-' + target.dataset.multiindex + domainname) != null){
                let nextindex = Number(localStorage.getItem('multiselect-' + target.dataset.multiindex + domainname));
                target.dataset.index = nextindex;
                target.querySelector('.multitext').innerText = multibtn_texts[target.dataset.multiindex][nextindex];
                target.querySelector('.multiselect-ti').innerHTML = multibtn_icons[target.dataset.multiindex][nextindex];
            }
        }
        text_elements[0].value = localStorage.getItem('list-' + text_elements[0].dataset.kinds + domainname);
        text_elements[1].value = localStorage.getItem('list-' + text_elements[1].dataset.kinds + domainname);
        chrome.storage.local.get(["setting1"]).then((result) => {
            text_elements[2].value = result.setting1;
        });
    }

    /*create css code file and download*/
    function ExportCSS(){
        CreateCSS();
        const blob = new Blob([exportcomment + csscode],{type:"text/plain"});
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'Export.css';
        link.click();
        link.remove();
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

    /*Get the TL Name which currently looking*/
    function getTLName(){
        /*return null when deck UI*/
        baseel = "div[style='position: sticky; top: var(--stickyTop, 0); z-index: 1000;'] ";
        if( document.querySelector(".xAOWy header") == null){
            let tltarget = document.querySelector(baseel + ".xlwg4 .ti:not(.ti-star)");

            if(tltarget == null) {
                tltarget = document.querySelector(baseel + ".xy0IK .x6tH3");
            }
            if(tltarget == null) {
                tltarget = document.querySelector(baseel + ".xj7PE .ti");
            }

            if(tltarget != null){
                return tltarget.classList[2];
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    function clamp(a,b,c){
        if(a>b){
            return a;
        } else if(c<b){
            return c;
        } else {
            return b;
        }
    }

    /*calclate scroll position*/
    function setScrollPosition(flag){
       var targetwidth = scrolltarget.scrollWidth - document.body.clientWidth;
       if(flag) {
        willscroll = clamp(0, willscroll+scroolloffset , targetwidth);
        if(autoscrolled) willscroll -= (scroolloffset/2);
        autoscrolled = false;
       } else {
        willscroll = clamp(0, willscroll-scroolloffset , targetwidth);
        if(autoscrolled) willscroll += (scroolloffset/2);
        autoscrolled = false;
       }
    }

    /*Change Display Langage*/
    function ChangeLang(){
        let lang = localStorage.getItem('langage');
        if(lang == "japanese"){
            return;
        } else if(lang != null){
            let titles = document.querySelectorAll("h2");
            let MainSettings = document.querySelectorAll(".flex.left .buttonblock");
            let MoreSettings = document.querySelectorAll(".other_setting .buttonlabel");
            let Descriptions = document.querySelectorAll(".description-popup");
            let links = document.querySelectorAll("a div:nth-child(2)");
            let cssbtn = document.querySelector(".export");
            let lasttxt = document.querySelector(".about p");
            let warning = document.querySelector(".warning_card");
            let multiselext_hovertexts = document.querySelectorAll(".hovertext");
            let counter = 0;
            let langdata = "";

            fetch("/lang/" + lang + ".json")
            .then( response => response.json())
		    .then( (data) => {
                langdata = data;

                counter=0;
                for(let key of titles){
                    key.innerText = langdata.title[counter].text;
                    counter += 1;
                }

                for(let key of MainSettings){
                    key.querySelector(".buttonlabel").innerText = langdata['MainSetting'][key.querySelector("input").dataset.kinds];
                    counter += 1;
                }

                counter=0;
                for(let key of MoreSettings){
                    key.innerHTML = langdata.MoreSetting[counter].text;
                    counter += 1;
                }

                counter=0;
                for(let key of Descriptions){
                    key.innerHTML = langdata.Description[counter].text;
                    counter += 1;
                }

                counter=0;
                for(let key of links){
                    key.innerText = langdata.Link[counter].text;
                    counter += 1;
                }

                for(let key of multiselext_hovertexts){
                    key.innerText = langdata.other.multiselecthover;
                }

                cssbtn.innerText = langdata.other.exportbtn;
                lasttxt.innerText = langdata.other.lasttext;
                warning.innerHTML = langdata.other.warning;
                multibtn_texts = langdata.MultiselectOptions;
            });
            
        }
    }

    /*scroll button event*/
    scrollleft.addEventListener(`click`, () => {
        setScrollPosition(false);
        scrolltarget.scrollTo({
            left: willscroll,
            behavior: 'smooth'
          });
    })
    scrollright.addEventListener(`click`, () => {
        setScrollPosition(true);
        scrolltarget.scrollTo({
            left: willscroll,
            behavior: 'smooth'
          });
    })



    /*チェックボックスの周辺をクリックされてもチェックボックスをクリックしたことにする*/
    const checkboxs = document.querySelectorAll('.buttonblock:has(input[type="checkbox"])');
    for(let checkbox of checkboxs){
        checkbox.addEventListener("click", function(event){
            var x = event.clientX;
            var y = event.clientY;
            var element = document.elementFromPoint(x, y);
            if(element.className != "toggler-slider" && element.className != "toggler-knob"){
                this.querySelector('input[type="checkbox"]').click();
            }
        })
    }

    /*Get the domain of tab which currently open 
    & load setting for current domain*/
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        const tabquery = chrome.scripting.executeScript({
            target: { tabId : tabs[0].id },
            func: GetDomain,
        });
        tabquery.then((value) => {
            domainname = value[0].result; 
            LoadSetting();
        })
        .catch(err => alert("設定の読み込みでエラーが発生しました、再読み込みしてみてね"));
    });

    /*今見ているTLの個別設定に自動でスクロールする*/
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        const tabquery = chrome.scripting.executeScript({
            target: { tabId : tabs[0].id },
            func: getTLName,
        });
        tabquery.then((value) => {
            console.log(value[0].result);
            if( value[0].result != null ){
                if(value[0].result in tlindex){
                    targetel = document.querySelector(".card:has(." + tlindex[value[0].result] + ")");
                    willscroll += targetel.getBoundingClientRect().x - autoscrolloffset;
                    let userAgent = window.navigator.userAgent.toLowerCase();
                    if(userAgent.indexOf('firefox') != -1){
                        targetel.scrollIntoView({behavior: 'auto', block: "end", inline:"center"});
                    } else {
                        targetel.scrollIntoView({behavior: 'auto', block: "end", inline:"center"});
                    }
                    if(value[0].result != "ti-home" && value[0].result != "ti-badge" ) {
                        autoscrolled = true;
                    }
                }
            }
        })
        .catch(err => console.log("TL取得に失敗"));
    });

    /*Set　event listeners*/
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
    for(let target of multibtn_elements){
        target.addEventListener(`click`, () => {
            target.querySelector('.multitext').classList.add("change");
            let nextindex = (Number(target.dataset.index) + 1 ) % multibtn_texts[target.dataset.multiindex].length;
            target.querySelector('.multitext').innerText = multibtn_texts[target.dataset.multiindex][nextindex];
            target.dataset.index = nextindex;
            target.querySelector('.multiselect-ti').innerHTML = multibtn_icons[target.dataset.multiindex][nextindex];
            window.setTimeout(function(){target.querySelector('.multitext').classList.remove("change")},200);
            CreateCSS();
            SaveSetting();
            chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                chrome.scripting.executeScript({
                    target : {tabId : tabs[0].id},
                    func : UpdateCSS,
                    args : [csscode]
                });
            });
        });
    }

    langage.addEventListener(`change`, () => {
        SaveSetting();
        location.reload()
    })
    
    /*set export button event*/
    exportbtn.addEventListener('click', () => {
        ExportCSS();
    })

    ChangeLang();
