let lang = localStorage.getItem('langage');
fetch("/lang/" + lang + ".json", {priority: 'high'})
.then( response => response.json())
.then( (data) => {
    langdata = data;
    ChangeLang();
});

function ChangeLang() {
    document.querySelector(".card h2").innerText = langdata.disable.title;
    document.querySelector(".card p").innerText = langdata.disable.text;
}