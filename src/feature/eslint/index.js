const helper = require('../../helper')
const lintStaged = require('../lint-staged')

exports.dependencies = ['eslint']
exports.init = async () => {
  return helper.exec('npx', 'eslint --init', true)
}

exports.install = async () => {
  // if eslint has ready
  if (!helper.isNPMProject()) {
    helper.warning('not a npm project')
    return false
  }
  if (!helper.hasGitRepos()) {
    helper.warning('not a git repository')
    return false
  }
  if (!helper.isEslintReady()) {
    helper.installDependencies(exports.dependencies)
    await exports.init()
  }
  
  // install lint-staged
  const result = await lintStaged.install()
  if (result) {
    helper.success('install success!!! now you should add eslintrc file to the git repo for lint-staged')
  }
}

exports.isEslintReady = helper.isEslintReady