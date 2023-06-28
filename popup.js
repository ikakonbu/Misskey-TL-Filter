document.addEventListener('DOMContentLoaded', function () {

    // element of checkbox and text input
    const targets = document.querySelectorAll(`input[type="checkbox"].filterbtn`);
    const targets2 = document.querySelectorAll(`input[type="text"]`);

    //scroll pixel displacement
    const scroolloffset = 450; 
    var csscode='';
    //Add style code for light-dark mode transition
    //Insert later to prevent color fade when the popup is open
    const transitioncode = "<style> * { transition: background-color .5s; } </style>"
    setTimeout(function(){ document.querySelector(`head`).insertAdjacentHTML('beforeend', transitioncode)},500);

    // css code templete
    const stylecode = {
        rn:':is(div[style="position: sticky; top: var(--stickyTop, 0); z-index: 1000;"]:has(.xj7PE .xjQuN unko),header:has(unko))~div .xcSej.x3762:has(.xBwhh) { display: none;}',
        quote:':is(div[style="position: sticky; top: var(--stickyTop, 0); z-index: 1000;"]:has(.xj7PE .xjQuN unko),header:has(unko))~div .xcSej.x3762:has(.xnihJ) { display: none;}',
        nsfw:':is(div[style="position: sticky; top: var(--stickyTop, 0); z-index: 1000;"]:has(.xj7PE .xjQuN unko),header:has(unko))~div .xcSej.x3762:has(.ti-alert-triangle) { display: none !important; }',
        cw: ':is(div[style="position: sticky; top: var(--stickyTop, 0); z-index: 1000;"]:has(.xj7PE .xjQuN unko),header:has(unko))~div .xcSej.x3762:has(.xd2wm) { display: none;}',
        channel: '.xcSej.x3762:has(.xww2J) { display: none;}',
        usermute: '.xcSej.x3762:has(a[href="/@unko"]){ display: none; }',
        userrenotemute: '.xcSej.x3762:has(.xBwhh > a[href="/@unko"]){ display: none; }',
        rocket: '.xcSej.x3762:has(.xuevx){ display: none; }',
        norocket: '.xcSej.x3762:not(:has(.xuevx)) { display: none; }'
    };
    
    /*create css code and save from now settings*/
    function CreateCSS(){
        csscode="";
        //Judges which CSS to apply based on the unique attributes assigned to the HTML of the checkbox and generates code
        for (let target of targets) {
            if(target.checked){
                csscode += stylecode[target.dataset.kinds].replaceAll('unko',"." + target.dataset.name).replaceAll('.no-add',"") + "\n";
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
        //console.log(csscode);
    }

    /*Update CSS from arg*/
    function UpdateCSS(styles){
        document.querySelector(`.filtercsswrapper`).innerHTML=styles;
        localStorage.setItem('lastcss',styles);
    }

    /*save current setting in localstorage*/
    function SaveSetting(){
        for (let target of targets) {
            localStorage.setItem('button-' + target.dataset.name + '-' + target.dataset.kinds, target.checked? 1 : 0);
        }
        localStorage.setItem('list-muteuser', targets2[0].value);
        localStorage.setItem('list-muteuserrenote', targets2[1].value);
        localStorage.setItem('allow-other-server', targets2[2].value);
        /*this setting use service worker. but this dont access localstorage. so save to chrome storage API*/
        chrome.storage.local.set({setting1: targets2[2].value})
        localStorage.setItem('saved' , '1');
    }

    /*load settings from localStorage*/
    function LoadSetting(){
        /*when first time, previous setup don't exist, so nothing*/
        if(!localStorage.getItem('saved')) return;
        for (let target of targets) {
            target.checked = (localStorage.getItem('button-' + target.dataset.name + '-' + target.dataset.kinds)== '1')? 1: 0;
            //console.log(localStorage.getItem('button-' + target.dataset.name + '-' + target.dataset.kinds));
        }
        targets2[0].value = localStorage.getItem('list-muteuser');
        targets2[1].value = localStorage.getItem('list-muteuserrenote');
        targets2[2].value = localStorage.getItem('allow-other-server');
    }

    //set scroll button event
    let left = document.querySelector('.scrollleft');
    let right = document.querySelector('.scrollright');
    let scrolltarget = document.querySelector('.flex.left');

    left.addEventListener(`click`, () => {
        var targetpositon = scrolltarget.scrollLeft;
        scrolltarget.scrollTo({
            left: /*Math.max(*/ targetpositon - scroolloffset /*, 0)*/,
            behavior: 'smooth'
          });
    })
    right.addEventListener(`click`, () => {
        var targetpositon = scrolltarget.scrollLeft;
        scrolltarget.scrollTo({
            left: /*Math.min(*/ targetpositon + scroolloffset /*, scrolltarget.clientWidth)*/,
            behavior: 'smooth'
          });
    })

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
    LoadSetting();
});