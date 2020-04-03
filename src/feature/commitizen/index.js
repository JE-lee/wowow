const helper = require('../../helper')
const path = require('path')

const devDependencies = ['@commitlint/config-conventional', '@commitlint/cli', 'husky']
exports.install = async function(){
  if (!helper.isNPMProject()) {
    helper.warning('not a npm project')
    return false
  }
  if (!helper.hasGitRepos()) {
    helper.warning('not a git repository')
    return false
  }
  // install dependencies
  helper.installDependencies(devDependencies)
  // make the repo Commitizenn-friendly
  if (helper.isYarnUsed() || helper.isYarnAble()) {
    helper.exec('npx', 'commitizen init cz-conventional-changelog --yarn --dev --exact', true)
  } else {
    helper.exec('npx', 'commitizen init cz-conventional-changelog --save-dev --save-exact', true)
  }
  // add npm script
  const file = path.join(process.cwd(), '/package.json')
  const pck = helper.getJSON(file)
  pck.scripts = pck.scripts || {}
  pck.scripts['commit'] = 'npx git-cz'
  helper.saveToJSON(pck, file)
  helper.success('now you can use npm run commit when running git commit')
  return true
}