const eslint = require('../src/feature/eslint')
const expect = require('chai').expect
const path = require('path')
describe('#eslint', function(){
  it('#isEslintReady', function(done){
    this.timeout(0)
    expect(eslint.isEslintReady(path.resolve(__dirname, '../'))).to.equal(true)
    done()
  }) 
})