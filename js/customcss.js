
function OnTabKey( e, obj ){
	if( e.keyCode!=9 ){ return; }
	e.preventDefault();

	var cursorPosition = obj.selectionStart;
	var cursorLeft     = obj.value.substr( 0, cursorPosition );
	var cursorRight    = obj.value.substr( cursorPosition, obj.value.length );

	obj.value = cursorLeft+"\t"+cursorRight;
	obj.selectionEnd = cursorPosition+1;
}

document.addEventListener("DOMContentLoaded", (event) => {
    console.log('ちんちん');
    document.querySelector("textarea").onkeydown = function( e ){ OnTabKey( e, this ); }
});