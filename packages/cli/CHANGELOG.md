# [1.7.0](https://github.com/Zhengqbbb/cz-git/compare/v1.6.2...v1.7.0) (2023-07-09)

### Bug Fixes

* **cli:** bootstrap using require to support node v10 ([2e71dd5](https://github.com/Zhengqbbb/cz-git/commit/2e71dd5fdaba714b8dbc26c7920f0ca6eaa99e35)), closes [#115](https://github.com/Zhengqbbb/cz-git/issues/115)
* windows system is unable to load the global configuration ([#133](https://github.com/Zhengqbbb/cz-git/issues/133)) ([d09fee4](https://github.com/Zhengqbbb/cz-git/commit/d09fee4c985efaa93f3282b237dd3de5747f173d)), closes [#132](https://github.com/Zhengqbbb/cz-git/issues/132)


### Features

* allow set scope as direct input to use ([#113](https://github.com/Zhengqbbb/cz-git/issues/113)) ([a2a4443](https://github.com/Zhengqbbb/cz-git/commit/a2a4443786194c582b74be769c7afd37950dd9f3))
* **cli:** add `--api-endpoint` | rename `--api-key` ([#136](https://github.com/Zhengqbbb/cz-git/issues/136)) ([4bd33f5](https://github.com/Zhengqbbb/cz-git/commit/4bd33f5edb685a880ae6e3e62cee827f519facd6))
* **cli:** add type for js config ([#135](https://github.com/Zhengqbbb/cz-git/issues/135)) ([9ca09aa](https://github.com/Zhengqbbb/cz-git/commit/9ca09aa7f3273f293bb2c35c998141eb61ce32b7))
* **cz-git,cli:** confirm message subject colorizen `themeColorCode` ([723dfe8](https://github.com/Zhengqbbb/cz-git/commit/723dfe8a15d2b7000548dbd87fbc9cfc1e0b3fc1))


### Performance Improvements

* **cz-git,czg:** reduce duplicate deps in bundle ([#111](https://github.com/Zhengqbbb/cz-git/issues/111)) ([2a52479](https://github.com/Zhengqbbb/cz-git/commit/2a5247902be16df400201883593fe49ce61187d3))



## [1.6.1](https://github.com/Zhengqbbb/cz-git/compare/v1.6.0...v1.6.1) (2023-03-22)


### Bug Fixes

* **cz-git:** `allowEmptyScopes` not work when not provide `scopes` ([ee0f045](https://github.com/Zhengqbbb/cz-git/commit/ee0f045443edda876ed052a730147dd32d4ddc5f)), closes [#109](https://github.com/Zhengqbbb/cz-git/issues/109)



# [1.6.0](https://github.com/Zhengqbbb/cz-git/compare/v1.5.3...v1.6.0) (2023-03-11)


### Features

* **cz-git,cli:** add `aiType` option to switch openAI model ([#102](https://github.com/Zhengqbbb/cz-git/issues/102)) ([e956ca0](https://github.com/Zhengqbbb/cz-git/commit/e956ca0eb3492aaed6b6b74e64e6f975a9cb3c15)), closes [#101](https://github.com/Zhengqbbb/cz-git/issues/101)
* **cz-git,cli:** add JSON schema provide to JSON configure e.g `.czrc` ([c113e53](https://github.com/Zhengqbbb/cz-git/commit/c113e53258eb5138efc765c84da4180e7db5fda6))
* **cz-git,czg:** add modify message with prompt on AI confirm ([#103](https://github.com/Zhengqbbb/cz-git/issues/103)) ([59b55c7](https://github.com/Zhengqbbb/cz-git/commit/59b55c7e07893e455cd4989cd25ca3a17a5210cb))



## [1.5.3](https://github.com/Zhengqbbb/cz-git/compare/v1.5.2...v1.5.3) (2023-03-04)


### Features

* **cz-git,cli:** add `--api-proxy` to setup openai api http proxy (close [#98](https://github.com/Zhengqbbb/cz-git/issues/98))([#100](https://github.com/Zhengqbbb/cz-git/issues/100)) ([f673262](https://github.com/Zhengqbbb/cz-git/commit/f67326255272955462b544057b71073966d405fa))



## [1.5.2](https://github.com/Zhengqbbb/cz-git/compare/v1.5.1...v1.5.2) (2023-03-04)


### Features

* **cz-git,cli:** add HTTPS proxy support for OpenAI API requests ([#97](https://github.com/Zhengqbbb/cz-git/issues/97)) ([0de320a](https://github.com/Zhengqbbb/cz-git/commit/0de320a8042dccbac6efbcfeaee49823b9ba8710))



## [1.5.1](https://github.com/Zhengqbbb/cz-git/compare/v1.5.0...v1.5.1) (2023-03-02)


### Features

* **cz-git,cli:** use `gpt-3.5-turbo` openai model ([#96](https://github.com/Zhengqbbb/cz-git/issues/96)) ([5018654](https://github.com/Zhengqbbb/cz-git/commit/5018654621990c5811e49e67bd4fc710ec56703e))



# [1.5.0](https://github.com/Zhengqbbb/cz-git/compare/v1.4.1...v1.5.0) (2023-02-18)


### Features

* **cz-git.czg:** support use OpenAI to generate commit subjects ([#93](https://github.com/Zhengqbbb/cz-git/issues/93)) ([3184e19](https://github.com/Zhengqbbb/cz-git/commit/3184e1993589b96cc8f649d9d2a4f6542bc7402d)), closes [#92](https://github.com/Zhengqbbb/cz-git/issues/92)



## [1.4.1](https://github.com/Zhengqbbb/cz-git/compare/v1.4.0...v1.4.1) (2022-12-11)


### Features

* **cz-git,cli:** add `confirmCommit` in `skipQuestions` [#86](https://github.com/Zhengqbbb/cz-git/issues/86) ([#88](https://github.com/Zhengqbbb/cz-git/issues/88)) ([1167109](https://github.com/Zhengqbbb/cz-git/commit/1167109ddced2bf1f51977f4ceeb3ae3fba07417))



# [1.4.0](https://github.com/Zhengqbbb/cz-git/compare/v1.3.12...v1.4.0) (2022-12-04)

### Bug Fixes

* fix(cz-git,czg)!: fix typo option `issuePrefixs` field [#82](https://github.com/Zhengqbbb/cz-git/issues/82) ([#84](https://github.com/Zhengqbbb/cz-git/issues/84)) ([febeba9](https://github.com/Zhengqbbb/cz-git/commit/febeba9565932776f69627f6d1062a79deb9989b))


### Features

* **cz-git,czg:** add `scopesSearchValue` boolean option field [#83](https://github.com/Zhengqbbb/cz-git/issues/83) ([#85](https://github.com/Zhengqbbb/cz-git/issues/85)) ([867eb87](https://github.com/Zhengqbbb/cz-git/commit/867eb87431c81abcf75811efefc7e44a5dd34232))


### ⚠ BREAKING CHANGES

* **cz-git,czg:** rename option `typesSearchValueKey` to `typesSearchValue`
  * Already processed for **normal compatibility**
* **cz-git,czg:** main fix `issuePrefixs` typo field
  * Current version has been already processed for **normal compatibility**
  * But I also hope that you can modify this message as soon as possible

```diff
{
  message: {
-   footerPrefixsSelect
+   footerPrefixesSelect

-   customFooterPrefixs
+   customFooterPrefix
 }

-   issuePrefixs
+   issuePrefixes

-   customIssuePrefixsAlign
+   customIssuePrefixAlign

-   emptyIssuePrefixsAlias
+   emptyIssuePrefixAlias

-   customIssuePrefixsAlias
+   customIssuePrefixAlias

-   allowCustomIssuePrefixs
+   allowCustomIssuePrefix

-   allowEmptyIssuePrefixs
+   allowEmptyIssuePrefix
}
```

Co-authored-by: [Chris](https://github.com/chrisbbreuer)


## [1.3.12](https://github.com/Zhengqbbb/cz-git/compare/v1.3.11...v1.3.12) (2022-10-21)


### Bug Fixes

* **cz-git,czg:** add ignore commitlint warning max length rule [#72](https://github.com/Zhengqbbb/cz-git/issues/72) (closed [#71](https://github.com/Zhengqbbb/cz-git/issues/71)) ([46346b4](https://github.com/Zhengqbbb/cz-git/commit/46346b416f2e0b6ed18d63d42db02a897d44a7c0))


### Features

* **plugin-loader:** add `cz.config.cjs` config profiles ([#73](https://github.com/Zhengqbbb/cz-git/issues/73)) ([a915085](https://github.com/Zhengqbbb/cz-git/commit/a915085ffe6f0caa5ad08e68ec33231373ccb76e))



## [1.3.11](https://github.com/Zhengqbbb/cz-git/compare/v1.3.10...v1.3.11) (2022-08-21)


### Bug Fixes

* **cz-git:** fix breaking change break line default format ([c073ec7](https://github.com/Zhengqbbb/cz-git/commit/c073ec7c6a2cbe2cfafd82c7dc85bee430a3803a))
* **cz-git:** fix empty custom output '___CUSTOM___' value ([d1475d5](https://github.com/Zhengqbbb/cz-git/commit/d1475d5d9da852aacaff9ea60a48796b1a42e172)), closes [#55](https://github.com/Zhengqbbb/cz-git/issues/55)


### Features

* **cli:** support GPG sign commit message ([c9caa97](https://github.com/Zhengqbbb/cz-git/commit/c9caa97576e898b64bf7e674f27ea5fdf4d6300f)), closes [#58](https://github.com/Zhengqbbb/cz-git/issues/58)
* **cz-git:** add `formatMessageCB` can custom finally commit message ([754c738](https://github.com/Zhengqbbb/cz-git/commit/754c7381aad3173236aa7103e8fc7d646138ee2a)), closes [#57](https://github.com/Zhengqbbb/cz-git/issues/57)
* **cz-git:** support types fuzzy search `types[name]` options ([ba4ce71](https://github.com/Zhengqbbb/cz-git/commit/ba4ce718dca23a05bc97f269db5c6d47dab273bd)), closes [#57](https://github.com/Zhengqbbb/cz-git/issues/57)



## [1.3.10](https://github.com/Zhengqbbb/cz-git/compare/v1.3.9...v1.3.10) (2022-07-23)


### Features

* **cli:** add `git-czg` git enter command ([de4d7ed](https://github.com/Zhengqbbb/cz-git/commit/de4d7ed18b5329cdf2424a06bb5134dc86481f99))
* **cli:** optimize czg `retry` option cache error message ([#48](https://github.com/Zhengqbbb/cz-git/issues/48)) ([757517b](https://github.com/Zhengqbbb/cz-git/commit/757517bdef0a07dae07b040760d71b364e2a80d0))



## [1.3.9](https://github.com/Zhengqbbb/cz-git/compare/v1.3.8...v1.3.9) (2022-07-01)


### Features

* **cli:** add `czg --alias` can directly submit the defined commit message ([ea7423d](https://github.com/Zhengqbbb/cz-git/commit/ea7423d3060d464bf36f11b7baede71f50e1da20)), closes [#43](https://github.com/Zhengqbbb/cz-git/issues/43)
* **cz-git:** add `alias` option can directly submit the defined commit message ([692a582](https://github.com/Zhengqbbb/cz-git/commit/692a582c9ca2836a488248505ed29bbc0f265a47)), closes [#43](https://github.com/Zhengqbbb/cz-git/issues/43)
* **cz-git:** add `emojiAlign` custom setting emoji header location ([ab23be2](https://github.com/Zhengqbbb/cz-git/commit/ab23be25db57da98c85c25a79d701a58c6a4472f)), closes [#43](https://github.com/Zhengqbbb/cz-git/issues/43)



## [1.3.8](https://github.com/Zhengqbbb/cz-git/compare/v1.3.7...v1.3.8) (2022-06-26)


### Bug Fixes

* **cli:** remove BREAKINGCHANGE question limit when `czg break` ([1bf9a72](https://github.com/Zhengqbbb/cz-git/commit/1bf9a723d0fd483e352d89afbb334bbf96e5ec10))



## [1.3.7](https://github.com/Zhengqbbb/cz-git/compare/v1.3.6...v1.3.7) (2022-06-25)


### Bug Fixes

* **cz-git:** remove `markBreakingChangeMode` restrictions on BREAKINGCHANGE footer ([a745bf2](https://github.com/Zhengqbbb/cz-git/commit/a745bf28b665a2d7810c88131db5560097870308)), closes [#38](https://github.com/Zhengqbbb/cz-git/issues/38)



## [1.3.6](https://github.com/Zhengqbbb/cz-git/compare/v1.3.5...v1.3.6) (2022-06-25)


### Features

* **cli:** `czg` cli add core commit msg ([7d9dc15](https://github.com/Zhengqbbb/cz-git/commit/7d9dc15de97ccf9f890a10c37811546165539de9)), closes [#37](https://github.com/Zhengqbbb/cz-git/issues/37)
* **cz-git:** add `markBreakingChangeMode` options to add extra prompt ([da4b624](https://github.com/Zhengqbbb/cz-git/commit/da4b6245a139ac240d3f64d2ba4c052bee8c015a)), closes [#38](https://github.com/Zhengqbbb/cz-git/issues/38)


### Performance Improvements

* **cz-git:** `cz-git` packages size 1.7MB => 1.5MB ([665d509](https://github.com/Zhengqbbb/cz-git/commit/665d50979ce0d381fe341b187484d7582a06f769))
* **cz-git:** change bundle strategy | reduce 0.14MB ([1f1e746](https://github.com/Zhengqbbb/cz-git/commit/1f1e7463dadf3fe74a069cb4e1b6184c59dcbaa2)), closes [#37](https://github.com/Zhengqbbb/cz-git/issues/37)



