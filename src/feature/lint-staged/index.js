const helper = require('../../helper')
const pck = (origin) => {
  const isPrettier = helper.isPackageReady('prettier', process.cwd())
  origin.husky = origin.husky || {}
  origin.husky.hooks = origin.husky.hooks || {}
  origin.husky.hooks['pre-commit'] = 'lint-staged'
  // only lint the files that will be committed
  const scripts = ['cross-env NODE_ENV=production eslint --fix --quiet'] // remove --cache, due to the lint-staged
  if(isPrettier){ 
    scripts.unshift('prettier --write')
  }
  origin['lint-staged'] = { '*.{js, vue, jsx, ts, tsx}': scripts}
}
exports.install = async function(){
  if (!helper.isNPMProject()) {
    helper.warning('not a npm project')
    return false
  }
  if (!helper.hasGitRepos()) {
    helper.warning('not a git repository')
    return false
  }
  // if eslint ready
  if(!helper.isEslintReady()){
    helper.warning('eslint was  found in this repo.')
    return false
  }
  helper.installDependencies([
    'cross-env',
    'husky',
    'lint-staged'
  ])
  // write package.json
  if (helper.writeToPck(pck)) {
    helper.success('lint-staged is ready')
    return true 
  } else {
    helper.warning('can not write scripts to package.json')
    return false
  }
}