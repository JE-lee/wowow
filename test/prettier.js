const helper = require('../src/helper')
const chai = require('chai')
const expect = chai.expect
const fsync = require('fs-sync')
const path = require('path')

const prettier = require('../src/feature/eslint-prettier/prettier')

describe('#prettier', function(){
	const removes = []
	const root = __dirname
	const gitignore = ['root', 'dist']
	before(function(){
		fsync.write(
			path.join(root, '.gitignore'),
			gitignore.join('\n'),
			'utf8'
		)
	})

	it('#install', function(done){
		const { devDependencies, config, filename, ignoreName} = helper.install({}, prettier, root)
		removes.push(filename)
		removes.push(ignoreName)
		const json = helper.getJSON(path.join(root, `/${filename}`))
		// 比较ignore
		const ignore = helper.getIgnore(path.join(root, `/${ignoreName}`))
		expect(config).to.deep.equal(json)
		expect(ignore).to.have.members(gitignore)
		done()
	})
	after(function(){
		removes.forEach(name => fsync.remove(path.join(root, `/${ name }`)))
	})
})