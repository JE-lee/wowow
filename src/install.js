#!/usr/bin/env node
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const program = require('commander')
const chalk = require('chalk')

async function linearShell(commands) {
  for(let i = 0; i < commands.length; i++){
    let command = commands[i]
    console.log(chalk.green(`excute ${ command } ......`))
    const { stdout, stderr } = await exec(`powershell.exe ${ command }`)
    console.log('stdout:', stdout)
    stderr && console.log('stderr:', stderr)
  }
}


program
  .version('0.0.1', '-v, --vers', 'output the current version')
  .command('eslint')
  .option('-q, --query')
  .action((opt) => {
    if(opt.query){
      linearShell([
        'yarn add eslint --dev',
        'npx eslint --init'
      ])
    }
  })

program.parse(process.argv)
