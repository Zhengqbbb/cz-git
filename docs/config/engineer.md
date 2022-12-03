---
title: Engineering Related
sidebarDepth: 1
lastUpdated: true
sitemap:
    priority: 0.6
---
# Options - Engineering Related

## alias

- **description** : define commonly used commit message alias
- **type** : `{ [alias: string]: string }`
- **default** : `{ fd: "docs: fix typos" }`

::: tip
More usage and demo [⇒ can see the recipes](/recipes/alias.html)
:::

## scopes

- **description** : custom selection **module scope** command line display information
- **type** : `string[] | Array<{ name: string, value?: string }>`
- **default** : `[]`

::: tip
If you define a `scope-enum` using the [commitlint](https://github.com/conventional-changelog/commitlint) rule, it will be imported automatically.<br>
[⇒ can see the recipes](/recipes/#scopes)
:::

## scopeOverrides

- **description** : After customizing a specific **type**, **override module scope** command line display information
- **type** : <br>`{ [type: string]: string[] | Array<{ name: string, value?: string }> } | undefined`
- **default** : `undefined`
- **example** : `scopeOverrides: { "test": ["e2eTest", "unitTest"] }`
- **use** : Displays custom module scope selection when selecting module scope after selecting ==specific== commit **type** : `type`

:::tip
If you define `scopeOverrides` then define generic `scopes`
:::

## scopeFilters

- **description** : Filter select of prompt to select module scopes by the scope.value
- **type** : `string[]`
- **default** : `[".DS_Store"]`

## enableMultipleScopes

- **description** : Whether to enable the use of **multiple scopes mode**
- **type** : `boolean`
- **default** : `false`

:::tip
Try running command to **enable multiple scopes mode in the current session**
- Commitizen CLI: `checkbox=1 cz`
- czg CLI: `czg checkbox`
Demo And Usage [⇒ see the recipes](/recipes/#support-for-multiple-scopes)
:::

## scopeEnumSeparator

- **description** : Separator between **scopes** in multiple scopes mode
- **type** : `string`
- **default** : `,`

## allowCustomScopes

- **description** : whether to display custom options when selecting **module scope** (custom)
- **type** : `boolean`
- **default** : `true`
- **use** : not using `commitlint` and want to turn off custom options in select.

:::tip
It will automatically detect whether the definition of the [commitlint](https://github.com/conventional-changelog/commitlint) rule `scope-enum` is strict, and it will not be displayed automatically.
:::

## allowEmptyScopes

- **description** : whether to display an empty option when selecting **module scope** (empty)
- **type** : `boolean`
- **default** : `true`

:::tip
It will automatically detect whether the definition of the [commitlint](https://github.com/conventional-changelog/commitlint) rule `scope-empty` is strict, and it will not be displayed automatically.
:::

## markBreakingChangeMode

- **description** : Add an extra BREAKINGCHANGE question asking if you need to add the =="!"== mark in the header
- **use** : When you want to add the ! mark in the header, Highlight that the commit message belongs to BREAKINGCHANGE. you can use this option.
- **type** : `boolean`
- **default** : `false`

:::tip
more usage and demo [⇒ see the recipes](/recipes/breakingchange.html)
:::

## allowBreakingChanges

- **description** : a specific **type** that allows BREAKING CHANGES
- **type** : `string[]`
- **default** : `["feat", "fix"]`

## upperCaseSubject

- **description** : Whether to automatically capitalize the first character of the short description (subject)
- **type** : `boolean`
- **default** : `false`

## breaklineNumber

- **description** : body and BREAKING CHANGES the line wraps automatically according to the character exceeding this value
- **type** : `number`
- **default** : `100`
- **use** : When commitlint is not used and normalization is to be used

:::tip
Line breaks mainly based on **word completeness** <br>
If commitlint is used, it will automatically read `body-max-line-length` and set it.
:::

## breaklineChar

- **description** : newline characters in detailed descriptions (body) and breaking changes (BREAKING CHANGES)
- **type** : `string`
- **default** : `"|"`


## skipQuestions

- **description** : The question specified by the custom selection is not displayed
- **type** : `Array<"scope" | "body" | "breaking" | "footerPrefix" | "footer">`
- **default** : `[]`

## issuePrefixes

- **description** : custom select issue prefix
- **type** : `Array<{ value: string, name: string }>`
- **default** : `[{ value: "closed", name: "closed: ISSUES has been processed" }]`

## allowCustomIssuePrefix

- **description** : whether to display custom options when selecting ISSUES prefixs (custom)
- **type** : `boolean`
- **default** : `true`

## allowEmptyIssuePrefix

- **description** : whether to display an empty option when selecting ISSUES prefixs (skip)
- **type** : `boolean`
- **default** : `true`

## maxHeaderLength

- **description**: Define the length of the header in the commit message, giving the verification information on the command line
- **type**: `number`
- **default**: `Infinity`
- **use** : when commitlint is not used and normalization is to be used

:::tip
If you use commitlint, it will automatically read `header-max-length` and set it to give a prompt on the command line
:::

## maxSubjectLength

- **description**: Define the length of the subject in the commit message, giving the verification information on the command line
- **type**: `number`
- **default**: `Infinity`
- **use** : When commitlint is not used and normalization is to be used

:::tip
If using commitlint will automatically read `subject-max-length` and set it to give a prompt on the command line.
:::

## minSubjectLength

- **description**: Define the length of the subject in the commit message, giving the verification information on the command line
- **type**: `number`
- **default** : `0`
- **use** : When commitlint is not used and normalization is to be used

:::tip
If commitlint is used, it will automatically read `subject-min-length` and set it to give a prompt on the command line
:::

## useCommitSignGPG

- **description** : use GPG sign commit message
- **type** : `boolean`
- **default** : `false`

:::tip
- Only take effect `czg` cz-git CLI
- Try running command to **enable directly use GPG sign commit message in the current session**
  - cz-git CLI: `czg gpg`

About GPG sign commit message information. can see: [Zhengqbbb/cz-git#58](https://github.com/Zhengqbbb/cz-git/issues/58)
:::

## formatMessageCB

- **description** : Use the callback fn can custom finally message formatter
- **type** : `(messageMod: CommitMessageOptions) => string`

```ts
interface CommitMessageOptions {
  type: string
  scope: string
  emoji: string
  markBreaking: string
  subject: string
  defaultHeader: string
  body: string
  breaking: string
  footer: string
  defaultMessage: string
}
```

- **default** : `({ defaultMessage }) => defaultMessage`
