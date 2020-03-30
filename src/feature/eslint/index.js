const helper = require('../../helper')
const dependencies = [
  'cross-env',
  'husky',
  'lint-staged',
  'eslint'
]

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
  helper.installDependencies(dependencies)
  helper.exec('npx', 'eslint --init', true)
  // write package.json
  if (helper.writeToPck(pck)) {
    helper.success('install success!!!')
  } else {
    helper.warning('can not write scripts to package.json')
  }
}