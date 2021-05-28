const helper = require('../../helper')
const commitizen = require('../commitizen')
const path = require('path')

exports.dependencies = ['@commitlint/config-conventional', '@commitlint/cli', 'husky@^4.1.0']

exports.init = async () => {
  // copy file 
  helper.copyDir(path.join(__dirname, '/tpl'))
  // write husky hooks
  const pckPath = path.join(process.cwd(), '/package.json')
  const pck = helper.getJSON(pckPath)
  if(!pck){
    helper.warning(`no husky hooks write in ${pckPath}`)
    return false
  }
  pck.husky = pck.husky || {}
  pck.husky.hooks = pck.husky.hooks || {}
  pck.husky.hooks['commit-msg'] = 'commitlint -E HUSKY_GIT_PARAMS'
  helper.saveToJSON(pck, pckPath)
  return true
}

exports.install = async function(){
  if (!helper.isNPMProject()) {
    helper.warning('not in a npm project')
    return false
  }
  if (!helper.hasGitRepos()) {
    helper.warning('not in a git repository')
    return false
  }
  helper.installDependencies(exports.dependencies)
  await exports.init()
  // install commitizen
  await commitizen.install()
  helper.success('commitlint is ready.')
  return true
}