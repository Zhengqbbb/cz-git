<p align="center">
    <a target="_blank" href="https://github.com/Zhengqbbb/cz-git">
        <img src="https://user-images.githubusercontent.com/40693636/154064210-964aeaa0-d9dc-4cea-9e52-2ffc3789611b.png" alt="cz-git-logo" width="400" data-width="400" data-height="400">
    </a>
</p>

<h1 align="center">cz-git</h1>

<p align="center">
    <a target="_blank" href="https://github.com/Zhengqbbb/cz-git">
      <img style="display:inline-block;margin:0.2em;" alt="Commitizen-Adapter" src="https://img.shields.io/badge/Commitizen-Adapter-red.svg?logo=git&style=flat">
    </a>
    <br/>
    <a target="_blank" href="http://commitizen.github.io/cz-cli/">
      <img style="display:inline-block;margin:0.2em;" alt="commitizen-friendly" src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?logo=github">
    </a>
    <a target="_blank" href="https://github.com/Zhengqbbb/cz-git">
      <img style="display:inline-block;margin:0.2em;" alt="GitHub Repo stars" src="https://img.shields.io/github/stars/zhengqbbb/cz-git?style=social">
    </a>
    <a target="_blank" href="https://github.com/Zhengqbbb/cz-git/actions/workflows/nodejs.yml">
      <img style="display:inline-block;margin:0.2em;" alt="test-ci" src="https://github.com/Zhengqbbb/cz-git/workflows/Node.js%20CI/badge.svg">
    </a>
    <br>
    <a href="https://www.npmjs.com/package/cz-git">
        <img style="display:inline-block;margin:0.2em;" alt="npm" src="https://img.shields.io/npm/v/cz-git?style=flat-square&logo=npm">
        <img style="display:inline-block;margin:0.2em;" alt="npm-download" src="https://img.shields.io/npm/dm/cz-git.svg?style=flat-square&logo=npm">
    </a>
    <br/>
</p>
<p align="center">
    <a href="https://github.com/Zhengqbbb/cz-git#readme">Github</a>
    &nbsp; | &nbsp;
    <a href="https://www.qbenben.com/docs/play/cz-git">简体中文文档</a>
</p>

<!-- TOC -->

