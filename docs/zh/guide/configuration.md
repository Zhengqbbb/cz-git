---
title: 配置模板
sidebarDepth: 1
lastUpdated: true
sitemap:
    priority: 0.6
---

# 配置模板
## 默认模板

- `.commitlintrc.js`
- `.commitlintrc.cjs`
- `commitlint.config.js`
- `commitlint.config.cjs`

::: details 点击展开 .commitlintrc.js 完整 默认 配置模板

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
      customFooterPrefixs: "Input ISSUES prefix:",
      footer: "List any ISSUES by this change. E.g.: #31, #34:\n",
      confirmCommit: "Are you sure you want to proceed with the commit above?"
    },
    types: [
      { value: "feat", name: "feat:     A new feature", emoji: ":sparkles:" },
      { value: "fix", name: "fix:      A bug fix", emoji: ":bug:" },
      { value: "docs", name: "docs:     Documentation only changes", emoji: ":memo:" },
      { value: "style", name: "style:    Changes that do not affect the meaning of the code", emoji: ":lipstick:" },
      { value: "refactor", name: "refactor: A code change that neither fixes a bug nor adds a feature", emoji: ":recycle:" },
      { value: "perf", name: "perf:     A code change that improves performance", emoji: ":zap:" },
      { value: "test", name: "test:     Adding missing tests or correcting existing tests", emoji: ":white_check_mark:" },
      { value: "build", name: "build:    Changes that affect the build system or external dependencies", emoji: ":package:" },
      { value: "ci", name: "ci:       Changes to our CI configuration files and scripts", emoji: ":ferris_wheel:" },
      { value: "chore", name: "chore:    Other changes that don't modify src or test files", emoji: ":hammer:" },
      { value: "revert", name: "revert:   Reverts a previous commit", emoji: ":rewind:" }
    ],
    useEmoji: false,
    themeColorCode: "",
    scopes: [],
    allowCustomScopes: true,
    allowEmptyScopes: true,
    customScopesAlign: "bottom",
    customScopesAlias: "custom",
    emptyScopesAlias: "empty",
    upperCaseSubject: false,
    allowBreakingChanges: ['feat', 'fix'],
    breaklineNumber: 100,
    breaklineChar: "|",
    skipQuestions: [],
    issuePrefixs: [{ value: "closed", name: "closed:   ISSUES has been processed" }],
    customIssuePrefixsAlign: "top",
    emptyIssuePrefixsAlias: "skip",
    customIssuePrefixsAlias: "custom",
    allowCustomIssuePrefixs: true,
    allowEmptyIssuePrefixs: true,
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

:::

## 中英文对照模板

::: details 点击展开 .commitlintrc.js 完整 中英文 配置模板

