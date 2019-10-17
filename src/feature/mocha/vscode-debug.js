const makedir = require('make-dir')
const fsync = require('fs-sync')

exports.install = function (options) {
	const defaultConfigu = {
		name: 'Run mocha',
		type: 'node',
		request: 'launch',
		program: '${workspaceRoot}/node_modules/mocha/bin/_mocha',
		stopOnEntry: false,
		args: [
			'test/prettier.js',
			'--no-timeouts'
		],
		cwd: '${workspaceRoot}',
		runtimeExecutable: null,
		env: {
			NODE_ENV: 'test'
		}
	}

	const cwd = process.cwd()
	if(!fsync.isFile(''))
	const DEFAULT = {
		version: '0.2.0',
		configurations: [
			
		]
	}
	
}