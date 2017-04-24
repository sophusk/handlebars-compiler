Handlebars.registerHelper('makeLink', function (text, url) {
	// Avoid code injection - always
	text = Handlebars.Utils.escapeExpression(text);
	url = Handlebars.Utils.escapeExpression(url);
	// Build anchor tag
	var link = '<a href="' + url + '">' + text + '</a>';
	// Return link as 'SafeString' (prevent code escape) - use double-stash '{{makeLink example}}'
	return new Handlebars.SafeString(link);
});

Handlebars.registerHelper('changeColor', function (color) {
	// Avoid code injection - always
	text = Handlebars.Utils.escapeExpression(text);

	
});
