#!/usr/bin/env node
const program = require('commander')
const helper = require('./helper')
const path = require('path')
const fsync = require('fs-sync')
const chalk = require('chalk')

const eslint = require('./feature/eslint-prettier/eslint')
const prettier = require('./feature/eslint-prettier/prettier')
const mocha = require('./feature/mocha/index')
const debugMocha = require('./feature/mocha/vscode-debug')
const commitLint = require('./feature/commitlint/index')
const commitizen = require('./feature/commitizen/index')

const bin = 'wowow'

function warn(msg){
  console.log(chalk.red(msg))
}

function hasGitRepos() {
  return fsync.isDir(path.join(process.cwd(), '/.git'))
}

function installEslint(opt) {
  const { devDependencies: eslintDepend } = helper.install(opt, eslint)
  const { devDependencies: prettierDepen } = helper.install(opt, prettier)
  const dependencies = eslintDepend.concat(prettierDepen)
  // if no .git
  if (!hasGitRepos()) {
    warn(`
      you shoulu init your git repository and then run 
      ${ bin} eslint
    `)
    return
  } else if (!helper.isNPMProject()) {
    warn('not npm project')
    return
  }else {
    helper.installDependencies(dependencies)
    // pre-commit
    // more information about mrm lint-staged 
    // https://github.com/sapegin/mrm/tree/master/packages/mrm-task-lint-staged
    helper.exec('npx', ['mrm', 'lint-staged'], true)
  }
}

// should install husky first
function installCommitLint(opt) {
  // if no git repos
  if (!hasGitRepos()) {
    warn(`
      you shoulu init your git repository and then run 
      ${ bin} commitlint
    `)
    return
  }
  const { devDependencies } = helper.install(opt, commitLint)
  helper.installDependencies(devDependencies)
  // write husky hook
  const root = process.cwd()
  const file = path.join(root, '/package.json')
  const packageJson = helper.getJSON(file)
  packageJson.husky = packageJson.husky || {}
  packageJson.husky.hooks = packageJson.husky.hooks || {}
  packageJson.husky.hooks['commit-msg'] = 'commitlint -E HUSKY_GIT_PARAMS'
  helper.saveToJSON(packageJson, file)
}

function installCommitizen(opt) {
  if (helper.isNPMProject()) {
    const { devDependencies } = helper.install(opt, commitizen)
    helper.installDependencies(devDependencies)
  } else {
    warn('not a npm project')
  }
}

// eslint
program
  .version('0.0.1', '-v, --vers', 'output the current version')
  .command('eslint')
  .option('-s, --save', 'save your prefer eslint style')
  .action((opt) => {
    if (opt.save) {
      eslint.savePrefer()
      return
    }
    installEslint(opt)
  })

// commit lint
program
  .command('commitlint')
  .action(() => installCommitLint())

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

// commitizen
program.command('commitizen').action(opt => {
  if(!hasGitRepos()){
    warn('not git repo')
    return
  }
  installCommitizen(opt)
  // make the repo Commitizenn-friendly
  if(helper.isYarnUsed() || helper.isYarnAble()){
    helper.exec('npx', 'commitizen init cz-conventional-changelog --yarn --dev --exact', true)
  }else {
    helper.exec('npx', 'commitizen init cz-conventional-changelog --save-dev --save-exact', true)
  }
  // add npm script
  const file = path.join(process.cwd(), '/package.json')
  const pck = helper.getJSON(file)
  if(!pck){
    warn('not a valid package.json')
  }
  pck.scripts = pck.scripts || {}
  pck.scripts['commit'] = 'npx git-cz'
  helper.saveToJSON(pck, file)
  console.log(chalk.green('now you can use npm run commit when running git commit'))
})

program.parse(process.argv)
// install eslint, prettier, commitlint

if (!program.args.length) {
  if (!hasGitRepos()) {
    warn(`
      you shoulu init your git repository and then run 
      ${ bin}
    `)
    return
  }
  installEslint(program)
  installCommitLint(program)
}

