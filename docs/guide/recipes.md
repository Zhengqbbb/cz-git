---
title: Recipes
sidebarDepth: 1
lastUpdated: true
sitemap:
    priority: 0.8
    exclude: true
---
# Recipes

## scopes

> scopes, usually to define the scope of this commit, there are generally two types: according to the **project code distinction** such as monorepo , the other is **project business distinction**

### scopes for project code

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

![demo-gif](https://user-images.githubusercontent.com/40693636/156002738-af17087e-2d2b-4a80-a681-d63751282ec8.gif)

### scopes for business system

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

Of course, if you want to add **description information** to the module-wide customization to display on the command line, you can use `name` and `value` to define.

```js
// .commitlintrc.js 
const fs = require('fs')
const path = require('path')
const packages = fs.readdirSync(path.resolve(__dirname, 'packages'))
module.exports = {
  prompt: {
    scopes: [
      { value: "app",     name: "app:       System business" },
      { value: "home",    name: "home:      Homepage" },
      { value: "account", name: "account:   Account related" },
      { value: "comment", name: "comment:   Comment related" },
    ]
  }
}
```

![demo-gif](https://user-images.githubusercontent.com/40693636/156924173-56508d8a-ba7a-4001-99fe-16234ee0f911.gif)

## default

### defaultIssues

- Obtaining the `Issue Number` automatically, it is a very troublesome thing to repeat the query to fill in the `issue number`.
  - But if the team's branch command rules are standardized (e.g: fix/33)
  - Then we use `Node`'s `execSync` to get the branch name through the command
  - Then process the obtained string
  - Then we use `defaultIssues`
  - When using, we only need to press the ==\<Enter\>== key to output the `Issue Number`, so that we can easily intercept the `Issue Number` to reduce repetitive work.

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

> Expand your imagination, and the highly customizable `cz-git` makes committing more convenient and more customary. Welcome to share.
