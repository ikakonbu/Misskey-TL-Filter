
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

Prism.plugins.NormalizeWhitespace.setDefaults({
	'remove-trailing': true,
	'remove-indent': true,
	'left-trim': true,
	'right-trim': true,
	'break-lines': 80,
	'indent': 4,
	'remove-initial-line-feed': false,
	'tabs-to-spaces': 4,
	'spaces-to-tabs': 4
});


document.addEventListener("DOMContentLoaded", (event) => {
    console.log('ちんちん');
    document.querySelector("textarea").onkeydown = function( e ){ OnTabKey( e, this ); }
});
