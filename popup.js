document.addEventListener('DOMContentLoaded', function () {

    // element of checkbox ,text input and scroll button
    const targets = document.querySelectorAll(`input[type="checkbox"].filterbtn`);
    const targets2 = document.querySelectorAll(`input[type="text"]`);
    let left = document.querySelector('.scrollleft');
    let right = document.querySelector('.scrollright');
    let scrolltarget = document.querySelector('.flex.left');
    const scroolloffset = 450; 
    var csscode='';

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
    const transitioncode = "<style> * { transition: background-color .5s; } </style>"



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
        }
        targets2[0].value = localStorage.getItem('list-muteuser');
        targets2[1].value = localStorage.getItem('list-muteuserrenote');
        targets2[2].value = localStorage.getItem('allow-other-server');
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
    setTimeout(function(){ 
        document.querySelector(`head`).insertAdjacentHTML('beforeend', transitioncode)
    },500);
});