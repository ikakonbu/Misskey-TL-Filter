document.addEventListener('DOMContentLoaded', function () {

    // element of checkbox and text input
    let targets = document.querySelectorAll(`input[type="checkbox"]`);
    let targets2 = document.querySelector(`input[type="text"]`);
    // css temp
    let csscode = "";

    // css code templete
    const stylecode = {
        rn:':is(div[style="position: sticky; top: var(--stickyTop, 0); z-index: 1000;"]:has(.xj7PE .xjQuN unko),header:has(unko))~div .xcSej.x3762:has(.xBwhh) { display: none;}',
        quote:':is(div[style="position: sticky; top: var(--stickyTop, 0); z-index: 1000;"]:has(.xj7PE .xjQuN unko),header:has(unko))~div .xcSej.x3762:has(.xnihJ) { display: none;}',
        nsfw:':is(div[style="position: sticky; top: var(--stickyTop, 0); z-index: 1000;"]:has(.xj7PE .xjQuN unko),header:has(unko))~div .xcSej.x3762:has(.ti-alert-triangle) { display: none !important; }',
        cw: ':is(div[style="position: sticky; top: var(--stickyTop, 0); z-index: 1000;"]:has(.xj7PE .xjQuN unko),header:has(unko))~div .xcSej.x3762:has(.xd2wm) { display: none;}',
        channel: '.xcSej.x3762:has(.xww2J) { display: none;}',
        usermute: '.xcSej.x3762:has(a[href="/@unko"]){ display: none; }',
        rocket: '.xcSej.x3762:has(.xuevx){ display: none; }',
        norocket: '.xcSej.x3762:not(:has(.xuevx)) { display: none; }'
    };
    
    /*create css code and save from now settings*/
    function CreateCSS(){
        csscode = "";
        //Judges which CSS to apply based on the unique attributes assigned to the HTML of the checkbox and generates code
        for (let target of targets) {
            if(target.checked){
                csscode += stylecode[target.dataset.kinds].replaceAll('unko',"." + target.dataset.name).replaceAll('.no-add',"") + "\n";
            }
        }
        //User Mute input
        if(targets2.value != ''){
            var muteuserlist = targets2.value.split(',');
            for(let name of muteuserlist){
                csscode += stylecode['usermute'].replaceAll('unko',name) + "\n";
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
        localStorage.setItem('list-muteuser', targets2.value);
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
        targets2.value = localStorage.getItem('list-muteuser');
    }

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
    targets2.addEventListener(`change`, () => {
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
    LoadSetting();
});