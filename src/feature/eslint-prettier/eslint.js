// eslint + prettier
const fsync = require('fs-sync')
const path = require('path')
const chalk = require('chalk')
const ignore = require('./ignore').ignore

const geneDefault = () => {
  return {
    config: {
      root: true, // 禁止eslint 向上递归父文件夹查找eslint规则
      env: {
        // browser: true,
        // node: true,
        // mocha: true // enable mocha varibales 
      },
      parserOptions: {
        // set to "script" (default) or "module" if your code is in ECMAScript modules.
        sourceType: 'module',
        ecmaVersion: 2018,
        // parser使用default, 只有在使用jsx，flow，或者ts的时候才使用babel-eslint
        // parser: 'babel-eslint'
      },
      // 后面覆盖前面
      // eslint:standard == eslint-config-standard
      // eslint configuration https://eslint.org/docs/user-guide/configuring
      extends: ['eslint:recommended', 'plugin:vue/essential','eslint-config-prettier'],
      plugins: [ 'vue','prettier'],
      // plugins: ['vue'],
      rules: {
        'prettier/prettier': ['error'],
        // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'one-var': 1, //禁止声明var
      }
    },
    devDependencies: [
      'eslint',
      'eslint-plugin-prettier',
      'eslint-config-prettier',
      'eslint-plugin-vue' // 添加对vue的支持
    ],
    // /node_modules/* and /bower_components/* in the project root are ignored by default
    ignore,
    filename: '.eslintrc.json',
    ignoreName: '.eslintignore'
  }
}

const preferPath = path.join(__dirname, '/.eslint-prefer.json')

exports.install = function(options = {}){
  const { mocha = false, node = false, browser = true } = options
  let eslint = geneDefault()
  if(fsync.isFile(preferPath)){
    eslint.config = require(preferPath)
  }

  eslint.env = Object.assign({}, eslint.env, {
    node, 
    browser,
    mocha
  })

  return eslint
}

exports.savePrefer = function(root){
  const file = path.join(root || process.cwd(), '/.eslintrc.json')
  if(!fsync.isFile(file)){
    console.log(chalk.red('can not find .eslintrc.json in the current directory.'))
  }
  // recover
  fsync.copy(file, preferPath)
  console.log(chalk.green('save your .eslintrc.js success'))
  return preferPath
}
