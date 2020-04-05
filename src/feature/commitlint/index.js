const helper = require('../../helper')
const commitizen = require('../commitizen')

const dependencies = ['@commitlint/config-conventional', '@commitlint/cli', 'husky']
const path = require('path')
exports.install = async function(){
  if (!helper.isNPMProject()) {
    helper.warning('not a npm project')
    return false
  }
  if (!helper.hasGitRepos()) {
    helper.warning('not a git repository')
    return false
  }
  helper.installDependencies(dependencies)
  // copy file 
  helper.copyDir(path.join(__dirname, '/tpl'))
  // write husky hooks
  const pckPath = path.join(process.cwd(), '/package.json')
  const pck = helper.getJSON(pckPath)
  if(!pck){
    helper.warning(`no husky hooks write in ${pckPath}`)
  }
  pck.husky = pck.husky || {}
  pck.husky.hooks = pck.husky.hooks || {}
  pck.husky.hooks['commit-msg'] = 'commitlint -E HUSKY_GIT_PARAMS'
  helper.saveToJSON(pck, pckPath)
  // install commitizen
  await commitizen.install()
  helper.success('commitlint has been installed successfully.')
  return true
}