- [Introduction](#introduction)
- [Feature](#feature)
- [Usage](#usage)
    - [As a dev dependency use in the project](#as-a-dev-dependency-use-in-the-project)
    - [As global use](#as-global-use)
- [Configure Template](#configure-template)
    - [Default template](#default-template)
    - [Emoji template](#emoji-template)
    - [JSON template](#json-template)
    - [TypeScript template](#typescript-template)
- [Options](#options)
    - [Show Related](#show-related)
    - [Engineering Standardization](#engineering-standardization)
- [FAQ](#faq)
    - [Windows users use](#windows-users-use)
    - [Cannot find command after global install](#cannot-find-command-after-global-install)
    - [Terminal cannot display Emoji symbols](#terminal-cannot-display-emoji-symbols)
    - [Why should the output Emoji symbols be placed in subject](#why-should-the-output-emoji-symbols-be-placed-in-subject)
- [LICENSE](#license)

<!-- /TOC -->

## Introduction

A more engineered, highly customizable, standard output format [commitizen](https://github.com/commitizen/cz-cli) adapter.

![demo-gif](https://user-images.githubusercontent.com/40693636/154906217-e0b1c5d0-9294-4072-8082-c0cdd9392023.gif)

> **What is commitizen**: A Node.js-based `git commit` command-line tool that assists in generating standardized and standardized commit messages. <br>
> **What is an adapter**: Replace the **interactive** plugin for the commitizen command line tool.

## Feature

- Just to be a **lazy man** !!! Friendly command line tool,  Supports **search and selection** on the command line, reducing spelling errors.
- **Highly Customizable**, but the output format follows the standard [Angular commit](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits) specification.
- [Better for monorepo engineering](#scopes) and **commitlint** project to give relevant verification information to the command line.
- Better linking with [issuePrefixs](#issuePrefixs) **for issue** | ✅ Support **emoji** in commit.

## Usage
### As a dev dependency use in the project
> [global installation](##as-global-use) `commitizen`, that you can quickly use the `cz` or `git cz` command to start.
```bash
npm install -g commitizen
```

Just three simple steps:
- **step 1:** Download dependencies
```bash
npm install -D cz-git
# or
yarn add -D cz-git
```

- **step 2:** Modify **package.json** to add `config` **Specify the adapter used, and add a startup command**.
   - After completing the configuration modification, you can try to use `npm commit` or `yarn commit` to test the startup.

```json
{
  "scripts": {
    "commit": "git cz"
  },
  "config": {
    "commitizen": {
      "path": "node_modules/cz-git"
    }
  }
}
```

- **step 3:** Add custom configuration (optional, use default)
   - There are **two** configuration methods

**Method 1: (recommended) cz-git is linked with [commitlint](https://github.com/conventional-changelog/commitlint) to provide verification information**, so it can be written in [commitlint](https://github.com/conventional-changelog/commitlint#config) configuration file. <br> E.g: ([⇒ Configuration Template](#configure-template))

```js
// .commitlintrc.js
/** @type {import('cz-git').UserConfig} */
module.exports = {
  rule: {
    ...
  },
  prompt: {
    useEmoji: true
    //option...
  }
}
```

**Method 2:** Add custom configuration under config.commitizen under **package.json**, **but** excessive configuration items will lead to bloated package.json, which is suitable for simple customization. E.g:

```json
{
  "scripts": {
    "commit": "git cz"
  },
  "config": {
    "commitizen": {
      "path": "node_modules/cz-git",
      "useEmoji": true
    }
  }
}
```

### As global use
> The advantage of global installation is that you can use `cz` or `git cz` command to start command line tools under any project to generate standardized commit messages

Just three simple steps:
- **step 1:** Download global dependencies
```bash
npm install -g cz-git commitizen
```

- **step 2:** Global configuration adapter type
```bash
echo '{ "path": "cz-git" }' > ~/.czrc
```

- **step 3:** Add custom configuration (optional, use default configuration)
     - There are two configuration methods
<br>

**Method 1:** Edit the `~/.czrc` file to add configuration in the form of **json**, for example:
```json
{
  "path": "cz-git",
  "useEmoji": true
}
```

**Method 2: Cooperate with [commitlint](https://github.com/conventional-changelog/commitlint)** to create a configuration file under the path of `$HOME` ([↓ Configuration Template](#configure-template))

## Configure Template

### Default template
<details open>
<summary> .commitlintrc.js complete default configuration template</summary>

```js
// .commitlintrc.js
/** @type {import('cz-git').UserConfig} */
module.exports = {
  rules: {
    // @see: https://commitlint.js.org/#/reference-rules
  },
  prompt: {
    messages: {
      type: "Select the type of change that you're committing:",
      scope: "Denote the SCOPE of this change (optional):",
      customScope: "Denote the SCOPE of this change:",
      subject: "Write a SHORT, IMPERATIVE tense description of the change:\n",
      body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
      breaking: 'List any BREAKING CHANGES (optional). Use "|" to break new line:\n',
      footerPrefixsSelect: "Select the ISSUES type of changeList by this change (optional):",
      customFooterPrefixs: "Input ISSUES Prefix:",
      footer: "List any ISSUES by this change. E.g.: #31, #34, #I972S:\n",
      confirmCommit: "Are you sure you want to proceed with the commit above ?"
    },
    types: [
      { value: "feat", name: "feat:     A new feature", emoji: ":sparkles:" },
      { value: "fix", name: "fix:      A bug fix", emoji: ":bug:" },
      { value: "docs", name: "docs:     Documentation only changes", emoji: ":memo:" },
      { value: "style", name: "style:    Changes that do not affect the meaning of the code", emoji: ":lipstick:" },
      { value: "refactor", name: "refactor: A code change that neither fixes a bug nor adds a feature", emoji: ":recycle:" },
      { value: "perf", name: "perf:     A code change that improves performance", emoji: ":zap:" },
      { value: "test", name: "test:     Adding missing tests or correcting existing tests", emoji: ":white_check_mark:" },
      { value: "build", name: "build:    Changes that affect the build system or external dependencies", emoji: ":building_construction:" },
      { value: "ci", name: "ci:       Changes to our CI configuration files and scripts", emoji: ":green_heart:" },
      { value: "chore", name: "chore:    Other changes that don't modify src or test files", emoji: ":hammer:" },
      { value: "revert", name: "revert:   Reverts a previous commit", emoji: ":rewind:" }
    ],
    useEmoji: false,
    scopes: [],
    allowCustomScopes: true,
    allowEmptyScopes: true,
    customScopesAlign: "bottom",
    customScopesAlias: "custom",
    emptyScopesAlias: "empty",
    allowBreakingChanges: ['feat', 'fix'],
    upperCaseSubject: false,
    breaklineChar: "|",
    skipQuestions: [],
    issuePrefixs: [{ value: "closed", name: "closed:   ISSUES has been processed" }],
    customIssuePrefixsAlign: "top",
    emptyIssuePrefixsAlias: "skip",
    customIssuePrefixsAlias: "custom",
    confirmColorize: true,
    maxHeaderLength: Infinity,
    maxSubjectLength: Infinity,
    minSubjectLength: 0,
    scopeOverrides: undefined,
    defaultBody: "",
    defaultIssues: "",
    defaultScope: "",
    defaultSubject: ""
  }
};
```

</details>

### Emoji template

<details>
<summary> .commitlintrc.js complete emoji template template</summary>

```js
// .commitlintrc.js
/** @type {import('cz-git').UserConfig} */
module.exports = {
  rules: {
    // @see: https://commitlint.js.org/#/reference-rules
  },
  prompt: {
    messages: {
      type: "Select the type of change that you're committing:",
      scope: "Denote the SCOPE of this change (optional):",
      customScope: "Denote the SCOPE of this change:",
      subject: "Write a SHORT, IMPERATIVE tense description of the change:\n",
      body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
      breaking: 'List any BREAKING CHANGES (optional). Use "|" to break new line:\n',
      footerPrefixsSelect: "Select the ISSUES type of changeList by this change (optional):",
      customFooterPrefixs: "Input ISSUES Prefix:",
      footer: "List any ISSUES by this change. E.g.: #31, #34, #I972S:\n",
      confirmCommit: "Are you sure you want to proceed with the commit above ?"
    },
    types: [
      { value: "feat", name: "feat:     ✨  A new feature", emoji: ":sparkles:" },
      { value: "fix", name: "fix:      🐛  A bug fix", emoji: ":bug:" },
      { value: "docs", name: "docs:     📝  Documentation only changes", emoji: ":memo:" },
      { value: "style", name: "style:    💄  Changes that do not affect the meaning of the code", emoji: ":lipstick:" },
      { value: "refactor", name: "refactor: ♻️   A code change that neither fixes a bug nor adds a feature", emoji: ":recycle:" },
      { value: "perf", name: "perf:     ⚡️  A code change that improves performance", emoji: ":zap:" },
      { value: "test", name: "test:     ✅  Adding missing tests or correcting existing tests", emoji: ":white_check_mark:" },
      { value: "build", name: "build:    🏗️   Changes that affect the build system or external dependencies", emoji: ":building_construction:" },
      { value: "ci", name: "ci:       💚  Changes to our CI configuration files and scripts", emoji: ":green_heart:" },
      { value: "chore", name: "chore:    🔨  Other changes that don't modify src or test files", emoji: ":hammer:" },
      { value: "revert", name: "revert:   ⏪️  Reverts a previous commit", emoji: ":rewind:" }
    ],
    useEmoji: true,
    scopes: [],
    allowCustomScopes: true,
    allowEmptyScopes: true,
    customScopesAlign: "bottom",
    customScopesAlias: "custom",
    emptyScopesAlias: "empty",
    allowBreakingChanges: ['feat', 'fix'],
    upperCaseSubject: false,
    breaklineChar: "|",
    skipQuestions: [],
    issuePrefixs: [{ value: "closed", name: "closed:   ISSUES has been processed" }],
    customIssuePrefixsAlign: "top",
    emptyIssuePrefixsAlias: "skip",
    customIssuePrefixsAlias: "custom",
    confirmColorize: true,
    maxHeaderLength: Infinity,
    maxSubjectLength: Infinity,
    minSubjectLength: 0,
    scopeOverrides: undefined,
    defaultBody: "",
    defaultIssues: "",
    defaultScope: "",
    defaultSubject: ""
  }
};
```

</details>

### JSON template
> tip： It is recommended to use JavaScript for configuration files in the project. You can combine `fs` and `path` to select [scopes](#scopes) for generating dynamic modules.

<details>
<summary> json default configuration template</summary>

```json
// .czrc | package.json | .commitlintrc(need "prompt" key)
{
  "messages": {
    "type": "Select the type of change that you're committing:",
    "scope": "Denote the SCOPE of this change (optional):",
    "customScope": "Denote the SCOPE of this change:",
    "subject": "Write a SHORT, IMPERATIVE tense description of the change:\n",
    "body": "Provide a LONGER description of the change (optional). Use \"|\" to break new line:\n",
    "breaking": "List any BREAKING CHANGES (optional). Use \"|\" to break new line:\n",
    "footerPrefixsSelect": "Select the ISSUES type of changeList by this change (optional):",
    "customFooterPrefixs": "Input ISSUES Prefix:",
    "footer": "List any ISSUES by this change. E.g.: #31, #34, #I972S:\n",
    "confirmCommit": "Are you sure you want to proceed with the commit above ?"
  },
  "types": [
    { "value": "feat", "name": "feat:     A new feature", "emoji": ":sparkles:" },
    { "value": "fix", "name": "fix:      A bug fix", "emoji": ":bug:" },
    { "value": "docs", "name": "docs:     Documentation only changes", "emoji": ":memo:" },
    { "value": "style", "name": "style:    Changes that do not affect the meaning of the code", "emoji": ":lipstick:" },
    { "value": "refactor", "name": "refactor: A code change that neither fixes a bug nor adds a feature", "emoji": ":recycle:" },
    { "value": "perf", "name": "perf:     A code change that improves performance", "emoji": ":zap:" },
    { "value": "test", "name": "test:     Adding missing tests or correcting existing tests", "emoji": ":white_check_mark:" },
    { "value": "build", "name": "build:    Changes that affect the build system or external dependencies", "emoji": ":building_construction:" },
    { "value": "ci", "name": "ci:       Changes to our CI configuration files and scripts", "emoji": ":green_heart:" },
    { "value": "chore", "name": "chore:    Other changes that don't modify src or test files", "emoji": ":hammer:" },
    { "value": "revert", "name": "revert:   Reverts a previous commit", "emoji": ":rewind:" }
  ],
  "useEmoji": false,
  "scopes": [],
  "allowCustomScopes": true,
  "allowEmptyScopes": true,
  "customScopesAlign": "bottom",
  "customScopesAlias": "custom",
  "emptyScopesAlias": "empty",
  "allowBreakingChanges": ["feat", "fix"],
  "upperCaseSubject": false,
  "breaklineChar": "|",
  "skipQuestions": [],
  "issuePrefixs": [{ "value": "closed", "name": "closed:   ISSUES has been processed" }],
  "customIssuePrefixsAlign": "top",
  "emptyIssuePrefixsAlias": "skip",
  "customIssuePrefixsAlias": "custom",
  "confirmColorize": true,
  "minSubjectLength": 0,
  "defaultBody": "",
  "defaultIssues": "",
  "defaultScope": "",
  "defaultSubject": ""
}
```

</details>


### TypeScript template
> warning： Defining configuration with TypeScript is deprecated as **this affects command line tool startup speed** <br>
And using the js configuration file to add the `@type` annotation can be a good way to provide code hints at configuration time

<details>
<summary> .commitlintrc.ts complete default configuration template</summary>

```ts
// .commitlintrc.ts
import type { UserConfig } from "cz-git"
const config: UserConfig = {
  rules: {
    // @see: https://commitlint.js.org/#/reference-rules
  },
  prompt: {
    messages: {
      type: "Select the type of change that you're committing:",
      scope: "Denote the SCOPE of this change (optional):",
      customScope: "Denote the SCOPE of this change:",
      subject: "Write a SHORT, IMPERATIVE tense description of the change:\n",
      body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
      breaking: 'List any BREAKING CHANGES (optional). Use "|" to break new line:\n',
      footerPrefixsSelect: "Select the ISSUES type of changeList by this change (optional):",
      customFooterPrefixs: "Input ISSUES Prefix:",
      footer: "List any ISSUES by this change. E.g.: #31, #34, #I972S:\n",
      confirmCommit: "Are you sure you want to proceed with the commit above ?"
    },
    types: [
      { value: "feat", name: "feat:     A new feature", emoji: ":sparkles:" },
      { value: "fix", name: "fix:      A bug fix", emoji: ":bug:" },
      { value: "docs", name: "docs:     Documentation only changes", emoji: ":memo:" },
      { value: "style", name: "style:    Changes that do not affect the meaning of the code", emoji: ":lipstick:" },
      { value: "refactor", name: "refactor: A code change that neither fixes a bug nor adds a feature", emoji: ":recycle:" },
      { value: "perf", name: "perf:     A code change that improves performance", emoji: ":zap:" },
      { value: "test", name: "test:     Adding missing tests or correcting existing tests", emoji: ":white_check_mark:" },
      { value: "build", name: "build:    Changes that affect the build system or external dependencies", emoji: ":building_construction:" },
      { value: "ci", name: "ci:       Changes to our CI configuration files and scripts", emoji: ":green_heart:" },
      { value: "chore", name: "chore:    Other changes that don't modify src or test files", emoji: ":hammer:" },
      { value: "revert", name: "revert:   Reverts a previous commit", emoji: ":rewind:" }
    ],
    useEmoji: false,
    scopes: [],
    allowCustomScopes: true,
    allowEmptyScopes: true,
    customScopesAlign: "bottom",
    customScopesAlias: "custom",
    emptyScopesAlias: "empty",
    allowBreakingChanges: ['feat', 'fix'],
    upperCaseSubject: false,
    breaklineChar: "|",
    skipQuestions: [],
    issuePrefixs: [{ value: "closed", name: "closed:   ISSUES has been processed" }],
    customIssuePrefixsAlign: "top",
    emptyIssuePrefixsAlias: "skip",
    customIssuePrefixsAlias: "custom",
    confirmColorize: true,
    maxHeaderLength: Infinity,
    maxSubjectLength: Infinity,
    minSubjectLength: 0,
    scopeOverrides: undefined,
    defaultBody: "",
    defaultIssues: "",
    defaultScope: "",
    defaultSubject: ""
  }
};

export default config
```

</details>

## Options
### Show Related

#### messages
- **description** : custom command line question information
- **example** : `messages: { type: "Select the type of change that you're committing:" }`

#### types
- **description** : custom selection **type** prompt
- **type** : `Array<{ name: string; value: string; emoji?: string }>`
- **example** : `types: [{value: 'feat', name: 'feat: A new feature', emoji: ':sparkles:'}]`
> tip： If you want to use Emoji, you need **enable** `userEmoji` configuration item. <br>
And need to add Emoji Code, you can find the corresponding characters in: [https://gitmoji.dev/](https://gitmoji.dev/) to supplement `emoji`.
#### customScopesAlign
- **description** : Set the **location** of empty option (empty) and custom option (custom) in **selection range**
- **type** : `"top" | "bottom" | "top-bottom" | "bottom-top"`
- **default** : `"bottom"`

#### customScopesAlias
- **description** : Customize the **name** displayed on the command line for the custom option (custom) in the **selection range**
- **type** : `string`
- **default** : `custom`

#### emptyScopesAlias
- **description** : Customize the **name** displayed on the command line if the empty option (empty) in the **selection range**
- **type** : `string`
- **default** : `empty`

#### customIssuePrefixsAlign
- **Description** : Set the **location** of skip option (skip) and custom option (custom) in **select issue prefix**
- **type** : `"top" | "bottom" | "top-bottom" | "bottom-top"`
- **default** : `"top"`

#### customIssuePrefixsAlias
- **description** : custom **select the issue prefix** in the custom option (custom) to display the **name** on the command line
- **type** : `string`
- **default** : `custom`

#### emptyIssuePrefixsAlias
- **description** : Customize the **name** displayed on the command line in the skip option (skip) in the **select issue prefix**
- **type** : `string`
- **default** : `skip`

#### confirmColorize
- **description** : Determines whether the template commit message is colored in the commit
- **type** : `boolean`
- **default** : `true`

#### defaultScope
- **description** : Whether to use display default value in custom scope
- **type** : `string`
- **default** : `""`
- **use** : when you want the default value to appear on the command line just press the "Enter" key
#### defaultSubject
- **description** : Whether to use the display default value in the short **description**
- **type** : `string`
- **default** : `""`
- **use** : when you want the default value to appear on the command line just press the "Enter" key

#### defaultBody
- **description** : Whether to use the display default value in the detailed **description**
- **type** : `string`
- **default** : `""`
- **use** : when you want the default value to appear on the command line just press the "Enter" key


#### defaultIssues
- **Description** : Whether to use the display default value in the custom issue prefix
- **type** : `string`
- **default** : `""`
- **use** : when you want the default value to appear on the command line just press the "Enter" key

> tip: JavaScript logic can be written to utilize callbacks to return default values for relevant inputs<br>e.g : `defaultSubject: ()=> {return ...}`

### Engineering Standardization

#### scopes
- **description** : custom selection **module scope** command line display information
- **type** : `string[] | Array<{ name: string, value?: string }>`
- **default** : `[]`

> tip: If you define a `scope-enum` using the [commitlint](https://github.com/conventional-changelog/commitlint) rule, it will be imported automatically.       
If you need to manage multiple packages for a better experience, for example use: [pnpm](https://pnpm.io/) | [lerna.js](https://lerna.js.org/) to manage monorepo you can Use the `path` and `fs` modules to dynamically define the scopes (scopes) display in the commit message

````js
// .commitlintrc.js
const fs = require('fs')
const path = require('path')
const packages = fs.readdirSync(path.resolve(__dirname, 'packages'))
module.exports = {
   prompt: { scopes: [...packages] }
}
````
> Of course, if you want to add **description information** to the module-wide customization to display on the command line, you can use name and value to define.<br>e.g: `scopes: [{value: "theme", name: "theme : page theme"}]`

#### scopeOverrides
- **description** : After customizing a specific **type**, **override module scope** command line display information
- **type** : `{ [type: string]: string[] | Array<{ name: string, value?: string }> } | undefined`
- **default** : `undefined`
- **example** : `scopeOverrides: { "test": ['e2eTest, 'unitTest'] }`
- **use** : Displays custom module scope selection when selecting module scope after selecting ==specific== commit **type** : `type`

> tip : If you define `scopeOverrides` then define generic `scopes`

#### allowCustomScopes
- **description** : whether to display custom options when **module scope** is selected (custom)
- **type** : `boolean`
- **default** : `true`
- **use** : not using `commitlint` and want to turn off custom options in select.

> tip: It will automatically detect whether the definition of the [commitlint](https://github.com/conventional-changelog/commitlint) rule `scope-enum` is strict, and it will not be displayed automatically.

#### allowEmptyScopes
- **description** : whether to select **module scope** to display an empty option (empty)
- **type** : `boolean`
- **default** : `true`

#### allowBreakingChanges
- **description** : a specific **type** that allows BREAKING CHANGES
- **type** : `string[]`
- **default** : `['feat', 'fix']`

#### upperCaseSubject
- **description** : Whether to automatically capitalize the first character of the short description (subject)
- **type** : `boolean`
- **default** : `false`

#### breaklineChar
- **description** : newline characters in detailed descriptions (body) and breaking changes (BREAKING CHANGES)
- **type** : `string`
- **default** : `"|"`

#### skipQuestions
- **description** : The question specified by the custom selection is not displayed
- **type** : `Array<"scope" | "body" | "breaking" | "footerPrefix" | "footer">`
- **default** : `[]`

#### issuePrefixs
- **description** : custom select issue prefix
- **type** : `Array<{ value: string, name: string }>`
- **default** : `[{ value: "closed", name: "closed: ISSUES has been processed" }]`

#### maxHeaderLength
- **description**: Define the length of the header in the commit message, giving the verification information on the command line
- **type**: `number`
- **default**: `Infinity`
- **use** : when commitlint is not used and normalization is to be used
> tip: If you use commitlint, it will automatically read `header-max-length` and set it to give a prompt on the command line


#### maxSubjectLength
- **description**: Define the length of the subject in the commit message, giving the verification information on the command line
- **type**: `number`
- **default**: `Infinity`
- **use** : When commitlint is not used and normalization is to be used

> tip: If using commitlint will automatically read `subject-max-length` and set it to give a prompt on the command line.

#### minSubjectLength
- **description**: Define the length of the subject in the commit message, giving the verification information on the command line
- **type**: `number`
- **default** : `0`
- **use** : When commitlint is not used and normalization is to be used

>tip:  If commitlint is used, it will automatically read `subject-min-length` and set it to give a prompt on the command line

## FAQ

### Windows users use
- Windows users are advised not to use powershell, cmd for command line use
- because they are not based on the POSIX SHELL specification, i.e. not a standard terminal environment
- It is recommended not to use gitbash, because the terminal is not an interactive terminal, and the selection up and down will be effected
- **It is recommended to use Windows Terminal combined with WSL, you should also do the same in daily development and use**

### Cannot find command after global install
- Enter the command `npm prefix -g` to check whether the path of npm global download is in the root directory
- The high probability is because the global download path prefix of npm has been changed with nvm
- You can open .zshrc or .bashrc to comment out the loading nvm, and then reopen the terminal to check

### Terminal cannot display Emoji symbols
- The terminal cannot Emoji symbols, the high probability is because your terminal has poor support for emoji/unicode characters, but it does not affect the submission
   Because the final output is submitted by Emoji Code, you can consider changing the terminal and [font](https://github.com/ryanoasis/nerd-fonts)

### Why should the output Emoji symbols be placed in subject
- I also know it will break the aesthetics of the final output format, but the emoji are in subject because of following [Angular commit](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits) Specifications cannot be placed in type

## LICENSE

MIT
Copyright (c) 2022-present Qiubin Zheng <zhengqbbb@gmail.com> (https://github.com/Zhengqbbb)

> I just do my best to make thing well, Could you give a [star ⭐](https://github.com/Zhengqbbb/cz-git) to encourage me ?
