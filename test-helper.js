const helper = require('./src/helper')
const chai = require('chai')
const expect = chai.expect
const fsync = require('fs-sync')
const path = require('path')

function install(feat, name){
  describe(`#${ name }`, function(){
    const removes = ['.gitignore']
    const root = path.join(__dirname, '/test')
    const gitignore = ['root', 'dist']
    before(function(){
      fsync.write(
        path.join(root, '.gitignore'),
        gitignore.join('\n'),
        'utf8'
      )
    })
	
    it(`#${ name }/install`, function(done){
      const { config, filename, ignoreName} = helper.install({}, feat, root)
      removes.push(filename)
      
      const json = helper.getJSON(path.join(root, `/${filename}`))
      expect(config).to.deep.equal(json)
      if(ignoreName){
        removes.push(ignoreName)
        // 比较ignore
        const ignore = helper.getIgnore(path.join(root, `/${ignoreName}`))
        expect(ignore).to.include.members(gitignore)
      }
      
      done()
    })
    after(function(){
      removes.forEach(name => fsync.remove(path.join(root, `/${ name }`)))
    })
  })
}

module.exports = {
  install
}

