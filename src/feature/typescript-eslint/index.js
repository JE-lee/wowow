const path = require('path')
const eslintrc = path.join(__dirname, '/_eslintrc.js')
const prettierrc = path.join(__dirname, '/_prettierrc.js')
module.exports = {
  devDependencies: [
    'typescript', // 全局安装的typescript 在windows中无法被@typescript-eslint/eslint-plugin require
    'eslint',
    '@typescript-eslint/parser',
    '@typescript-eslint/eslint-plugin',
    'eslint-plugin-react',
    'prettier',
    'eslint-config-prettier',
    'eslint-plugin-prettier'
  ],
  eslintrc,
  prettierrc
}