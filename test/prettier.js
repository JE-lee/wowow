const prettier = require('../src/feature/prettier')
const helper = require('../src/helper')
const path = require('path')
const expect = require('chai').expect
describe('#prettier', function(){
  it('#pck', function(){
    const pck = helper.getJSON(path.resolve(__dirname, '../package.json'))
    pck['dependencies']['lint-staged'] = 'latest'
    const eslintScript = 'eslint . -- fix'
    const prettierScript = 'prettier . --write'
    const expectScript = [prettierScript, eslintScript]
    pck['lint-staged'] = {
      '*.js': eslintScript,
      '*.jsx': [eslintScript],
      '*.{js, jsx, vue}': eslintScript,
      '*.{js, ts}': eslintScript
    }
    prettier.pck(pck)
    const lintStaged = pck['lint-staged']
    expect(lintStaged['*.js']).to.deep.equal(expectScript)
    expect(lintStaged['*.jsx']).to.deep.equal(expectScript)
    expect(lintStaged['*.{js, jsx, vue}']).to.deep.equal(expectScript)
    expect(lintStaged['*.{js, ts}']).to.deep.equal(expectScript)
  })
})