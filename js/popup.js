var scroolloffset = 462; 
const autoscrolloffset = 41;
let arrowautoscroll = 1;
let autoscrolled = false;
let willscroll = 0;
let csscode='';
let domainname = '';
let emojiDB;
var searchtask = null;
let controller = new AbortController();
let signal = controller.signal;

/*multiselect buttons*/
let multibtn_texts = [["フィルターなし","チャンネル非表示"],["フィルターなし","リノート非表示","リノート「だけ」表示する"], ["フィルターなし","NSFW非表示","NSFW「だけ」表示する"],["フィルターなし","自分のサーバーの投稿だけ","他のサーバーの投稿だけ"],["フィルターなし","メディア非表示","メディア「だけ」表示する"],["フィルターなし","bot非表示"],["フィルターなし","play非表示"]];
const multibtn_index = [["no","channel_hide"],["no","renote_hide","renote_only"], ["no","nsfw_hide","nsfw_only"],["no","server_myonly","server_otheronly"],["no","media_hide","media_only"],["no","bot_hide"],["no","play_hide"]];
const multibtn_icons = [["&#xee40","&#xf064"],["&#xee40","&#xf18e","&#xeb72"], ["&#xee40","&#xfc69","&#xea06"],["&#xee40","&#xf1ca","&#xeb54"],["&#xee40","&#xecf6","&#xeb0a"],["&#xee40","&#xf192"],["&#xee40","&#xf17e"]];

/*index for autoscroll */
let tlindex = {"ti-star": "ti-list", "ti-home": "ti-home", "ti-planet": "ti-planet", "ti-universe": "ti-universe", "ti-universe": "ti-universe", "ti-whirl": "ti-whirl", "ti-device-tv": "ti-device-tv", "ti-badge": "ti-badge", "ti-list": "ti-list","xtWgn":"ti-user", "ti-device-tv":"ti-device-tv", "ti-antenna":"ti-antenna",}

