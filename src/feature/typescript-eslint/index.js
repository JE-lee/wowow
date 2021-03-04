const path = require('path')
const helper = require('../../helper')
const devDependencies = [
  'typescript', // 全局安装的typescript 在windows中无法被@typescript-eslint/eslint-plugin require
  'eslint',
  '@typescript-eslint/parser',
  '@typescript-eslint/eslint-plugin',
  'eslint-plugin-react',
  'prettier',
  'eslint-config-prettier',
  'eslint-plugin-prettier'
]

const pck = (origin) => {
  origin.husky = origin.husky || {}
  origin.husky.hooks = origin.husky.hooks || {}
  origin.husky.hooks['pre-commit'] = 'lint-staged'
  // only lint the files that will be committed
  origin['lint-staged'] = {
    '*.{ts, tsx}': [
      'prettier --wirte',
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
  helper.installDependencies(devDependencies)
  // copy eslint prittier
  helper.copyDir(path.join(__dirname, '/tpl'))
  helper.installDependencies([
    'cross-env',
    'husky@^4.1.0',
    'lint-staged'
  ])
  // write package.json
  if (helper.writeToPck(pck)) {
    helper.success('install success!!! now you should add eslintrc file to the git repo for lint-staged')
  } else {
    helper.warning('can not write scripts to package.json')
  }
}