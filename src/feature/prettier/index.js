const helper = require('../../helper')
const path = require('path')
const fsExtra = require('fs-extra')
const fsync = require('fs-sync')
const dependencies = [
  'prettier',
  'eslint-plugin-prettier', // prettier的规则
  'eslint-config-prettier', // 解决prettier和eslint rule的冲突
]

const pck = (origin) => {
  origin.scripts = origin.scripts || {}
  origin.scripts['prettier'] = 'prettier . --write'
}

// eslint-disable-next-line no-unused-vars
async function assgnToEslint(cwd = helper.cwd) {
  const eslintrcPath = path.join(cwd, '/.eslintrc.js')
  if(!fsync.isFile(eslintrcPath)){
    return false
  }
  const eslintrc = require(eslintrcPath)
  eslintrc.extends.push['eslint-config-prettier']
  eslintrc.plugins.push['prettier']
  await fsExtra.writeFile(eslintrcPath, `module.exports = ${JSON.stringify(eslintrc, null, 2)}`)
  return true
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
  // assign to eslint
  await assgnToEslint()
  await helper.copyDir(path.join(__dirname, '/tpl'))
  // write package.json
  if (helper.writeToPck(pck)) {
    helper.success('install success!!!')
  } else {
    helper.warning('can not write scripts to package.json')
  }
}