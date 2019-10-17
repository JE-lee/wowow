const makedir = require('make-dir')
const fsync = require('fs-sync')
const helper = require('../../helper')
const chalk = require('chalk')
const path = require('path')

exports.install = function (options = {}, root) {
  const { file } = options
  const defaultConfig = {
    name: file,
    type: 'node',
    request: 'launch',
    program: '${workspaceRoot}/node_modules/mocha/bin/_mocha',
    stopOnEntry: false,
    args: [
      // 'test/prettier.js',
      `${ file }`,
      '--no-timeouts'
    ],
    cwd: '${workspaceRoot}',
    runtimeExecutable: null,
    env: {
      NODE_ENV: 'test'
    }
  }

  let launch = {
    version: '1.0.0',
    configurations: []
  }

  const cwd = root || process.cwd()
  const vscodeDir = path.join(cwd, '/.vscode')
  const launchFile = path.join(vscodeDir, '/launch.json')
  makedir.sync(vscodeDir)

  if(!fsync.isFile(launchFile)){
    launch = helper.getJSON(launchFile) || launch
  }

  launch.configurations = launch.configurations || []
  launch.configurations.push(defaultConfig)

  // write launch
  // fsync.write(launchFile, launch, 'utf8')
  helper.saveToJSON(launch, launchFile)
  console.log(chalk.green(`start configuration of ${ file } has setted successfully. 
	ensure you have install the mocha.`))
  return launchFile // launch.json path
}