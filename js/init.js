//set css code wrapper
let wrapper = '<style class="filtercsswrapper"></style>';
document.querySelector(`head`).insertAdjacentHTML('beforeend', wrapper);

//load last css settings when code exists
let csscode = localStorage.getItem('lastcss');
if(csscode != null){
    //console.log('css load.');
    document.querySelector(`.filtercsswrapper`).innerHTML=csscode;
}
