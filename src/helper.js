const fsync = require('fs-sync')
const path = require('path')
const spawn = require('cross-spawn')


function saveToJSON(obj, dest) {
  let json = {}	
  try {
    json = JSON.stringify(obj,null, 2)
  } catch (err) {
    // eslint disable no-empty
  }
  fsync.write(dest, json, 'utf8')
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

module.exports = {
  saveToJSON,
  getJSON,
  isNPMProject,
  install,
  exec,
  isYarnUsed,
  isYarnAble,
  installDependencies,
  getIgnore,
}