const path = require('path')
const eslint = require('../src/feature/eslint-prettier/eslint')
const helper = require('../src/helper')
const fsync = require('fs-sync')
const chai = require('chai')
const expect = chai.expect

describe('#eslint-prefer', function(){
  it('#eslint-prefer', function(done){
    const config = {
      env: {
        node: true
      }
    }
    const root = __dirname
    const jsonPath = path.join(root, '/.eslintrc.json')
    helper.saveToJSON(config, jsonPath)
    const preferPath = eslint.savePrefer(root)
    // reinstall
    const { config: preferConfig } = eslint.install()
    expect(preferConfig).to.deep.equal(config)
    // remove eslintrc.json
    fsync.remove(jsonPath)
    fsync.remove(preferPath)
    done()
  })
})