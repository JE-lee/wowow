const fsync = require('fs-sync')
const path = require('path')
const spawn = require('cross-spawn')
const globby = require('globby')
const fsExtra = require('fs-extra')
const chalk = require('chalk')

const cwd = process.cwd()

function saveToJSON(obj, dest) {
  let json = {}	
  try {
    json = JSON.stringify(obj,null, 2)
  } catch (err) {
    // eslint disable no-empty
    return false
  }
  fsync.write(dest, json, 'utf8')
  return true
}

function getIgnore(file){
  try {
    const str = fsync.read(file, 'utf8')
    return str.split(/\r?\n/)	
  } catch (error) {
    return []
  }
}

function getJSON(file){
  try { 
    const json = fsync.read(file, 'utf8')
    return JSON.parse(json)
  } catch (error) {
    return null
  }
}

function isNPMProject(dir = process.cwd()){
  return fsync.isFile(path.join(dir, '/package.json'))
}

function hasGitRepos() {
  return fsync.isDir(path.join(process.cwd(), '/.git'))
}

function exec(command, args, isSync = false){
  args = typeof args === 'string' ? args.split(' ') : args
  return (isSync ? spawn.sync : spawn)(command, args, { stdio: 'inherit'})
}

function retry(commands){
  for(let i = 0; i < commands.length; i++){
    let command = commands[i].split(' ')
    const result = exec(command[0], command.slice(1), true)
    if(!result.error) return result
  }
  return false
}

function isYarnUsed(){
  return fsync.isFile(process.cwd(), '/yarn.lock')
}

function isYarnAble(){
  return !exec('yarn', ['--help'], true).error
}

function installDependencies(dependencies){
  retry([
    `yarn add ${ dependencies.join(' ')} --dev`,
    `npm install ${ dependencies.join(' ') } --save-dev`
  ])
}

function install(options, feat, root = (process.cwd())){
  const { ignore = [], devDependencies = [], config, filename, ignoreName } = feat.install(options)
  // config
  filename && saveToJSON(config, path.join(root, `/${filename}`))
  // 将.gitignore 和 ignore 合并
  const gitIgnorePath = path.join(root, '/.gitignore')
  ignoreName && fsync.write(
    path.join(root, `/${ignoreName}`), 
    ignore.concat(getIgnore(gitIgnorePath)).join('\n'),
    'utf8'
  )
  return {
    ignore, 
    devDependencies,
    config,
    filename,
    ignoreName
  }
}

async function copyDir(dir, dest){
  const paths = await globby('*', { cwd: dir })
  const result = []
  paths.forEach(filePath => {
    const pobj = path.parse(filePath)
    pobj.name = pobj.name.replace('_', '.')
    const target = path.join(dest, `/${pobj.name}${pobj.ext}`)
    result.push(target)
    fsExtra.ensureFileSync(target)
    fsExtra.copyFileSync(path.format(pobj), target)
  })
  return result
}

function success(msg){
  console.log(chalk.green(msg))
}

function warning(msg){
  console.log(chalk.red(msg))
}

/**
 * 
 * @param {obj} pck 
 */
function writeToPck(pck, dest = cwd){
  const name = 'package.json'
  const file = path.join(dest, `/${name}`)
  const json = getJSON(file)
  if(!json) return false
  if(typeof pck === 'function'){
    pck(json)
  }else{
    Object.assign(json, pck)
  }
  return saveToJSON(json, file)
}

module.exports = {
  saveToJSON,
  getJSON,
  isNPMProject,
  hasGitRepos,
  install,
  exec,
  isYarnUsed,
  isYarnAble,
  installDependencies,
  getIgnore,
  copyDir,
  success,
  warning,
  writeToPck,
  cwd
}