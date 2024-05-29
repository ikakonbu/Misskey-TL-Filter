//set css code wrapper
let settingwrapper = '<style class="filtercsswrapper"></style>';
let usercsswrapper = '<style class="usercsswrapper"></style>';
document.querySelector(`head`).insertAdjacentHTML('beforeend', settingwrapper);
document.querySelector(`head`).insertAdjacentHTML('beforeend', usercsswrapper);

//load last css settings when code exists
let csscode = localStorage.getItem('lastcss');
let usercsscode =  localStorage.getItem('lastusercss');
if(csscode != null){
    //console.log('css load.');
    document.querySelector(`.filtercsswrapper`).innerHTML=csscode;
}
if(usercsscode != null){
    //console.log('css load.');
    document.querySelector(`.usercsswrapper`).innerHTML=usercsscode;
}

