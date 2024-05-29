var Domain_Name;
var langdata;
const QuickCSSTitles = document.querySelectorAll(".csscard .textinput"); 
const QuickCSSSettings = document.querySelectorAll("textarea[data-kinds='quick']");
const StaticCSSSetting = document.querySelector("textarea[data-kinds='static']");

function OnTabKey( e, obj ){
	if(e.keyCode == 27){
		e.preventDefault();
		return;
	}
	if( e.keyCode!=9 ){ return; }
	e.preventDefault();

	var cursorPosition = obj.selectionStart;
	var cursorLeft     = obj.value.substr( 0, cursorPosition );
	var cursorRight    = obj.value.substr( cursorPosition, obj.value.length );

	obj.value = cursorLeft+"\t"+cursorRight;
	obj.selectionEnd = cursorPosition+1;
}
/*Update CSS from arg (excute script)*/
function UpdateCSS(styles){
	document.querySelector(`.usercsswrapper`).innerHTML=styles;
	localStorage.setItem('lastusercss',styles);
}
function GetDomain(){
	return document.domain;
}
function SaveUserCSSatSite(Code){
	localStorage.setItem("lastusercss", Code);
}

function SaveUserCSS(domain_name, id){
	let CSSTitle;
	let CSSCode;
	if(id>0){
		CSSTitle = QuickCSSTitles[id-1].value || "Option" + id;
		CSSCode  = QuickCSSSettings[id-1].value;
		if(CSSCode != ""){
			QuickCSSTitles[id-1].value = CSSTitle;
			QuickCSSSettings[id-1].value = CSSCode;
			localStorage.setItem("UserQuickCSS-Title-" + id, CSSTitle);
			localStorage.setItem("UserQuickCSS-Code-"  + id, CSSCode);
			return "save";
		} else {
			localStorage.setItem("UserQuickCSS-Title-" + id, "");
			localStorage.setItem("UserQuickCSS-Code-"  + id, "");
			return "empty";
		}
	} else {
		CSSCode = StaticCSSSetting.value;
		localStorage.setItem("UserStaticCSS-" + domain_name, CSSCode);
		chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
			chrome.scripting.executeScript({
				target : {tabId : tabs[0].id},
				func : SaveUserCSSatSite,
				args : [CSSCode]
			});
		});
		return false;
	}
}

function LoadUserCSS(domain_name){
	let trigger = new Event("input")
	QuickCSSSettings.forEach((node, i) => {
		let node_id = node.dataset.id;
		let CssTitle = localStorage.getItem("UserQuickCSS-Title-" + node_id);
		let CSSCode  = localStorage.getItem("UserQuickCSS-Code-"  + node_id);
		if(CSSCode != null){
			QuickCSSTitles[i].value = CssTitle;
			node.value = CSSCode;
			node.dispatchEvent(trigger);
		}
	});
	let CSSCode = localStorage.getItem("UserStaticCSS-" + domain_name);
	if(CSSCode != null){
		StaticCSSSetting.value = CSSCode;
		StaticCSSSetting.dispatchEvent(trigger);
	}
}

function CreateCSS(){
	let code = "";
	code += (StaticCSSSetting.value ?? "") + "\n";
	
	let setedkeys = [];
	for(key in localStorage){
		if(key.indexOf("UserQuickCSS-Code") != -1){
			setedkeys[key.replace(/[^0-9]/g, '') -1 ] = key;
		}
	}

	setedkeys.forEach((node,i) => {
		let node_val = localStorage.getItem("button-usercss-" + (i+1) + Domain_Name) || "0";
		if(node!="" && node_val == "1"){
			code += localStorage.getItem(node) + "\n";
		}
	});
	return code;

}

function ChangeLang(){
	let lang = localStorage.getItem('langage');
	if(lang == "japanese"){
		return;
	} else if(lang != null){
		const titles = document.querySelectorAll(".card h2");
        const texts = document.querySelectorAll(".card p");
		const warning_title = document.querySelector(".supplement-title b");
		const warning_text = document.querySelector(".supplement-text");
		let langdata = "";

		fetch("/lang/" + lang + ".json", {priority: 'high'})
		.then( response => response.json())
		.then( (data) => {
			langdata = data;

			counter=0;
			for(let title of titles){
				title.innerHTML = langdata.usercssedit.title[counter];
				counter += 1;
			}

			counter=0;
			for(let text of texts){
				text.innerHTML = langdata.usercssedit.text[counter];
				counter += 1;
			}

			warning_title.innerHTML = langdata.usercssedit["supplementTltle"];
			warning_text.innerHTML  = langdata.usercssedit["supplementText"];
		});
	}
}

/*Main Function*/
chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
	ChangeLang();
	chrome.scripting.executeScript({
		target: { tabId : tabs[0].id },
		func: GetDomain,
	})
	.then((values) => {
		console.log(values);
		Domain_Name =  values[0].result;
		LoadUserCSS(Domain_Name);
	})
	.catch((e) => {
		console.log("error: " + e);
	});

	let lang = localStorage.getItem('langage') ?? "japanese";
	fetch("/lang/" + lang + ".json", {priority: 'high'})
    .then( response => response.json())
	.then( (data) => {
    	langdata = data.css;
		ChangeLang();
	});
});

document.querySelector("textarea[data-kinds='static']").addEventListener("input",function(e){
	SaveUserCSS(Domain_Name,0);
	let usercsscode = CreateCSS();
	chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
		chrome.scripting.executeScript({
			target : {tabId : tabs[0].id},
			func : UpdateCSS,
			args : [usercsscode]
		});
	});
});

document.querySelector("textarea").onkeydown = function(e){
	OnTabKey(e,this);
}

document.querySelectorAll(".link_button.save").forEach((node) => {
	node.addEventListener("click", function(e){
		let target_id = e.target.closest(".accordion_contents").querySelector("textarea").dataset.id;
		let result = SaveUserCSS(Domain_Name, target_id);
		if(result){
			let usercsscode = CreateCSS();
			chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
				chrome.scripting.executeScript({
					target : {tabId : tabs[0].id},
					func : UpdateCSS,
					args : [usercsscode]
				});
			});
			document.querySelector(".status_modal .card").innerText = langdata.status[result];
			document.querySelector(".status_modal").classList.add("show");
			window.setTimeout(()=>{ 
				document.querySelector(".status_modal").classList.remove("show"); 
			}, 1500);
		}
	})
});

document.querySelectorAll(".accordion_icon").forEach((node) => {
	node.addEventListener("click", function(e){
		node.parentElement.querySelector(".accordion").click();
	})
});

