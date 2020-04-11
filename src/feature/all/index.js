const helper = require('../../helper')
const eslint = require('../eslint')
const prettier = require('../prettier')
const lintStaged = require('../lint-staged')
const commitLint = require('../commitlint')
const commitizen = require('../commitizen')

exports.install = async () => {
  if (!helper.isNPMProject()) {
    helper.warning('not a npm project')
    return false
  }
  if (!helper.hasGitRepos()) {
    helper.warning('not a git repository')
    return false
  }
  let dependencies = [].concat(
    eslint.dependencies,
    prettier.dependencies,
    lintStaged.dependencies,
    commitLint.dependencies,
    commitizen.dependencies
  )
  dependencies = [...new Set(dependencies)]

  helper.installDependencies(dependencies)
  await eslint.init()
  await prettier.init()
  await lintStaged.init()
  await commitLint.init()
  await commitizen.init()
  helper.success('all of eslint, prettier, lint-staged, commitlint has installed successfulley!!! enjoy coding')
}

