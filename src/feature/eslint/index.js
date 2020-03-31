const helper = require('../../helper')
const path = require('path')
const globby = require('globby')
const pck = (origin) => {
  origin.husky = origin.husky || {}
  origin.husky.hooks = origin.husky.hooks || {}
  origin.husky.hooks['pre-commit'] = 'lint-staged'
  // only lint the files that will be committed
  origin['lint-staged'] = {
    '*.{js, vue, jsx, ts, tsx}': [
      'cross-env NODE_ENV=production eslint --fix --quiet', // remove --cache, due to the lint-staged
    ]
  }
}

function isEslintReady(cwd = helper.cwd){
  const pck = helper.getJSON(path.join(cwd, '/package.json'))
  if(!pck) return false
  pck['dependencies'] = pck['dependencies'] || {}
  pck['devDependencies'] = pck['devDependencies'] || {}
  if(!pck['dependencies'].eslint && !pck['devDependencies'].eslint) return false
  const files = globby.sync('*eslint*', { cwd, dot: true })
  return files.length > 0
}

exports.install = async () => {
  if (!helper.isNPMProject()) {
    helper.warning('not a npm project')
    return
  }
  if (!helper.hasGitRepos()) {
    helper.warning('not a git repository')
    return
  }
  // if eslint has ready
  if(isEslintReady()) return 
  helper.installDependencies(['eslint'])
  helper.exec('npx', 'eslint --init', true)
  // eslint must be ready before installng lint-staged
  helper.installDependencies([
    'cross-env',
    'husky',
    'lint-staged'
  ])
  // write package.json
  if (helper.writeToPck(pck)) {
    helper.success('install success!!! now you should add eslintrc file to the git repo for lint-staged')
  } else {
    helper.warning('can not write scripts to package.json')
  }
}

exports.isEslintReady = isEslintReady