---
title: Recipes
sidebarDepth: 2
lastUpdated: true
sitemap:
    priority: 0.8
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

If you define a `scope-enum` using the [commitlint](https://github.com/conventional-changelog/commitlint) rule, it will be imported automatically.

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

:::tip
If `cz-git` detects that `allowEmptyScopes` and `allowCustomScopes` have very strict rules (both set to false) and the **scopes selection list has only one item**, it will automatically skip question and output
:::

:::tip
The following code can get the `HOME` directory at runtime,<br>you can use it with `fs` and `path` **for default global custom configuration**.
```js
const USER_HOME = process.env.HOME || process.env.USERPROFILE;
// console.log(USER_HOME) === echo "$HOME"
```

:::

## default

### defaultIssues

- Obtaining the `Issue Number` automatically, it is a very troublesome thing to repeat the query to fill in the `issue number`.
  - But if the team's branch command rules are standardized (e.g: feature/issue_33)
  - Then we use `Node`'s `execSync` to get the branch name through the command
  - Then process the obtained string
  - Then we use `defaultIssues`
  - When using, we only need to press the ==\<Enter\>== key to output the `Issue Number`, so that we can easily intercept the `Issue Number` to reduce repetitive work.

- <Badge type="tip" text="Tip" vertical="middle" /> Of course, we can also combine the `customIssuePrefixsAlign` configuration item to dynamically change the position of the issue prefix option.

```js{5-8,13-14}
// .commitlintrc.js 
const { execSync } = require('child_process');

// @tip: git branch name = feature/issue_33   =>    auto get defaultIssues = #33
 const issue = execSync('git rev-parse --abbrev-ref HEAD')
  .toString()
  .trim()
  .split("_")[1]

/** @type {import('cz-git').UserConfig} */
module.exports = {
  prompt: {
    customIssuePrefixsAlign: !issue ? "top" : "bottom",
    defaultIssues: !issue ? "" : `#${issue}`
  }
};
```

![demo-gif](https://user-images.githubusercontent.com/40693636/162552804-132aab02-4b02-4006-9e41-aeae4f825948.gif)

::: tip
If `cz-git` detects that `allowCustomIssuePrefixs` and `allowEmptyIssuePrefixs` have very strict rules (both set to false) and the **issuePrefixs selection list has only one item**, it will automatically skip question and output
:::

> Expand your imagination, and the highly customizable `cz-git` makes committing more convenient and more customary. Welcome to share.
