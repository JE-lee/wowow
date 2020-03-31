const helper = require('../../helper')
const path = require('path')
const fsExtra = require('fs-extra')
const fsync = require('fs-sync')
const micromatch = require('micromatch')
const _ = require('lodash')
const dependencies = [
  'prettier',
  'eslint-plugin-prettier', // prettier的规则
  'eslint-config-prettier', // 解决prettier和eslint rule的冲突
]

const pck = (origin) => {
  origin.scripts = origin.scripts || {}
  // 不要在prettier之后指定文件名，因为lint-staged会自动在prettier命令之后加入已经加入commit index的文件
  origin.scripts['prettier'] = 'prettier --write'
  origin.dependencies = origin.dependencies || {}
  origin.devDependencies = origin.devDependencies || {}
  if(origin.dependencies['lint-staged'] || origin.devDependencies['lint-staged']){
    origin['lint-staged'] = origin['lint-staged'] || {}
    // 所有符合js, jsx, vue的规则都加上prettier 脚本
    const spec = ['*.js', '*.jsx', '*vue']
    const prettier = 'prettier . --write'
    for(let [key, rule] of Object.entries(origin['lint-staged'])){
      if(spec.some(str => micromatch.isMatch(str, key))){
        if(_.isString(rule)){
          rule = [rule, prettier]
        }else if (_.isArray(rule)){
          rule.unshift(prettier)
        }
        origin['lint-staged'][key] = rule
      }
    }
  }
}

// eslint-disable-next-line no-unused-vars
async function assgnToEslint(cwd = helper.cwd) {
  // eslint rc
  const eslintrcPath = path.join(cwd, '/.eslintrc.js')
  if(!fsync.isFile(eslintrcPath)){
    return false
  }
  const push = (arr, item) => {
    if(!arr.includes(item)){
      arr.push(item)
    }
  }
  const eslintrc = require(eslintrcPath)
  eslintrc.extends = eslintrc.extends || []
  push(eslintrc.extends,'eslint-config-prettier')
  eslintrc.plugins = eslintrc.plugins || []
  push(eslintrc.plugins, 'prettier')
  // rules
  eslintrc.rules = eslintrc.rules || {}
  eslintrc.rules['prettier/prettier'] = ['error']
  await fsExtra.writeFile(eslintrcPath, `module.exports = ${JSON.stringify(eslintrc, null, 2)}`)
  // lint-staged
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
    // 更新eslintrc.js 之后，必须将先提高eslintrc.js 或者加入commit index
    helper.success('install success!!!, now you should add the eslintrc to the git commit index')
  } else {
    helper.warning('can not write scripts to package.json')
  }
}

exports.pck = pck