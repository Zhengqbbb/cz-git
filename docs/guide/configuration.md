---
title: Configure Template
sidebarDepth: 2
lastUpdated: true
---

# Configure Template

## Default template

::: details Click to expand .commitlintrc.js complete default configuration template
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

## Emoji template

::: details Click to expand .commitlintrc.js complete emoji template template

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

## JSON template

::: tip
It is recommended to use JavaScript for configuration files in the project. You can combine `fs` and `path` to select [scopes](/guide/recipes.html#scopes) for generating dynamic modules.
:::

::: details Click to expand JSON default configuration template

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

## TypeScript template

:::warning
Defining configuration with TypeScript is deprecated as **this affects command line tool startup speed**<br>And using the js configuration file to add the `@type` annotation can be a good way to provide code hints at configuration time
:::

::: details Click to expand .commitlintrc.ts complete default configuration template

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

export default config
```

:::
