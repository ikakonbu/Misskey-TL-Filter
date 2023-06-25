document.addEventListener('DOMContentLoaded', function () {

    //設定ボタン系は入力を監視したいので、リストアップ
    let targets = document.querySelectorAll(`input[type="checkbox"]`);
    let targets2 = document.querySelector(`input[type="text"]`);
    let csscode = "";

    //フィルタを実現するCSSのテンプレ
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
    
    /*現在の設定値からCSSを生成する関数*/
    function CreateCSS(){
        csscode = "";
        //HTMLに独自属性を保持させて、それをもとに押されたボタンを特定して任意のTLでのフィルターを実現している
        for (let target of targets) {
            if(target.checked){
                csscode += stylecode[target.dataset.kinds].replaceAll('unko',"." + target.dataset.name).replaceAll('.no-add',"") + "\n";
            }
        }
        //ミュートしたいユーザー名
        if(targets2.value != ''){
            var muteuserlist = targets2.value.split(',');
            for(let name of muteuserlist){
                csscode += stylecode['usermute'].replaceAll('unko',name) + "\n";
            }
        }
        //console.log(csscode);
    }

    /*CSSを渡すと、そのCSSに書き換えてくれる関数*/
    function UpdateCSS(styles){
        document.querySelector(`.filtercsswrapper`).innerHTML=styles;
        localStorage.setItem('lastcss',styles);
    }

    /*今の設定をセーブする*/
    function SaveSetting(){
        for (let target of targets) {
            localStorage.setItem('button-' + target.dataset.name + '-' + target.dataset.kinds, target.checked? 1 : 0);
        }
        localStorage.setItem('list-muteuser', targets2.value);
    }

    /*保存された設定を呼びだす*/
    function LoadSetting(){
        /*初回起動時は設定がないので無視する*/
        //if(!saved) return;
        for (let target of targets) {
            target.checked = (localStorage.getItem('button-' + target.dataset.name + '-' + target.dataset.kinds)== '1')? 1: 0;
            //console.log(localStorage.getItem('button-' + target.dataset.name + '-' + target.dataset.kinds));
        }
        targets2.value = localStorage.getItem('list-muteuser');
    }

    //設定が変更されたら、CSSを生成して設定変更するようにイベントリスナーを立てる
    for (let target of targets) {
    target.addEventListener(`change`, () => {
        CreateCSS();
        SaveSetting();
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.scripting.executeScript({
                target : {tabId : tabs[0].id},
                func : UpdateCSS,
                args : [csscode]
            });//.then(() => console.log("injected a function"));
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
            });//.then(() => console.log("injected a function"));
        });
    })
    LoadSetting();
});