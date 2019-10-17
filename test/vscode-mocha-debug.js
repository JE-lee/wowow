const vsdebug = require('../src/feature/mocha/vscode-debug')
const helper = require('../src/helper')
const chai = require('chai')
const expect = chai.expect

describe('#mocha-vs-debug', function(){
  it('#mocha-vs-debug', function(done){
    const root = __dirname
    const name = './test/vscode.js'
    const file = vsdebug.install({ file: name}, root)
    const json = helper.getJSON(file)
    expect(json.configurations.some(c => c.name === name)).to.be.true
    done()
  })
})