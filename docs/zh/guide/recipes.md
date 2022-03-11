---
title: 小窍门
sidebarDepth: 2
lastUpdated: true
sitemap:
    priority: 0.8
    exclude: true
---
# 小窍门

## scopes

> scopes，通常来定义本次 commit 涉及范围，一般有两种：根据**项目代码层面区分**比如 monorepo ，另外一种就是**项目业务区分**

### 针对 项目代码 的 scopes

如果你需要管理多软件包在commit时获得更好的体验，比如使用: [pnpm](https://pnpm.io/) | [lerna.js](https://lerna.js.org/) 管理 monorepo 可以利用 `path` 和 `fs` 模块动态定义 commit message 中的scopes(范围)显示

```js
// .commitlintrc.js 
const fs = require('fs')
const path = require('path')
const packages = fs.readdirSync(path.resolve(__dirname, 'packages'))
module.exports = {
  prompt: { 
    scopes: [...packages] 
  }
}
```

当然如果你使用 [commitlint](https://github.com/conventional-changelog/commitlint) 规则定义了 `scope-enum`，会自动引入

```js
// .commitlintrc.js 
const fs = require('fs')
const path = require('path')
const packages = fs.readdirSync(path.resolve(__dirname, 'packages'))
module.exports = {
  rules: {
    "scope-enum": [2, "always", [ ...packages ]]
  }
};
```

![demo-gif](https://user-images.githubusercontent.com/40693636/156002738-af17087e-2d2b-4a80-a681-d63751282ec8.gif)

### 针对 项目业务 的 scopes

```js
// .commitlintrc.js 
const fs = require('fs')
const path = require('path')
const packages = fs.readdirSync(path.resolve(__dirname, 'packages'))
module.exports = {
  prompt: {
    scopes: ["app", "home", "account", "comment"] 
  }
}
```

当然如果你想给模块范围自定义添加 **描述信息** 显示在命令行中可以使用 `name` 和 `value`属性来定义

```js
// .commitlintrc.js 
const fs = require('fs')
const path = require('path')
const packages = fs.readdirSync(path.resolve(__dirname, 'packages'))
module.exports = {
  prompt: {
    scopes: [
      { value: "app",     name: "app:       系统业务" },
      { value: "home",    name: "home:      首页相关" },
      { value: "account", name: "account:   账户相关" },
      { value: "comment", name: "comment:   评论相关" },
    ]
  }
}
```

![demo-gif](https://user-images.githubusercontent.com/40693636/156924173-56508d8a-ba7a-4001-99fe-16234ee0f911.gif)

:::tip
下面代码可以运行时获取到 `HOME` 目录，<br>你可以使用它配合 `fs`和`path` 进行**默认的全局自定义配置**

```js
const USER_HOME = process.env.HOME || process.env.USERPROFILE;
// console.log(USER_HOME) === echo "$HOME"
```

:::

## issuePrefixs

国内用户如果使用 Gitee 作为项目管理，那么该工具可以很好 ==利用 commit message改变issue状态== <br>
详情： [Commit 关联Issue](https://gitee.com/help/articles/4141#article-header2) <br>
通过设置任务状态指令，即起issue状态变更的别名，通过选择别名和输入issue号，可以很好的关联管理issue

```js
module.exports = {
  prompt: {
    issuePrefixs: [
      // @see: https://gitee.com/help/articles/4141#article-header2
      { value: "wip", name: "wip:      将任务状态更改为进行中" },
      { value: "finish", name: "finish:   将任务状态更改为待完成" }
    ]
  }
}
```

![demo-gif](https://user-images.githubusercontent.com/40693636/156924322-7edaa527-cd16-4b69-9caf-7471d9984af8.gif)

## default

### defaultIssues

- 自动获取 `Issue Number`，重复查询填写`issue number` 是一件很麻烦的事情，尤其在 gitee 反人类设计
  - 但是如果规范了团队的分支命令规则(e.g: fix/33)
  - 然后我们利用 `Node` 的 `execSync` 通过命令获取到分支名
  - 再对获取的字符串进行处理
  - 接着我们利用 `defaultIssues`
  - 使用时我们只需要按下 ==\<Enter\>== 键就可以输出`Issue Number`,如此一来我们可以很方便截取到 `Issue Number` 减少重复性工作。

```js{5-8,14}
// .commitlintrc.js 
const { execSync } = require('child_process');

// @tip: git branch name = feature/33   =>    auto get defaultIssues = #33
 const issue = execSync('git rev-parse --abbrev-ref HEAD')
  .toString()
  .trim()
  .split("/")[1]
// @tip: monorepo dynamic get name

/** @type {import('cz-git').UserConfig} */
module.exports = {
  prompt: {
    defaultIssues: () => !issue ? "" : `#${issue}`
  }
};
```

![demo-gif](https://user-images.githubusercontent.com/40693636/156924691-10411379-b351-4632-a688-2df5e54a034c.gif)


> 格局打开，利用可高度可定制的 `cz-git` 让 commit 更方便，更契合习惯，欢迎分享。
