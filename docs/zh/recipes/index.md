# scopes

> scopes，通常来定义本次 commit 涉及范围，一般有两种：根据**项目代码层面区分**比如 monorepo ，另外一种就是**项目业务区分**

## 针对 项目代码 的 scopes

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
    'scope-enum': [2, 'always', [...packages]]
  }
}
```

![demo-gif](https://user-images.githubusercontent.com/40693636/172984678-b187607e-e67d-43b4-93e5-3d359f5044a9.gif) <!-- size=688x248 -->

## 支持多选 scopes

- 使用 <kbd>→</kbd> 或 <kbd>空格</kbd> 选中
- 使用 <kbd>回车</kbd> 确定

```js{8,9}
// .commitlintrc.js 
const fs = require('fs')
const path = require('path')
const packages = fs.readdirSync(path.resolve(__dirname, 'packages'))
module.exports = {
  prompt: { 
    scopes: [...packages],
    enableMultipleScopes: true,
    scopeEnumSeparator: "," 
  }
}
```

![demo-gif](https://user-images.githubusercontent.com/40693636/170836009-26331ad3-8e7f-4183-a4af-15372b6420d6.gif) <!-- size=688x263 -->

<br>
<br>

## 针对 项目业务 的 scopes

```js
// .commitlintrc.js
const fs = require('fs')
const path = require('path')
const packages = fs.readdirSync(path.resolve(__dirname, 'packages'))
module.exports = {
  prompt: {
    scopes: ['app', 'home', 'account', 'comment']
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
      { value: 'app', name: 'app:       系统业务' },
      { value: 'home', name: 'home:      首页相关' },
      { value: 'account', name: 'account:   账户相关' },
      { value: 'comment', name: 'comment:   评论相关' },
    ]
  }
}
```

![demo-gif](https://user-images.githubusercontent.com/40693636/172988729-b76510d8-108b-4588-a748-86042da3d5ef.gif) <!-- size=688x265 -->

::: tip
如果 `cz-git` 检测到如果 `allowEmptyScopes` 和 `allowCustomScopes` 具有非常严格规则(都设置为false)并且 **scopes 选择列表仅有一项时**，会自动跳过问题并输出
:::

:::tip
下面代码可以运行时获取到 `HOME` 目录，<br>你可以使用它配合 `fs`和`path` 进行**默认的全局自定义配置**

```js
const USER_HOME = process.env.HOME || process.env.USERPROFILE
// console.log(USER_HOME) === echo "$HOME"
```

:::


<br>
<br>
<br>

> 利用可高度可定制的 `cz-git` 让 commit 更方便，更契合习惯，欢迎分享。
