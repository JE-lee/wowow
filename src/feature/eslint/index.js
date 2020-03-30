const helper = require('../../helper')

const pck = (origin) => {
  origin.husky = origin.husky || {}
  origin.husky.hooks = origin.husky.hooks || {}
  origin.husky.hooks['pre-commit'] = 'lint-staged'
  // only lint the files that will be committed
  origin['lint-staged'] = {
    '*.{js, vue, jsx}': [
      'cross-env NODE_ENV=production eslint --fix --quiet', // remove --cache, due to the lint-staged
    ]
  }
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
  helper.installDependencies(['eslint'])
  helper.exec('npx', 'eslint --init', true)
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