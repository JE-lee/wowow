const fsync = require('fs-sync')
const path = require('path')

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
  install,
  getIgnore,
}