const ignore = require('./ignore').ignore
exports.install = function(){
  const DEFAULT = {
    'trailingComma': 'es5',
    'tabWidth': 2,
    'semi': false,
    'singleQuote': true,
    'bracketSpacing': true,
    'endOfLine': 'lf'
  }
  return {
    devDependencies: ['prettier'],
    filename: '.prettierrc.json',
    ignore,
    ignoreName: '.prettierignore',
    config: DEFAULT
  }
}