#!/usr/bin/env node
const program = require('commander')
const helper = require('./helper')

const eslint = require('./feature/eslint')
const prettier = require('./feature/prettier')
const mocha = require('./feature/mocha/index')
const debugMocha = require('./feature/mocha/vscode-debug')
const commitLint = require('./feature/commitlint/index')
const commitizen = require('./feature/commitizen/index')
const typescriptEslint = require('./feature/typescript-eslint/index')

const pck = require('../package.json')

program
  .version(`${pck.version}`, '-v, --vers', 'output the current version')
  // eslint
  .command('eslint')
  .action(() => eslint.install())

// prettier
program
  .command('prettier')
  .action(() => prettier.install())

// commit lint
program
  .command('commitlint')
  .action(() => commitLint.install())

// commitizen
program.command('commitizen')
  .action(opt => commitizen.install(opt))

// typescript
program.command('typescript-eslint')
  .action(() => typescriptEslint.install())

// mocha
program
  .command('mocha')
  .option('-f, --file, <file>', 'add a vscode debug configuration')
  .action((opt) => {
    // vscode mocha debug configuration
    if (opt.file) {
      debugMocha.install({ file: opt.file })
      return
    }
    const { devDependencies } = helper.install(opt, mocha)
    helper.installDependencies(devDependencies)
  })

program.parse(process.argv)

