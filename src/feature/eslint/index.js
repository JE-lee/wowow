const helper = require('../../helper')
const fsExtra = require('fs-extra')
const path = require('path')

exports.dependencies = ['eslint']
exports.init = async () => {
  return helper.exec('npx', 'eslint --init', true)
}

exports.install = async () => {
  if (!helper.isNPMProject()) {
    helper.warning('not in a npm project')
    return false
  }
  
  if (!helper.isEslintReady()) {
    helper.installDependencies(exports.dependencies)
    await exports.init()
  }

  // 如果使用了yarn， 就将package-lock.json删除
  const pckLock = path.resolve(process.cwd(), './package-lock.json')
  if (helper.isYarnUsed() && fsExtra.existsSync(pckLock)) {
    fsExtra.remove(pckLock)
  }
  
  helper.success('eslint is ready!')
}

exports.isEslintReady = helper.isEslintReady