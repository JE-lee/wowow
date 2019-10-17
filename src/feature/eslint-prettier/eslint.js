// eslint + prettier
const fsync = require('fs-sync')
const path = require('path')
const chalk = require('chalk')

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
        // parser使用default, 只有在使用jsx，flow，或者ts的时候才使用babel-eslint
        // parser: 'babel-eslint'
      },
      // 后面覆盖前面
      // eslint:standard == eslint-config-standard
      // eslint configuration https://eslint.org/docs/user-guide/configuring
      extends: ['eslint:standard', 'eslint-config-prettier'],
      // plugins: ['vue'],
      rules: {
        // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'one-var': 1, //禁止声明var
      }
    },
    devDependencies: [
      'eslint-config-standard',
      'eslint-config-prettier'
    ],
    // /node_modules/* and /bower_components/* in the project root are ignored by default
    ignore: [
      'package.json',
      'yarn.lock',
      'coverage/**',
      '.vscode/**',
      'dist/**'
    ]
  }
}

const preferPath = path.join(__dirname, '/eslint-prefer.json')

exports.generate = function(options){
  const { mocha = false, node = false, browser = false } = options
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

exports.savePrefer = function(){
  const file = path.join(process.cwd, '/.eslintrc.json')
  if(!fsync.isFile(file)){
    console.log(chalk.red('can not find .eslintrc.js in the current directory.'))
  }
  // recover
  fsync.copy(file, preferPath)
  console.log(chalk.green('save your .eslintrc.js success'))
}
