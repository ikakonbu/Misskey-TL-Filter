Prism.Live.registerLanguage("clike", {
	comments: {
		singleline: "//",
		multiline: ["/*", "*/"]
	},
	snippets: {
		if: `if ($1) {
	$2
}`
	}
});

Prism.Live.registerLanguage("javascript", {
	snippets: {}
}, Prism.Live.languages.clike);
