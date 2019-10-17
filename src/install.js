#!/usr/bin/env node
const program = require('commander')
const spawn = require('cross-spawn')
const helper = require('./helper')

const eslint = require('./feature/eslint-prettier/eslint')
const prettier = require('./feature/eslint-prettier/prettier')
const mocha = require('./feature/mocha/index')
const debugMocha = require('./feature/mocha/vscode-debug')

function exec(command, args, isSync = false){
  return (isSync ? spawn.sync : spawn)(command, args, { stdio: 'inherit'})
}

function retry(commands){
  for(let i = 0; i < commands.length; i++){
    let command = commands[i].split(' ')
    if(!exec(command[0], command.slice(1), true).error) return
  }
}

function installDependencies(dependencies){
  retry([
    `yarn add ${ dependencies.join(' ')} --dev`,
    `npm install ${ dependencies.join(' ') } --save-dev`
  ])
}

// eslint
program
  .version('0.0.1', '-v, --vers', 'output the current version')
  .command('eslint')
  .option('-q, --query', 'specify your style through answer question')
  .option('-s, --save', 'save your prefer eslint style')
  .action((opt) => {
    if(opt.save){
      eslint.savePrefer()
      return 
    }

    if(opt.query){
      retry([
        'npm install eslint --save-dev',
        'yarn add eslint --dev'
      ])
      exec('npx', ['eslint', '--init'], true)
    }else {
      const { devDependencies: eslintDepend } = helper.install(opt, eslint)
      const { devDependencies: prettierDepen } = helper.install(opt, prettier)
      const dependencies = eslintDepend.concat(prettierDepen)
      installDependencies(dependencies)
    }

  })

// mocha
program
  .command('mocha')
  .option('-f, --file, <file>')
  .action((opt) => {
    // vscode mocha debug configuration
    if(opt && typeof opt === 'string'){
      debugMocha.install({ file: opt })
      return 
    }
    const { devDependencies } = helper.install(opt, mocha)
    installDependencies(devDependencies)
  })

program.parse(process.argv)
