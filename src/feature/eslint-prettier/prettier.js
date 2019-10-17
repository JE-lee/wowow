exports.install = function(options){
	const DEFAULT = {
		'trailingComma': "es5",
		'tabWidth': 2,
		'semi': false,
		'singleQuote': true,
		'bracketSpacing': true,
		'endOfLine': 'lf'
	}
	return {
		filename: '.prettierrc.json',
		ignoreName: '.prettierignore',
		config: DEFAULT
	}
}