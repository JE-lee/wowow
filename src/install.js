#!/usr/bin/env node
const program = require('commander')
const spawn = require('cross-spawn')
const helper = require('./helper')
const eslint = require('./feature/eslint-prettier/eslint')
const prettier = require('./feature/eslint-prettier/prettier')

function exec(command, args, isSync = false){
  return (isSync ? spawn.sync : spawn)(command, args, { stdio: 'inherit'})
}

function retry(commands){
  for(let i = 0; i < commands.length; i++){
    let command = commands[i].split(' ')
    if(!exec(command[0], command.slice(1), true).error) return
  }
}

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
      const dependencies = eslintDepend.concat(prettierDepen).join(' ')
      retry([
        `yarn add ${ dependencies} --dev`,
        `npm install ${ dependencies } --save-dev`
      ])
    }

  })

program.parse(process.argv)
