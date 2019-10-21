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
const commitLint = require('./feature/commitlint/index')

const bin = 'wowow'

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

function hasGitRepos(){
  return fsync.isDir(path.join(process.cwd(), '/.git'))
}

function installEslint(opt){
  const { devDependencies: eslintDepend } = helper.install(opt, eslint)
  const { devDependencies: prettierDepen } = helper.install(opt, prettier)
  const dependencies = eslintDepend.concat(prettierDepen)
  
  // if no .git
  if(!hasGitRepos()){
    console.log(chalk.red(`
      you shoulu init your git repository and then run 
      ${ bin } eslint
    `))
    return
  }else {
    installDependencies(dependencies)
    // pre-commit
    exec('npx', ['mrm', 'lint-staged'], true)
  }
}

// should install husky first
function installCommitLint(opt){
  // if no git repos
  if(!hasGitRepos()){
    console.log(chalk.red(`
      you shoulu init your git repository and then run 
      ${ bin } commitlint
    `))
    return
  }
  const { devDependencies } = helper.install(opt, commitLint)
  installDependencies(devDependencies)
  // write husky hook
  const root = process.cwd()
  const file = path.join(root, '/package.json')
  const packageJson = helper.getJSON(file)
  packageJson.husky = packageJson.husky || {}
  packageJson.husky.hooks = packageJson.husky.hook || {}
  packageJson.husky.hooks['commit-msg'] = 'commitlint -E HUSKY_GIT_PARAMS'
  helper.saveToJSON(packageJson, file)
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
    installEslint(opt)
  })

// commit lint
program
  .command('commitlint')
  .action(() => {
    installCommitLint()
  })

// mocha
program
  .command('mocha')
  .option('-f, --file, <file>', 'add a vscode debug configuration')
  .action((opt) => {
    // vscode mocha debug configuration
    if(opt.file){
      debugMocha.install({ file: opt.file })
      return 
    }
    const { devDependencies } = helper.install(opt, mocha)
    installDependencies(devDependencies)
  })

program.parse(process.argv)
// install eslint, prettier, commitlint

if(!program.args.length){
  if(!hasGitRepos()){
    console.log(chalk.red(`
      you shoulu init your git repository and then run 
      ${ bin }
    `))
    return
  }
  installEslint(program)
  installCommitLint(program)
}