```js
// .commitlintrc.js
/** @type {import('cz-git').UserConfig} */
module.exports = {
  rules: {
    // @see: https://commitlint.js.org/#/reference-rules
  },
  prompt: {
    messages: {
      type: "选择你要提交的类型 :",
      scope: "选择一个提交范围（可选）:",
      customScope: "请输入自定义的提交范围 :",
      subject: "填写简短精炼的变更描述 :\n",
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
      footerPrefixsSelect: "选择关联issue前缀（可选）:",
      customFooterPrefixs: "输入自定义issue前缀 :",
      footer: "列举关联issue (可选) 例如: #31, #I3244 :\n",
      confirmCommit: "是否提交或修改commit ?"
    },
    types: [
      {value: 'feat',     name: 'feat:     新增功能 | A new feature'},
      {value: 'fix',      name: 'fix:      修复缺陷 | A bug fix'},
      {value: 'docs',     name: 'docs:     文档更新 | Documentation only changes'},
      {value: 'style',    name: 'style:    代码格式 | Changes that do not affect the meaning of the code'},
      {value: 'refactor', name: 'refactor: 代码重构 | A code change that neither fixes a bug nor adds a feature'},
      {value: 'perf',     name: 'perf:     性能提升 | A code change that improves performance'},
      {value: 'test',     name: 'test:     测试相关 | Adding missing tests or correcting existing tests'},
      {value: 'build',    name: 'build:    构建相关 | Changes that affect the build system or external dependencies'},
      {value: 'ci',       name: 'ci:       持续集成 | Changes to our CI configuration files and scripts'},
      {value: 'revert',   name: 'revert:   回退代码 | Revert to a commit'},
      {value: 'chore',    name: 'chore:    其他修改 | Other changes that do not modify src or test files'},
    ],
    useEmoji: false,
    themeColorCode: "",
    scopes: [],
    allowCustomScopes: true,
    allowEmptyScopes: true,
    customScopesAlign: "bottom",
    customScopesAlias: "custom",
    emptyScopesAlias: "empty",
    upperCaseSubject: false,
    allowBreakingChanges: ['feat', 'fix'],
    breaklineNumber: 100,
    breaklineChar: "|",
    skipQuestions: [],
    issuePrefixs: [
      // 如果使用 gitee 作为开发管理
      { value: "link", name: "link:     链接 ISSUES 进行中"},
      { value: "closed", name: "closed:   标记 ISSUES 已完成" }
      ],
    customIssuePrefixsAlign: "top",
    emptyIssuePrefixsAlias: "skip",
    customIssuePrefixsAlias: "custom",
    allowCustomIssuePrefixs: true,
    allowEmptyIssuePrefixs: true,
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

:::

## 纯汉化模板

::: warning
不推荐使用纯中文进行commit，因为终端对于中文输入的支持并不是很友好，并且在使用搜索时没有英文交互来得自然。<br>
推荐使用中英文对照，可以很好给予团队的新人帮助。
:::

::: details 点击展开 .commitlintrc.js 完整 纯汉化 配置模板

```js
// .commitlintrc.js
/** @type {import('cz-git').UserConfig} */
module.exports = {
  rules: {
    // @see: https://commitlint.js.org/#/reference-rules
  },
  prompt: {
    messages: {
      type: "选择你要提交的类型 :",
      scope: "选择一个提交范围（可选）:",
      customScope: "请输入自定义的提交范围 :",
      subject: "填写简短精炼的变更描述 :\n",
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
      footerPrefixsSelect: "选择关联issue前缀（可选）:",
      customFooterPrefixs: "输入自定义issue前缀 :",
      footer: "列举关联issue (可选) 例如: #31, #I3244 :\n",
      confirmCommit: "是否提交或修改commit ?"
    },
    types: [
      {value: '特性', name: '特性:     新增功能'},
      {value: '修复', name: '修复:     修复缺陷'},
      {value: '文档', name: '文档:     文档变更'},
      {value: '格式', name: '格式:     代码格式（不影响功能，例如空格、分号等格式修正）'},
      {value: '重构', name: '重构:     代码重构（不包括 bug 修复、功能新增）'},
      {value: '性能', name: '性能:     性能优化'},
      {value: '测试', name: '测试:     添加疏漏测试或已有测试改动'},
      {value: '构建', name: '构建:     构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）'},
      {value: '集成', name: '集成:     修改 CI 配置、脚本'},
      {value: '回退', name: '回退:     回滚 commit'},
      {value: '其他', name: '其他:     对构建过程或辅助工具和库的更改（不影响源文件、测试用例）'},
    ],
    useEmoji: false,
    themeColorCode: "",
    scopes: [],
    allowCustomScopes: true,
    allowEmptyScopes: true,
    customScopesAlign: "bottom",
    customScopesAlias: "以上都不是？我要自定义",
    emptyScopesAlias: "跳过",
    upperCaseSubject: false,
    allowBreakingChanges: ['feat', 'fix'],
    breaklineNumber: 100,
    breaklineChar: "|",
    skipQuestions: [],
    issuePrefixs: [
      // 如果使用 gitee 作为开发管理
      { value: "link", name: "link:     链接 ISSUES 进行中"},
      { value: "closed", name: "closed:   标记 ISSUES 已完成" }
      ],
    customIssuePrefixsAlign: "top",
    emptyIssuePrefixsAlias: "跳过",
    customIssuePrefixsAlias: "自定义前缀",
    allowCustomIssuePrefixs: true,
    allowEmptyIssuePrefixs: true,
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

:::

## Emoji模板

::: details 点击展开 .commitlintrc.js 完整 emoji 配置模板

```js{21-31,33}
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
      customFooterPrefixs: "Input ISSUES prefix:",
      footer: "List any ISSUES by this change. E.g.: #31, #34:\n",
      confirmCommit: "Are you sure you want to proceed with the commit above?"
    },
    types: [
      { value: "feat", name: "feat:     ✨  A new feature", emoji: ":sparkles:" },
      { value: "fix", name: "fix:      🐛  A bug fix", emoji: ":bug:" },
      { value: "docs", name: "docs:     📝  Documentation only changes", emoji: ":memo:" },
      { value: "style", name: "style:    💄  Changes that do not affect the meaning of the code", emoji: ":lipstick:" },
      { value: "refactor", name: "refactor: ♻️   A code change that neither fixes a bug nor adds a feature", emoji: ":recycle:" },
      { value: "perf", name: "perf:     ⚡️  A code change that improves performance", emoji: ":zap:" },
      { value: "test", name: "test:     ✅  Adding missing tests or correcting existing tests", emoji: ":white_check_mark:" },
      { value: "build", name: "build:    📦️   Changes that affect the build system or external dependencies", emoji: ":package:" },
      { value: "ci", name: "ci:       🎡  Changes to our CI configuration files and scripts", emoji: ":ferris_wheel:" },
      { value: "chore", name: "chore:    🔨  Other changes that don't modify src or test files", emoji: ":hammer:" },
      { value: "revert", name: "revert:   ⏪️  Reverts a previous commit", emoji: ":rewind:" }
    ],
    useEmoji: true,
    themeColorCode: "",
    scopes: [],
    allowCustomScopes: true,
    allowEmptyScopes: true,
    customScopesAlign: "bottom",
    customScopesAlias: "custom",
    emptyScopesAlias: "empty",
    upperCaseSubject: false,
    allowBreakingChanges: ['feat', 'fix'],
    breaklineNumber: 100,
    breaklineChar: "|",
    skipQuestions: [],
    issuePrefixs: [{ value: "closed", name: "closed:   ISSUES has been processed" }],
    customIssuePrefixsAlign: "top",
    emptyIssuePrefixsAlias: "skip",
    customIssuePrefixsAlias: "custom",
    allowCustomIssuePrefixs: true,
    allowEmptyIssuePrefixs: true,
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

:::

## JSON模板

- `.czrc`
- `.commitlintrc`
- `.commitlintrc.json`
- 在 `package.json`中添加 `config.commitizen` 字段
- 在 `package.json`中添加 `commitlint` 字段

::: tip
推荐在项目中使用JavaScript进行配置文件，你可以结合`fs`和`path` 为生成动态模块选择[范围](/zh/guide/recipes.html#scopes)
:::

::: details 点击展开 json 配置模板

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
    "customFooterPrefixs": "Input ISSUES prefix:",
    "footer": "List any ISSUES by this change. E.g.: #31, #34:\n",
    "confirmCommit": "Are you sure you want to proceed with the commit above?"
  },
  "types": [
    { "value": "feat", "name": "feat:     A new feature", "emoji": ":sparkles:" },
    { "value": "fix", "name": "fix:      A bug fix", "emoji": ":bug:" },
    { "value": "docs", "name": "docs:     Documentation only changes", "emoji": ":memo:" },
    { "value": "style", "name": "style:    Changes that do not affect the meaning of the code", "emoji": ":lipstick:" },
    { "value": "refactor", "name": "refactor: A code change that neither fixes a bug nor adds a feature", "emoji": ":recycle:" },
    { "value": "perf", "name": "perf:     A code change that improves performance", "emoji": ":zap:" },
    { "value": "test", "name": "test:     Adding missing tests or correcting existing tests", "emoji": ":white_check_mark:" },
    { "value": "build", "name": "build:    Changes that affect the build system or external dependencies", "emoji": ":package:" },
    { "value": "ci", "name": "ci:       Changes to our CI configuration files and scripts", "emoji": ":ferris_wheel:" },
    { "value": "chore", "name": "chore:    Other changes that don't modify src or test files", "emoji": ":hammer:" },
    { "value": "revert", "name": "revert:   Reverts a previous commit", "emoji": ":rewind:" }
  ],
  "useEmoji": false,
  "themeColorCode": "",
  "scopes": [],
  "allowCustomScopes": true,
  "allowEmptyScopes": true,
  "customScopesAlign": "bottom",
  "customScopesAlias": "custom",
  "emptyScopesAlias": "empty",
  "upperCaseSubject": false,
  "allowBreakingChanges": ["feat", "fix"],
  "breaklineNumber": 100,
  "breaklineChar": "|",
  "skipQuestions": [],
  "issuePrefixs": [{ "value": "closed", "name": "closed:   ISSUES has been processed" }],
  "customIssuePrefixsAlign": "top",
  "emptyIssuePrefixsAlias": "skip",
  "customIssuePrefixsAlias": "custom",
  "allowCustomIssuePrefixs": true,
  "allowEmptyIssuePrefixs": true,
  "confirmColorize": true,
  "minSubjectLength": 0,
  "defaultBody": "",
  "defaultIssues": "",
  "defaultScope": "",
  "defaultSubject": ""
}
```
:::

## TypeScript模板

:::danger
从 v1.3.0 开始，将不再支持 TypeScript 配置文件。例如（commitlint.config.ts）

- 使用 TypeScript 配置文件会**影响命令行工具的启动速度**
- 增加软件包的依赖项体积
:::

:::tip
使用 js 配置文件添加`@type` 注释可以很好提供在配置时的代码提示.
:::
