const helper = require('../../helper')
const lintStaged = require('../lint-staged')
const fsExtra = require('fs-extra')
const path = require('path')

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

  // 如果使用了yarn， 就将package-lock.json删除
  const pckLock = path.resolve(process.cwd(), './package-lock.json')
  if (helper.isYarnUsed() && fsExtra.existsSync(pckLock)) {
    fsExtra.remove()
  }
  
  // install lint-staged
  const result = await lintStaged.install()
  if (result) {
    helper.success('install success!!! now you should add eslintrc file to the git repo for lint-staged')
  }
}

exports.isEslintReady = helper.isEslintReady