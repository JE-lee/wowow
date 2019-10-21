exports.install = function(){
  return {
    config: {
      extends: ['@commitlint/config-conventional'],
      rules: {
        // Place your rules here
      },
    },
    filename: '.commitlintrc.json',
    devDependencies: ['@commitlint/config-conventional', '@commitlint/cli', 'Husky']
  }
}