/*CSSs which select specfic timeline*/
const tlselector = {
    home: ':is(div[style="position: sticky; top: var(--stickyTop, 0); z-index: 1000;"]:not(:has(.xlwg4>.ti-device-tv)):has(.xj7PE .xjQuN .ti-home),header:has(.ti-home))~div ',
    local: ':is(div[style="position: sticky; top: var(--stickyTop, 0); z-index: 1000;"]:has(.xj7PE .xjQuN .ti-planet),header:has(.ti-planet))~div ',
    social: ':is(div[style="position: sticky; top: var(--stickyTop, 0); z-index: 1000;"]:has(.xj7PE .xjQuN .ti-universe),header:has(.ti-universe))~div ',
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
    bot_hide: ".xcSej.x3762:has(.xEKlD) { display: none;}",
    play_hide: ".xcSej.x3762:has(a[href^='/play/'])",
    
    //for Mute Settings
    emojihide: ':is(.xlT1y .xeJ4G,.x3762 .xeJ4G, .x3kEw .xeJ4G, .xagin, .xwUec .xeJ4G):is(:is([title^="unko@"],[title^="unko:"])),:is(.xlT1y,.emojis) ._button .xeJ4G:is(:is([title^="unko@"],[title^="unko:"])){ display:none;}._button:has(.xeJ4G:is(:is([title^="unko@"],[title^="unko:"]))):before{ content: ""; display: inline-block; width: 1.25em !important; height: 1.25em !important; background-image: url(/twemoji/2764.svg); background-size: 1.25em 1.25em;}.xAV2R:has(img:is(:is([title^="unko@"],[title^="unko:"]))):after{ content: ""; display: inline-block; width: 20px !important; height: 20px !important; background-image: url(/twemoji/2764.svg); background-size: 20px 20px;}',
    emojiblock: ':is(.xeJ4G, .xagin):is(:is([title^="unko@"],[title^="unko:"])),._button:has(.xeJ4G:is(:is([title^="unko@"],[title^="unko:"]))){ display:none; } .x9Bba:has(img[title="unko"]){ display: none; } :is(.emojis,.x8LRN) :is(._button,.xm7js):has(:is(:is([title^="unko@"],[title^="unko:"]))){ display: none !important; }',
    botexcep: '.xcSej.x3762:has(.xEKlD):has(a[href$="unko"]) { display: block !important; }',
    usermute: '.xcSej.x3762:has(a[href="/@unko"]){ display: none; }',
    userrenotemute: '.xcSej.x3762:has(.xBwhh > a[href="/@unko"]){ display: none; }',
    userstatus: '{} .status a:nth-child(n+2)  b,.x1tDq .x33Tu:nth-child(n+2) div:nth-child(2), .xyEEg .x8w8X:nth-child(n+2) span{font-size: 0;}.status a:nth-child(n+2)  b:after,.x1tDq .x33Tu:nth-child(n+2) div:nth-child(2):after, .xyEEg .x8w8X:nth-child(n+2) span:after{ content: "???"; font-size: 14px;}',
    rollbadges: '.xks9Y { display: none;}',
    antispam: '.xcSej.x3762:has(.xuevx):has(.xkJBF[src*="identicon/"]),.xcSej:has(.x6gsV):has(.xkJBF[src*="identicon/"]),.xcSej:has(.x6gsV:nth-child(4)){ display: none; }',

    //for Other Settings
    emojibetter: '{} :root { --emoji_default_size: 30px; --emoji_margin_lr: 6px; --emoji_margin_tb: 2px; --emoji_max_size: 80px; --emoji_displey_style: fill; --emoji_window_default_height: 400px; --emoji_window_default_width: 400px; --emoji_autofill_max_width: 300px; --emoji_autofill_displey_style: fill; } .emojis { padding: 10px 5px 5px; text-align:center; } .emojis .body { display: inline !important; padding: 0 !important; line-height: 0; } .emojis section>.body ._button.item{ height: auto !important; } .emojis ._button.item{ aspect-ratio: auto!important; width: fit-content !important; contain: layout !important; margin: 0px !important; padding: var(--emoji_margin_tb) var(--emoji_margin_lr) !important; min-height: var(--emoji_default_size) !important; } .emojis .xeJ4G{ width: auto !important; height: var(--emoji_default_size) !important; object-fit: var(--emoji_displey_style) !important; object-position: 0% 50%; max-width: var(--emoji_max_size); } .xeJ4G.xuoKL, ._emoji_1pjrm_56 { width: auto !important; object-fit: var(--emoji_autofill_displey_style) !important; object-position: 0% 50%; max-width: var(--emoji_autofill_max_width); } .omfetrab:is(.s1,.s2,.s3)[data-v-c34d1549] .emojis{ --eachSize: fit-content !important; } .emojis .group:not(.index) section{ text-align: left; } .emojis .group:not(.index) section .body{ display: block !important; text-align: center; } .emojis .item:focus, .emojis .item:hover { background: rgba(255,0,0,0.4 ); }',
    imagehidebtn: '{} .ti.ti-eye-off:is(.xlnR0, .xdz7H){  opacity: 1;  font-size: 20px;  background-color: rgba(10,10,10,0.2);  color: white;  padding: 14px 18px 14px 18px;  margin: 4px;  top: 3px;  right: 3px;  border-radius: 15px;  backdrop-filter: blur(10px);  -webkit-backdrop-filter: blur(10dpx); } .ti.ti-eye-off:is(.xlnR0, .xdz7H):hover{  transition: 0.1s;  transform: scale(1.1);  color: var(--accent);  background: var(--bg);  border: solid 1px var(--accent); } @media screen and (max-width: 600px){ .ti.ti-eye-off:is(.xlnR0, .xdz7H){  opacity: 1;  font-size: 18px;  padding: 13px 12px 13px 12px;  top: 0;  right: 0; } } .xEvDK._button{  display: none; }',
}
const exportcomment = '/*今のMisskey-TL-FIlterの設定と同一のフィルタリングができるカスタムCSSです。\nこのコードをコピーして、フィルタを設定したいパソコン、スマホのmisskeyの設定→全般→カスタムCSS の中に貼り付けてください*/\n/*This is a custom CSS that allows filtering identical to the current Misskey-TL-FIlter settings.\n Copy this code and paste it into misskey settings -> General -> Custom CSS on the computer or smartphone where you want to set the filter*/\n';

