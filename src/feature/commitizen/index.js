const helper = require('../../helper')
const path = require('path')

exports.dependencies = ['conventional-changelog-cli', 'standard-version']
exports.init = async () => {
  // make the repo Commitizenn-friendly
  if (helper.isYarnUsed() && helper.isYarnAble()) {
    helper.exec('npx', 'commitizen init cz-conventional-changelog --yarn --dev --exact', true)
  } else {
    helper.exec('npx', 'commitizen init cz-conventional-changelog --save-dev --save-exact', true)
  }
  // add npm script
  const file = path.join(process.cwd(), '/package.json')
  const pck = helper.getJSON(file)
  pck.scripts = pck.scripts || {}
  pck.scripts['commit'] = 'npx git-cz'
  pck.scripts['changelog:first'] = 'conventional-changelog -p angular -i CHANGELOG.md -s -r 0'
  pck.scripts['changelog'] = 'standard-version && conventional-changelog -p angular -i CHANGELOG.md -s -r 0'

  // husky hooks
  /* pck.husky = pck.husky || {}
  pck.husky.hooks = pck.husky.hooks || {}
  // 这个交互体验并不好
  pck.husky.hooks['prepare-commit-msg']= 'exec < /dev/tty && npx git-cz --hook' */
  helper.saveToJSON(pck, file)
}
exports.install = async function () {
  if (!helper.isNPMProject()) {
    helper.warning('not in a npm project')
    return false
  }
  helper.installDependencies(exports.dependencies)
  await exports.init()
  helper.success('install done')
  return true
}