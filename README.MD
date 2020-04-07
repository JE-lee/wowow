# wowow
一个给你的javascript项目快速集成ESlint, prettier, lint-staged,commitlint等js开发辅助工具的的命令行应用。
目的是帮助js开发者**快速拥有**一个舒适的，规范的编程环境。

## 功能
- 一键安装eslint,prettier, 自动解决eslint 和 prettier一起使用的冲突
- 集成lint-staged，自动在commit之前进行增量的eslint和prettier检验和修复
- 集成commitlint,自动检查commit message是否符合[conventional message 规范](https://www.conventionalcommits.org/en/v1.0.0-beta.2/)
- 提供yarn commit命令代替git commit,以交互方式帮助你写出conventional message 规范的commit message
- 提供yarn changelog, 在发布之前，自动打tag和生成changelog

## why
在javascript项目中，
* 使用ESlint可以帮助我们减少语法错误
* prettier可以让我们在合作开发中统一代码风格
* lint-staged配合git commit 钩子可以增量使用ESlint和prettier
* commitlint可以校验我们的提交内容
* 使用commitizen 可以在提交的时候以问答的交互方式帮助我们进行规范的提交，让commit message更易读和管理
* 有时候我们需要校验我们的typesript代码（typescript + eslint + prettier + lint-staged）

**推荐在每一个javascript项目中集成上述的工具。**

但是在一个新项目中要集成上述的特性，难免繁琐。

不仅需要在**命令行中手动打出大量安装包的名字**，还要**一个一个配置工具的rc，ignore文件**。
最关键的是因为这些工具的配置频率不是很频繁，我们不一定时刻记得我们应该安装什么，**ESlint和prettier一起使用应该怎么办(ESlint 和 prettier的部分rule有冲突)**，**commitlint的husky命令应该怎么写**。这时候我们又要在网上搜索一番，就会很浪费时间，即便我们前不久就已经这么做过了。
我们应该专注于代码上面，而不是将起始的热情精力花费在这些重复工作上。

所以这个工具提供了一些简单的命令让我们的项目轻松集成这些令人愉悦的功能。

## installation
```bash
yarn add wowow -g
# or
npm install wowow -g
```
## usage
```bash
# 在新项目上安装所有特性, 推荐
wowow

# 在已经有eslint的项目上安装prettier，这会自动为你解决eslint和prettier的规则冲突。
wowow prettier

# 在新项目上面安装commitlint
wowow commitlint

# 在新项目上面快速安装typescript-eslint
wowow typescript-eslint
```
## feature

### prettier
```bash
wowow prettier
```
在这个命令中，wowow做了以下的事情：
1. 安装prettier
2. 安装eslint-config-prettier, eslint-plugins-prettier, 更新eslintrc文件， 自动解决eslint和prettier一起使用的rules冲突。
3. 更新lint-staged脚本

### commitlint
```bash
wowow commitlint
```
在这个命令中，wowow做了以下的事情：
1. 安装必要的包
2. 安装pre-commit 钩子
3. 自动安装commitizen/cli 工具。

你可以在需要使用`git commit` 的地方用 `yarn commit`代替，将会调用commitizen/cli工具帮助你提交一份合乎conventional 规范的commit信息.

#### 关于yarn changelog命令
在这个命令中，工具自动为你做了以下的事情：
1. 使用[standard-version](https://github.com/conventional-changelog/standard-version) 根据你的和最新的tag之间的commit 信息自动升级项目的package.json的version
2. 使用conventional-changelog/cli 自动生成changelog
3. 自动提交一个类似于docs(changelog.md): update changelog" 的提交信息

**建议在发布之前用这个命令更新版本和生成changelog**


###  typescript-eslint
鉴于TSlint的开发者已经放弃对它的维护，转而投奔typescript-eslint的怀抱，所以typescript-eslint已经成为事实上的typescript code的lintter工具。

#### **typescript-eslint 和babel-eslint的区别**
babel-eslint在搭配typescript parser的情况下，可以完成对typecript 源码的lint，但是typescript-eslint 更强大，可以基于类型信息自定义校验规则。

#### 使用
```bash
wowow typescript-eslint
```
配置vscode setting.json
```json
{
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
}
```


