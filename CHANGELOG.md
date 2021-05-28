## [2.8.5](https://github.com/JE-lee/wowow/compare/2.8.2...2.8.5) (2021-05-28)


### Bug Fixes

* disable use yarn by default ([4159a26](https://github.com/JE-lee/wowow/commit/4159a260831ccdc4bdce9c5368b38ba39c0e5fe2))
* disable use yarn defaulttly ([3a69471](https://github.com/JE-lee/wowow/commit/3a694710805a94bd73edb91fb78e4b1d7762c9c5))
* lock the version of husky base on ^4 ([537dee8](https://github.com/JE-lee/wowow/commit/537dee8ffc29818711531f544165b68b8033ebb5))
* not required .git for eslint and prettier ([3a8427f](https://github.com/JE-lee/wowow/commit/3a8427f5e145615d44f9d6caea1dbe19b480ef75))



## [2.8.2](https://github.com/JE-lee/wowow/compare/v2.8.0...2.8.2) (2021-01-23)


### Bug Fixes

* 安装eslint 后删除package-lock ([45b0c37](https://github.com/JE-lee/wowow/commit/45b0c37b8bfd48000e8439f4b7aba7302deb896c))
* 修改lint-staged 脚本 ([c25cb42](https://github.com/JE-lee/wowow/commit/c25cb42a9dc3ef9ca8c2f7a8a12b648a1eeefc85))
* typescript-eslint no eslintrc or prettierrc ([83d414c](https://github.com/JE-lee/wowow/commit/83d414ccf73f31973f2d4c8dafe53f4a793c9efe))



# [2.8.0](https://github.com/JE-lee/wowow/compare/v2.7.1...v2.8.0) (2020-04-11)


### Features

* speed up installing all feature ([c0acb1d](https://github.com/JE-lee/wowow/commit/c0acb1d2b8a695516b0e80b15ee69834625f8828))



## [2.7.1](https://github.com/JE-lee/wowow/compare/v2.7.0...v2.7.1) (2020-04-07)



# [2.7.0](https://github.com/JE-lee/wowow/compare/v2.1.0...v2.7.0) (2020-04-07)


### Bug Fixes

* 多次写入prettier lintstaged 脚本 ([2860fc8](https://github.com/JE-lee/wowow/commit/2860fc877e6917705a1851d8e193244c7499b14c))


### Features

* **commitizen:** 生成changelog之后，自动执行git commit ([948619a](https://github.com/JE-lee/wowow/commit/948619a1ba690e0ddd0199743c461b8d5c637cc1))
* add wowow command ([930305d](https://github.com/JE-lee/wowow/commit/930305db14cf378525f408adad4ed59f8e15c743))



# [2.1.0](https://github.com/JE-lee/wowow/compare/7dd341cf7ff0ca34205ddaf4576aad481cda4175...v2.1.0) (2020-04-05)


### Bug Fixes

* **commitlint:** 安装commitizen包错误 ([d60a2f5](https://github.com/JE-lee/wowow/commit/d60a2f50be0d05a30219fca2eccab77c51c634a4))
* **prettier:** prettier 配置文件名字 ([73ad377](https://github.com/JE-lee/wowow/commit/73ad377d52182c85f166416bb7fe804459e261e5))
* 安装commitlint之前判断是否在git仓库 和 npm 项目里面 ([451f7d5](https://github.com/JE-lee/wowow/commit/451f7d52a798ef06bf511b2f064db5d5076ec531))
* change test condition ([7e17ed4](https://github.com/JE-lee/wowow/commit/7e17ed4429d0dfeb0ba36c66fa6949ffe7a5ed1b))
* copy file error ([aabfc10](https://github.com/JE-lee/wowow/commit/aabfc1055e7403ff7530a783f7059cd1a36e6566))
* ensure eslint is ready before install lint-staged ([1c2b465](https://github.com/JE-lee/wowow/commit/1c2b465844d788d4a47d7ef6c2aa1fdcc0dd5a21))
* husky hooks ([e280c35](https://github.com/JE-lee/wowow/commit/e280c357b291c9b6f0015e5e5cd1ed2a6abf835a))
* husky package name ([2eff6e1](https://github.com/JE-lee/wowow/commit/2eff6e1dc244fc83d98b2719f6f22d4adefac5a1))
* lack cross-spawn depen ([6eea3d6](https://github.com/JE-lee/wowow/commit/6eea3d655d9599c6eb40f390775d20f99029b2a6))
* leave over the .vscode dir when test test/vscode-mocha-debug ([bf3019c](https://github.com/JE-lee/wowow/commit/bf3019ceadd36a67522df4ac5deedfcb193fa6c9))
* lint-staged 脚本的作用范围 ([f14b68b](https://github.com/JE-lee/wowow/commit/f14b68b41b8020ed22fa3a5dff3ac015c8c92995))
* mocha command ([23ab093](https://github.com/JE-lee/wowow/commit/23ab093ae10b989374ce76c1ff819ed2994ac6d2))
* prettier 命令 ([e96fc5a](https://github.com/JE-lee/wowow/commit/e96fc5a48e5c550d4610ffe753179b75874d8e82))
* **test-helper.js:** ignore the ignore lint if no ignorename ([2c141ee](https://github.com/JE-lee/wowow/commit/2c141ee8793f9090e5e7b59bbd618a3ff306dbba))
* some error with eslintrc.json ([741d4d4](https://github.com/JE-lee/wowow/commit/741d4d4b3743ee790f354aa4ce36ebde2a934576))


### Features

* **commitizen:** 增加change:first changelog 脚本命令 ([f5d3d90](https://github.com/JE-lee/wowow/commit/f5d3d9079d455799ea624e07a1c036cbac27bace))
* **commitizen:** changelog命令增加standard-version,自动更新版本 ([0e176bb](https://github.com/JE-lee/wowow/commit/0e176bbb6e0c8e310e7e8a7a4e21e542d34ef813))
* 安装前检查eslint是否已经安装，避免重复安装 ([0512515](https://github.com/JE-lee/wowow/commit/0512515ba5d6dac12fa1e342ef2b569ebd8b97c9))
* 安装commitlint 默认一起安装commitizen ([afec391](https://github.com/JE-lee/wowow/commit/afec39162d18b3d738f3050f584e1e9af347d673))
* 更合适的prettier配置，添加对vue文件的eslint支持 ([c763fa9](https://github.com/JE-lee/wowow/commit/c763fa92b9f1d9554019c76e79cbcf37e60d2ed1))
* 支持写入prettier的规则到eslintrc.js, eslintrc.yml, eslintrc.json中 ([ccb9568](https://github.com/JE-lee/wowow/commit/ccb956813c0644e1c01bf068818773f8991a46d2))
* add commitizen ([193fcd0](https://github.com/JE-lee/wowow/commit/193fcd045fb1c5e6065a4ce0d6aef9896689404e))
* add commitlin install script ([c75e35d](https://github.com/JE-lee/wowow/commit/c75e35d978e3ec91c3b38b9e024078d9a5592767))
* add commitlint ([4c94e2b](https://github.com/JE-lee/wowow/commit/4c94e2b8078eb6caa3ee442e906bb6c32e559d58))
* add commitlint subcommand ([e058ad7](https://github.com/JE-lee/wowow/commit/e058ad729984b59245c4cbe509c63022ac98f06c))
* add eslint subcommand ([ea10c53](https://github.com/JE-lee/wowow/commit/ea10c534b6ac3922dc767c4c4aca240187d7f2ee))
* add mocha command ([933e918](https://github.com/JE-lee/wowow/commit/933e91840937245b0adb31eca2272886b72b1cff))
* add test for commitlint ([54125d6](https://github.com/JE-lee/wowow/commit/54125d69b7257b8de5a570babf4e1154266e0317))
* change bin name with lalala ([e8d9ab4](https://github.com/JE-lee/wowow/commit/e8d9ab47e68b34e22f0c472a4c4973e8e0607193))
* commitlint v2 ([d002117](https://github.com/JE-lee/wowow/commit/d0021177fb06c4f8fbbef2eb6854d58ab64868b0))
* eslint command (not yet) ([6d69e69](https://github.com/JE-lee/wowow/commit/6d69e699501b39046109fed15f12245281bc5f2e))
* eslint save prefer 支持保存.eslintrc.js ([6226cdd](https://github.com/JE-lee/wowow/commit/6226cdd754a815dd0da1cbf1f2b1d566c7f7a2d2))
* init project ([7dd341c](https://github.com/JE-lee/wowow/commit/7dd341cf7ff0ca34205ddaf4576aad481cda4175))
* lint-staged ([dfd0d97](https://github.com/JE-lee/wowow/commit/dfd0d97042437c0e4d1275a42daf97b90916b25d))
* pre-commit with eslint and prettier ([c265212](https://github.com/JE-lee/wowow/commit/c265212fe8602ef4b9a0052e675eeeca12e5c194))
* prettier ([78f91cb](https://github.com/JE-lee/wowow/commit/78f91cb28e857d34c6a07d2b083c81749442da63))
* prettier 的lint-staged脚本 ([c7e608f](https://github.com/JE-lee/wowow/commit/c7e608fa5fa1df05533b04d2195a3d1e3253aaac))
* set same ignores file in eslint and prettier ([32de81e](https://github.com/JE-lee/wowow/commit/32de81e8ee99470e2641f528b54ef2cfb075bdd0))
* test eslint ([88c02a6](https://github.com/JE-lee/wowow/commit/88c02a6b1b7f90d99e64c4751c854f4878996849))
* test eslint-prefer ([1936e9c](https://github.com/JE-lee/wowow/commit/1936e9c203c13d88df03d772e2b48fbf4724e77e))
* typescript-eslint ([3248a94](https://github.com/JE-lee/wowow/commit/3248a94e0716f380645431f37be8c35203b0aeb7))
* typescript-eslint ([6cc8a27](https://github.com/JE-lee/wowow/commit/6cc8a272517b52f6833f571e53c699d6b6adf3b3))
* typescript-eslint ([1120142](https://github.com/JE-lee/wowow/commit/1120142d0dbd9d507b0539eb69c2367b2f117185))
* v2重构eslint, prettier, 待测试 ([7d89e1a](https://github.com/JE-lee/wowow/commit/7d89e1ad3afbdaf2b30b069d1957b71eb9f7f387))
* vscode-mocha-debug ([1b2221e](https://github.com/JE-lee/wowow/commit/1b2221ea60fb5487d610bdba5be25e47850635d5))



