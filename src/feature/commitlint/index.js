const helper = require('../../helper')
const dependencies = ['@commitlint/config-conventional', '@commitlint/cli', 'husky']
const path = require('path')
exports.install = function(){
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
  helper.success('commitlint has been installed successfully.')
}