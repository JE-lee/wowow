#!/usr/bin/env node
const program = require('commander')
const spawn = require('cross-spawn')
const helper = require('./helper')
const path = require('path')
const fsync = require('fs-sync')
const chalk = require('chalk')

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
    const result = exec(command[0], command.slice(1), true)
    if(!result.error) return result
  }
  return false
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
  .option('-s, --save', 'save your prefer eslint style')
  .action((opt) => {
    if(opt.save){
      eslint.savePrefer()
      return 
    }

    const { devDependencies: eslintDepend } = helper.install(opt, eslint)
    const { devDependencies: prettierDepen } = helper.install(opt, prettier)
    const dependencies = eslintDepend.concat(prettierDepen)
    installDependencies(dependencies)
    // no .git
    if(!fsync.isDir(path.join(process.cwd(), '/.git'))){
      console.log(chalk.red(`
        you shoulu init your git repository and then run 
        npx mrm lin-staged
      `))
      return
    }else {
      // pre-commit
      exec('npx', ['mrm', 'lint-staged'], true)
    }
    
  })

// mocha
program
  .command('mocha')
  .option('-f, --file, <file>', 'add a vscode debug configuration')
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