/*element of checkbox ,text input, button, scroll button, and scroll target*/
const chcckbox_elements = document.querySelectorAll(`.filterbtn`);
const css_chcckbox_elements = document.querySelectorAll(`.filterbtn:not(.notcss)`);
const text_elements = document.querySelectorAll(`input[type="text"]`);
const multibtn_elements = document.getElementsByClassName(`multiselectbtn`);
const exportbtn = document.getElementById('export');
const autoscrollsetting = document.querySelector(`.autoscrollcheck`);
const scrollleft  = document.querySelector('.scrollleft');
const scrollright = document.querySelector('.scrollright');
const scrolltarget = document.querySelector('.timeline_setting');
const langage = document.getElementById('langage');
const emoji_text = document.querySelectorAll('.emojitext');
const user_text = document.querySelectorAll('.usertext');
const accordion_boxs = document.querySelectorAll(".accordion");
const tabui_tabs = document.querySelectorAll(".TabUI-tabs input[type='radio']");
const tabui_contents = document.querySelectorAll(".TabUI-content");

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));//timeはミリ秒


    /*create css code from current settings*/
    function CreateCSS(){
        csscode="";
        //checkbox
        for (let target of css_chcckbox_elements) {
            if(target.checked){
                csscode += (tlselector[target.dataset.tl] + hidecss[target.dataset.kinds]) + '\n';
            }
        }
        //User Mute,renotemute input
        for (let target of text_elements) {
            if(target.value.replaceAll(' ','')){
                let muteuserlist = target.value.replaceAll(' ','').split(',');
                for(let name of muteuserlist){
                    name = name.replace(/(:.+):/, "$1");
                    csscode += hidecss[target.dataset.kinds].replaceAll('unko',name) + '\n';
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
        let settingflag = 0;
        let badgeflags = {};
        let badgesettings = {};
        let badge_setting_el = document.querySelectorAll(".filterbtn.activebadgesetting");
        badge_setting_el.forEach((target, idx) => {
            badgeflags[target.dataset.kinds] = 0;
            badgesettings[target.dataset.kinds] = target.checked? 1 : 0; 
        });

        for (let target of chcckbox_elements) {
            localStorage.setItem('button-' + target.dataset.tl + '-' + target.dataset.kinds + domainname, target.checked? 1 : 0);
            if(target.checked) {
                let target_setting = target.closest(".TabUI-content")
                if(target_setting != null) target_setting = target_setting.dataset.id;
                if(target_setting){
                    badgeflags[target_setting] = 1;
                } else {
                    badgeflags["spec_setting"] = 1;
                }
            }
        }

        for (let target of text_elements) {
            localStorage.setItem('list-' + target.dataset.kinds + domainname, target.value);
            if(target.value.trim() != "") {
                let target_setting = target.closest(".TabUI-content").dataset.id;
                badgeflags[target_setting] = 1;
            }
        }
        for (let target of multibtn_elements) {
            localStorage.setItem('multiselect-' + target.dataset.multiindex + domainname, target.dataset.index);
            if(target.dataset.index != 0) {
                let target_setting = target.closest(".TabUI-content").dataset.id;
                badgeflags[target_setting] = 1;
            }
        }
        tabui_tabs.forEach((el,i) => {
            localStorage.setItem('settingtab-' + i, el.checked? 1 : 0);
        });
        localStorage.setItem('langage', langage.value);
        localStorage.setItem('autoscroll' + domainname , (arrowautoscroll==1)? 1 : 0);
        localStorage.setItem('saved' + domainname , '1');
        if(langage.value != "japanese"){
        fetch("/lang/" + localStorage.getItem("langage") + ".json")
        .then( response => response.json())
        .then( (data) => {
            localStorage.setItem("multibtntexts", JSON.stringify(data.MultiselectOptions));
        })
        }

        for(let key in badgeflags){
            if(badgesettings[key] == 1 && badgeflags[key]==1){
                settingflag = 1;
            }
        }
        let keyname = 'nowactive-' + domainname;
        chrome.storage.local.set({[keyname] : String(settingflag)}, function () {
            if(settingflag==1){
                chrome.action.setIcon({path:"../img/icon_48_active.png"});
                chrome.action.setTitle({title:"Misskey TL Filter - Filtering ON"});
            } else {
                chrome.action.setIcon({path:"../img/icon_48.png"});
                chrome.action.setTitle({title:"Misskey TL Filter - Filtering OFF"});
            }
        });
    }

    /*load settings*/
    function LoadSetting(){
        //when first time, previous setup don't exist, so init setting
        if(!localStorage.getItem('saved' + domainname)) {
            SaveSetting();
            autoscrollsetting.checked = 1;
            return;
        }
        let langsetting = localStorage.getItem('langage') ?? "japanese";

        /*マルチセレクトボタンは言語ファイルを読みに行かないと行けないので非同期に設定読込みさせる*/
        fetch("/lang/" + langsetting + ".json")
        .then(res => res.json())
        .then((res2) => {
            multibtn_texts = res2.MultiselectOptions;

            for (let target of multibtn_elements) {
                if(localStorage.getItem('multiselect-' + target.dataset.multiindex + domainname) != null){
                    let nextindex = Number(localStorage.getItem('multiselect-' + target.dataset.multiindex + domainname));
                    target.dataset.index = nextindex;
                    target.querySelector('.multitext').innerText = multibtn_texts[target.dataset.multiindex][nextindex];
                    target.querySelector('.multiselect-ti').innerHTML = multibtn_icons[target.dataset.multiindex][nextindex];
                }
            }
        });

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

        for (let target of text_elements) {
            target.value = localStorage.getItem('list-' + target.dataset.kinds + domainname);
        }
        tabui_tabs.forEach((el,i) => {
            if(localStorage.getItem('settingtab-' + i) == 1 ){
                el.checked = true;
                tabui_contents[i].classList.add('show');
            } else {
                tabui_contents[i].classList.remove('show');
            }
        });

        arrowautoscroll = (localStorage.getItem('autoscroll' + domainname) == null)? 1 : Number(localStorage.getItem('autoscroll' + domainname));
        autoscrollsetting.checked = arrowautoscroll;
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
        baseel = "div[style='position: sticky; top: var(--stickyTop, 0); z-index: 1000;']";
        if( document.querySelector(".xAOWy header") == null){
            let tltarget = document.querySelector(baseel + " .xlwg4 .ti:not(.ti-star)");

            if(tltarget == null){
                tltarget = document.querySelector(baseel + ":has(.x5vNM>._button) .xy0IK .x6tH3");
            }
            if(tltarget == null) {
                tltarget = document.querySelector(baseel + " .xj7PE .ti");
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



    /* Get emoji DB for the server which viewing now*/
    async function initEmojiDB(){
        const emojis = await fetch("https://" + domainname + "/api/emojis");
	    emojiDB = await emojis.json();
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

    function autocmp_display(kind, id, flag){
        //const kind_dic = {"emoji": ".emojiresult", "user": ".userresult"}
        const target = document.querySelector(".autocmp_result[data-id='" + id + "'][data-type='" + kind + "']");
        console.log(".autocmp_result[data-id='" + id + "'][data-type='" + kind + "']");
        console.log(target);

        if(flag == true){
            target.classList.add("show");
            target.classList.remove("hide");
        } else {
            target.classList.add("hide");
            target.classList.remove("show");
        }
    }

    /*calclate scroll position*/
    function setScrollPosition(flag){
       let targetwidth = scrolltarget.scrollWidth - document.body.clientWidth;
       let windowsize = document.querySelector("body")
       windowsize = windowsize.getClientRects();
       windowsize = windowsize[0].width;

       if(windowsize < 420){
            targetwidth += 85;
            scroolloffset = 231;
       } else {
            scroolloffset = 462; 
       }

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
            let cssbtn = document.getElementById("export");
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



    /*click checkbox when label text*/
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
            initEmojiDB();
        })
        .catch(err => alert(err));
    });

    /*Auto Scroll to Specfy Setting which watchng now on misekey*/
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        const tabquery = chrome.scripting.executeScript({
            target: { tabId : tabs[0].id },
            func: getTLName,
        });
        tabquery.then((value) => {
            console.log(value[0].result);
            if( value[0].result != null ){
                if(value[0].result in tlindex && arrowautoscroll == 1){
                    targetel = document.querySelector(".card:has(." + tlindex[value[0].result] + ")");
                    willscroll += targetel.getBoundingClientRect().x - autoscrolloffset;
                    targetel.scrollIntoView({behavior: 'instant', block: "end", inline:"center"});
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
    for (let target of tabui_tabs) {
        target.addEventListener(`change`, () => {
            SaveSetting();
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
    
    autoscrollsetting.addEventListener(`change`, () => {
        arrowautoscroll = autoscrollsetting.checked;
        SaveSetting();
    })

    /*set export button event*/
    exportbtn.addEventListener('click', () => {
        ExportCSS();
    })

    /*help screen*/
    document.querySelector('#help-open').addEventListener("click", () => {
        document.querySelector('#help').classList.remove('hide');
    });

    /*TabUI Scripts*/
    for(let target of tabui_tabs){
        target.addEventListener("input", function(){
            for(let node of tabui_contents){
                node.classList.remove("show");
            }
            let target_id = this.id;
            let el = document.querySelector(".TabUI-content[data-id='" + target_id + "']");
            if(this.checked){
                el.classList.add("show");
            }
        });
    }


    /*emoji auto complite */
    for(let texttarget of emoji_text){
        texttarget.addEventListener("input",function(e){
            let texts;
            var search_result;
            let id = e.target.dataset.id;
            let query_temp = e.target.value.split(":");
            let query_temp_eval = (query_temp.length %2 == 1 && query_temp[query_temp.length-1].replace(" ","") != "");
            if(query_temp_eval){
                console.log(query_temp);
                texts = query_temp.pop().replace(" ","").replace(",","");
                console.log(texts);
            } else {
                texts = e.target.value.split(",").pop().replace(" ", "").replace(":", "");
            }
            if(texts != "" ||  query_temp_eval){
                search_result = emojiDB.emojis.filter(function(item, index){
                    if (item.name == texts) return true;
                });

                search_result = search_result.concat(emojiDB.emojis.filter(function(item, index){
                    if (item.name.indexOf(texts) == 0 || item.aliases.indexOf(texts) != -1) return true;
                }));

                search_result = search_result.concat(emojiDB.emojis.filter(function(item, index){
                    if (item.name.indexOf(texts) != -1) {
                        return true;
                    } else {
                        let flag = false;
                        item.aliases.forEach((ai) => {
                        if (ai.indexOf(texts) != -1) flag=true;
                        });
                        return flag;
                    }
                }));

                search_result = search_result.filter((element, index) => {
                    return search_result.indexOf(element) == index;
                });
            } else {
            search_result = [];
            }

            if(search_result.length > 40){
            search_result = search_result.slice(0, 40);
            }

            var result = "";
            for (let node of search_result){
            var iikanzi_html_node = "<button class='emojibtn' title = '" + node.name + "' tabindex='1' ><img src='" + node.url + "'></button>"
            result += iikanzi_html_node;
            }

            document.querySelector(".autocmp_result[data-id='" + id + "'][data-type='emoji']").innerHTML = result;
            if(result != ""){
                autocmp_display("emoji", id, true);
            }else{
                autocmp_display("emoji", id, false);
            }

            let autocmp_buttons = document.querySelectorAll(".emojibtn");
            let self = e.target;
            for(let node of autocmp_buttons){
                node.addEventListener("click",function(){
                    let temp;
                    if(query_temp_eval) {
                        temp = self.value.split(":").slice(0,-1).join(":");
                        if(temp!="") temp += ":, ";
                    } else {
                        temp = self.value.split(",").slice(0,-1).join();
                        if(self.value.split(",").length != 1) temp += ", ";
                    }
                    temp += ":";
                    self.value = temp + node.title + ":";
                    let result_elm = document.querySelector(".autocmp_result[data-id='" + id + "'][data-type='emoji']");
                    window.setTimeout(function(){
                        result_elm.innerHTML = "";
                        SaveSetting();
                        CreateCSS();
                        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                            chrome.scripting.executeScript({
                                target : {tabId : tabs[0].id},
                                func : UpdateCSS,
                                args : [csscode]
                            });
                        });
                    },200);
                    autocmp_display("emoji", id, false);
                    self.focus();
                });
            }
        });
    }
    

    /*user auto complite */
    for(let usertarget of user_text){
        usertarget.addEventListener("input",function(e){
            let text = e.target.value.split(",").pop().replaceAll(" ", "");
            let id = e.target.dataset.id;

            if(text != ""){
                controller.abort();
                controller = new AbortController();
                signal = controller.signal;

                searchtask = setTimeout(async function(){
                    const responce = await fetch("https://" + domainname + "/api/users/search", {
                    "headers": {
                      "content-type": "application/json",
                    },
                    "body": "{\"query\":\"" + text + "\",\"offset\":0,\"limit\":5,\"origin\":\"combined\",\"detail\":false}",
                    "method": "POST",
                    "signal": signal,
                    });
                    let search_results = await responce.json();
            
                    var result = "";
                    if(search_results.length == 0){
                        autocmp_display("user", id, false);
                    } else {
                        autocmp_display("user", id, false);
                        setTimeout(function(){ autocmp_display("user", id, true); },10);
                    }

                    for(let node of search_results){
                      if(node.name != null){
                        username = node.name.split(":");
                      } else {
                        username = node.username.split(":");
                      }
                      var userserver = node.host;
                      var usernameHTML = "";
                      let search_result = [];

                      username.forEach((word, index) => {
                        if(index%2 == 0) {
                            usernameHTML += word;
                        } else {
                            if(userserver == null || userserver == "null"){
                                console.log(userserver);
                                search_result = emojiDB.emojis.filter(function(item, index){
                                    if (item.name == word) return true;
                                });
                                if(search_result.length != 0){
                                    usernameHTML += "<img data-kind='local' src='" + search_result[0].url+ "'></>";
                                } else {
                                    usernameHTML += ":" + word + ":";
                                }
                            } else {
                                usernameHTML += "<img data-kind='other' src='" + node["emojis"][word]+ "'></>";
                            }
                        }
                      });

                      var iikanzi_html_node = "<button class='userbtn' title = '" + node.username + ((node.host!=null)? "@" + node.host : "") +  "' tabindex='1'><img class='usericon' src='" + node.avatarUrl + "'><div class='usernametext'>" + usernameHTML + ((node.host != null)? "  <div class='servername'>"+node.username+"@" + node.host + "</div>" : "<div class='servername'>" + node.username + "@" + domainname + "</div>") + "</div></button>"
                      result += iikanzi_html_node;
                    }
             
                    console.log(".autocmp_result[data-id='" + id + "'][data-type='user']");
                    document.querySelector(".autocmp_result[data-id='" + id + "'][data-type='user']").innerHTML = result;
                    
                  let autocmp_buttons = document.querySelectorAll(".userbtn");
                  let self = e.target;
                  for(let node of autocmp_buttons){
                      node.addEventListener("click",function(){
                          let temp = self.value.split(",").slice(0,-1).concat();
                          if(temp != "") temp += ",";
                          temp += node.title;
                          self.value = temp;
                          let result_elm = document.querySelector(".autocmp_result[data-id='" + id + "'][data-type='user']");
                          window.setTimeout(function(){
                              result_elm.innerHTML = "";
                              SaveSetting();
                              CreateCSS();
                              chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                                  chrome.scripting.executeScript({
                                      target : {tabId : tabs[0].id},
                                      func : UpdateCSS,
                                      args : [csscode]
                                  });
                              });
                          },200);
                          autocmp_display("user", id, false);
                          self.focus();
                      });
                  }

                }, 10);

                document.querySelector(".autocmp_result[data-id='" + id + "'][data-type='user']").innerHTML = "<div style='width:100%; text-align: center;'><img src='img/loading.apng'></div>";
                autocmp_display("user", id, true);
            } else {
                document.querySelector(".autocmp_result[data-id='" + id + "'][data-type='user']").innerHTML = "";
                autocmp_display("user", id, true);
            }
        });
    }

    //keyboard shortcuts
    window.addEventListener("keydown", (event) => {
        //Click event is fired when the enter key is pressed while the element is focused with the tab key.
        if (event.code == "Enter") {
            let focusel = document.activeElement;
            if(focusel.tagName!="BUTTON"){
                focusel.click();
            }
        }
        //Use arrow keys to scroll through individual settings and Shift+arrow keys to switch tabs
        if (event.code == "ArrowLeft" || event.code == "ArrowRight") {
            if(event.shiftKey){
                let tabidx = Number(document.querySelector(".tab-button:has(input[type='radio']:checked) label").dataset.id) -1;
                switch(event.code){
                    case "ArrowLeft":
                        tabidx = Math.max(tabidx-1,0);
                        break;
                    case "ArrowRight":
                        tabidx = Math.min(tabidx+1,3);
                        break;
                }
                tabui_tabs[tabidx].click();
                tabui_contents[tabidx].querySelector("*[tabindex='1']").focus();
                //Scroll to the position of the tab UI
                    //If sticky scroll is enabled and the tab is stuck at the top, 
                    //the variable scrolly will not take the correct value, so reset the scroll position first.
                    document.querySelector("body").scrollTo(0, 0); 
                let targety = document.querySelector(".TabUI-tabs").getBoundingClientRect();
                let scrolly = targety.top + document.querySelector("body").scrollTop;
                document.querySelector("body").scrollTo(0, scrolly);

            } else {
                switch(event.code){
                    case "ArrowLeft":
                        scrollleft.click();
                        break;
                    case "ArrowRight":
                        scrollright.click();
                        break;
                }
                document.querySelector("body").scrollTo(0, 0);
            }
        }
    });

    ChangeLang();
