# scopes

> scopes, usually to define the scope of this commit, there are generally two types: according to the **project code distinction** such as monorepo , the other is **project business distinction**

## scopes for project code

If you need to manage multiple packages for a better experience, for example use: [pnpm](https://pnpm.io/) | [lerna.js](https://lerna.js.org/) to manage monorepo you can Use the `path` and `fs` modules to dynamically define the scopes (scopes) display in the commit message.

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

If you define a `scope-enum` using the [commitlint](https://github.com/conventional-changelog/commitlint) rule, it will be imported automatically.

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

![demo-gif](https://user-images.githubusercontent.com/40693636/172984678-b187607e-e67d-43b4-93e5-3d359f5044a9.gif)

## support for multiple scopes

- use <kbd>→</kbd> or <kbd>Space</kbd> to choice
- use <kbd>Enter</kbd> to submit

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

![demo-gif](https://user-images.githubusercontent.com/40693636/170836009-26331ad3-8e7f-4183-a4af-15372b6420d6.gif)

<br>
<br>

## scopes for business system

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

Of course, if you want to add **description information** to the module-wide customization to display on the command line, you can use `name` and `value` to define.

```js
// .commitlintrc.js
const fs = require('fs')
const path = require('path')
const packages = fs.readdirSync(path.resolve(__dirname, 'packages'))
module.exports = {
  prompt: {
    scopes: [
      { value: 'app', name: 'app:       System business' },
      { value: 'home', name: 'home:      Homepage' },
      { value: 'account', name: 'account:   Account related' },
      { value: 'comment', name: 'comment:   Comment related' },
    ]
  }
}
```

![demo-gif](https://user-images.githubusercontent.com/40693636/172988729-b76510d8-108b-4588-a748-86042da3d5ef.gif)

:::tip
If `cz-git` detects that `allowEmptyScopes` and `allowCustomScopes` have very strict rules (both set to false) and the **scopes selection list has only one item**, it will automatically skip question and output
:::

:::tip
The following code can get the `HOME` directory at runtime,<br>you can use it with `fs` and `path` **for default global custom configuration**.
```js
const USER_HOME = process.env.HOME || process.env.USERPROFILE
// console.log(USER_HOME) === echo "$HOME"
```

:::

<br>
<br>
<br>

> Using highly customizable `cz-git` makes committing more convenient and more customary. Welcome to share.
