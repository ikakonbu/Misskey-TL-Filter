var Domain_Name;
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

/*Main Function*/
chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
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
});

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
	let CSSCode;
	if(id>0){
		CSSCode = QuickCSSSettings[id-1].value;
		localStorage.setItem("UserQuickCSS-" + id + "-" + domain_name, CSSCode);
	}
	CSSCode = StaticCSSSetting.value;
	localStorage.setItem("UserStaticCSS-" + domain_name, CSSCode);
	chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
		chrome.scripting.executeScript({
			target : {tabId : tabs[0].id},
			func : SaveUserCSSatSite,
			args : [CSSCode]
		});
	});
}

function LoadUserCSS(domain_name){
	let trigger = new Event("input")
	QuickCSSSettings.forEach((node) => {
		let node_id = node.dataset.id;
		let CSSCode = localStorage.getItem("UserQuickCSS-" + node_id + "-" +domain_name);
		if(CSSCode != null){
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


	document.querySelector("textarea[data-kinds='static']").addEventListener("input",function(e){
		SaveUserCSS(Domain_Name,0);
		chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
			chrome.scripting.executeScript({
				target : {tabId : tabs[0].id},
				func : UpdateCSS,
				args : [e.target.value]
			});
		});
	});

	document.querySelector("#reload").addEventListener("click", (e) => {
		window.location.reload();
	});

    document.querySelector("textarea").onkeydown = function(e){
		OnTabKey(e,this);
	}

	document.querySelectorAll(".link_button.save").forEach((node) => {
		node.addEventListener("click", function(e){
			let target_id = e.target.closest(".accordion_contents").querySelector("textarea").dataset.id;
			SaveUserCSS(Domain_Name, target_id);
			document.querySelector(".status_modal").classList.add("show");
			window.setTimeout(()=>{ document.querySelector(".status_modal").classList.remove("show"); }, 1500);
		})
	})

