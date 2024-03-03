# [1.9.0](https://github.com/Zhengqbbb/cz-git/compare/v1.8.0...v1.9.0) (2024-03-03)


### Bug Fixes

* **loader:** support commitlint v19 `esm` plugin extends config ([#161](https://github.com/Zhengqbbb/cz-git/issues/161)) ([e410465](https://github.com/Zhengqbbb/cz-git/commit/e41046597391df673747777cfa0c6f73a7880daf)), closes [#160](https://github.com/Zhengqbbb/cz-git/issues/160)



# [1.8.0](https://github.com/Zhengqbbb/cz-git/compare/v1.7.1...v1.8.0) (2023-12-06)


### Features

* **cz-git,cli:** `defaultScope` support `string[]` to default-select for checkbox mode ([#148](https://github.com/Zhengqbbb/cz-git/issues/148)) ([a02b7d1](https://github.com/Zhengqbbb/cz-git/commit/a02b7d1d1d0c1d48fa7044679afd7c32b8837849)), closes [#140](https://github.com/Zhengqbbb/cz-git/issues/140)



## [1.7.1](https://github.com/Zhengqbbb/cz-git/compare/v1.7.0...v1.7.1) (2023-08-08)


### Bug Fixes

* **cli:** `--api-key` not work ([0a65673](https://github.com/Zhengqbbb/cz-git/commit/0a65673b2b501d2c5bc8562652a75098a29f4ae9)), closes [#141](https://github.com/Zhengqbbb/cz-git/issues/141)



# [1.7.0](https://github.com/Zhengqbbb/cz-git/compare/v1.6.2...v1.7.0) (2023-07-09)


### Bug Fixes

* windows system is unable to load the global configuration ([#133](https://github.com/Zhengqbbb/cz-git/issues/133)) ([d09fee4](https://github.com/Zhengqbbb/cz-git/commit/d09fee4c985efaa93f3282b237dd3de5747f173d)), closes [#132](https://github.com/Zhengqbbb/cz-git/issues/132)


### Features

* **cz-git,cli:** allow set scope as direct input to use ([#113](https://github.com/Zhengqbbb/cz-git/issues/113)) ([a2a4443](https://github.com/Zhengqbbb/cz-git/commit/a2a4443786194c582b74be769c7afd37950dd9f3))
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



## [1.3.5](https://github.com/Zhengqbbb/cz-git/compare/v1.3.4...v1.3.5) (2022-06-16)


### Features

* **cz-git:** add defaultFooterPrefix provide custom footer  prefix ([90f473b](https://github.com/Zhengqbbb/cz-git/commit/90f473b2ad49645adf6d11480a5b90c99228f642))



## [1.3.4](https://github.com/Zhengqbbb/cz-git/compare/v1.3.3...v1.3.4) (2022-06-04)


### Features

* **cz-git:** use complete-input inquirer plugin replace input ([ca133bf](https://github.com/Zhengqbbb/cz-git/commit/ca133bf5eb2caa831f4e93891ab76383b67014c7)), closes [#32](https://github.com/Zhengqbbb/cz-git/issues/32)
* **plugin-inquirer:** add ansiEscapes to control corsor move ([e8dac95](https://github.com/Zhengqbbb/cz-git/commit/e8dac95800e3d95ddfa25834d4317d8218303478)), closes [#32](https://github.com/Zhengqbbb/cz-git/issues/32)
* **plugin-inquirer:** add complete-input inquirer plugin ([b20bbc1](https://github.com/Zhengqbbb/cz-git/commit/b20bbc1cbe429b5c9f9730da58ae40f410cf6b9a)), closes [#32](https://github.com/Zhengqbbb/cz-git/issues/32)
* **plugin-inquirer:** checkbox and list support use tab key move down list ([e38ed9f](https://github.com/Zhengqbbb/cz-git/commit/e38ed9f972a757f1acfef2a2405ce56f3d3e2f91)), closes [#32](https://github.com/Zhengqbbb/cz-git/issues/32)



## [1.3.3](https://github.com/Zhengqbbb/cz-git/compare/v1.3.2...v1.3.3) (2022-05-28)


### Features

* **cz-git:** add defaultType options ([51f79c8](https://github.com/Zhengqbbb/cz-git/commit/51f79c876d638c612cc4743fbd940b0a097ce196)), closes [#30](https://github.com/Zhengqbbb/cz-git/issues/30)
* **cz-git:** add scopeFilters options to filter scopes item ([86e95a7](https://github.com/Zhengqbbb/cz-git/commit/86e95a79129c629c80a4d7fd342e67c4dde99a3c)), closes [#30](https://github.com/Zhengqbbb/cz-git/issues/30)
* **plugin-loader:** add more configure file to enhance js define ([54bd3ab](https://github.com/Zhengqbbb/cz-git/commit/54bd3ab24339888bb1ff29285e7aea4181ff2d65)), closes [#30](https://github.com/Zhengqbbb/cz-git/issues/30)
* **plugin-loader:** support function option and can custom define config path ([4db5914](https://github.com/Zhengqbbb/cz-git/commit/4db5914c11317ed0e5493501666e09816b56d12b)), closes [#30](https://github.com/Zhengqbbb/cz-git/issues/30)


### Reverts

* revert code ([d081ad7](https://github.com/Zhengqbbb/cz-git/commit/d081ad752b91afa048492eae94724b5e2c198d1a))



## [1.3.2](https://github.com/Zhengqbbb/cz-git/compare/v1.3.1...v1.3.2) (2022-05-21)


### Features

* **cz-git:** add theme color for prompt inquirer ([d776149](https://github.com/Zhengqbbb/cz-git/commit/d776149d18fc35125bc602b0d5ad14dd47ab0cc1)), closes [#28](https://github.com/Zhengqbbb/cz-git/issues/28)
* **cz-git:** use search-list replace autocomplete ([5dbe4e2](https://github.com/Zhengqbbb/cz-git/commit/5dbe4e22faea9264a8aefe01fce712e1ad687620)), closes [#28](https://github.com/Zhengqbbb/cz-git/issues/28)
* **plugin-inquirer:** checkbox support theme color configure ([8c2effe](https://github.com/Zhengqbbb/cz-git/commit/8c2effe0b770f00a51cde16e9deb0e21bc913b12))
* **plugin-inquirer:** done search-list inquirer plugin ([ad12f75](https://github.com/Zhengqbbb/cz-git/commit/ad12f7518e49a0526780464ccca0f64aeae953f2)), closes [#28](https://github.com/Zhengqbbb/cz-git/issues/28)


### Performance Improvements

* :zap: update tsup bundle build cz-git ([0e15e1c](https://github.com/Zhengqbbb/cz-git/commit/0e15e1c3f29dc2d1fc7fc47598df6ecc9d8f7eff))



## [1.3.1](https://github.com/Zhengqbbb/cz-git/compare/v1.3.0...v1.3.1) (2022-05-14)


### Bug Fixes

* **plugin-inquirer:** bump inquirer version ([1111fda](https://github.com/Zhengqbbb/cz-git/commit/1111fdafcf95a2e66b3fcff98adee751d9f2fd61))



# [1.3.0](https://github.com/Zhengqbbb/cz-git/compare/v1.2.9...v1.3.0) (2022-05-14)


### Bug Fixes

* **cz-git:** fix emoji and checkbox subcmd usage ([9efe275](https://github.com/Zhengqbbb/cz-git/commit/9efe2752bbb41cad80fc33cc84dfcecdc0a462e0))


### Features

* **cz-git:** add get command arg to set useEmoji and enableMultipleScopes ([2cebeea](https://github.com/Zhengqbbb/cz-git/commit/2cebeea39f9f8c48ed2c223663599361845de090))
* **cz-git:** configure loader extract, perf load speed ([d4ec683](https://github.com/Zhengqbbb/cz-git/commit/d4ec683617393aafd28f72afae7abe4b9caba42c)), closes [#24](https://github.com/Zhengqbbb/cz-git/issues/24) [#25](https://github.com/Zhengqbbb/cz-git/issues/25)
* **cz-git:** update ci defalut emoji code: ferris_wheel ([4df8de8](https://github.com/Zhengqbbb/cz-git/commit/4df8de8e6f7430730e7e91435925e4ee5f07180a))


### BREAKING CHANGES

* **cz-git:** No supprt typescript config define file. `commitlint.config.ts`



## [1.2.9](https://github.com/Zhengqbbb/cz-git/compare/v1.2.8...v1.2.9) (2022-05-12)


### Bug Fixes

* **cz-git:** fix empty scope err validate for not allow empty ([654f75f](https://github.com/Zhengqbbb/cz-git/commit/654f75f10f2ce33494ac0c893de855ba1555105e))


### Features

* **cz-git:** add multiple scopes mode ([89470d9](https://github.com/Zhengqbbb/cz-git/commit/89470d94dd2c208fdfc3f872466846060369ade4)), closes [#14](https://github.com/Zhengqbbb/cz-git/issues/14)
* **plugin-inquirer:** add figures symbols ([3eea116](https://github.com/Zhengqbbb/cz-git/commit/3eea1162c7c180b91fa24288ed4f6eb3eb84e334))
* **plugin-inquirer:** add separator option for checkbox multiple ([3eaab45](https://github.com/Zhengqbbb/cz-git/commit/3eaab45782a8ba007e0b5596453cee9ed8d858ea))
* **plugin-inquirer:** add style util Fuc to output colorizen of prompt ([9c48ace](https://github.com/Zhengqbbb/cz-git/commit/9c48ace8dfe9561e1c6a27718d4429af21139d40))
* **plugin-inquirer:** done checkbox inquirer plugin for multiple ([26b54c5](https://github.com/Zhengqbbb/cz-git/commit/26b54c5fbea3d682dea01a77ea70e006b75861c8)), closes [#14](https://github.com/Zhengqbbb/cz-git/issues/14)
* **plugin-inquirer:** done the checkbox core render ([2849162](https://github.com/Zhengqbbb/cz-git/commit/28491628efd47e758fa80215fb40546ddaac78a3)), closes [#14](https://github.com/Zhengqbbb/cz-git/issues/14)



## [1.2.8](https://github.com/Zhengqbbb/cz-git/compare/v1.2.7...v1.2.8) (2022-04-30)


### Features

* **cz-git:** use fuzzy search for type, scope and issues list ([b82fbf9](https://github.com/Zhengqbbb/cz-git/commit/b82fbf9192190b9c64209c75d13a07f4b4691bbd)), closes [#22](https://github.com/Zhengqbbb/cz-git/issues/22)
* **plugin-inquirer:** add fuzzy match str util funtion ([efde652](https://github.com/Zhengqbbb/cz-git/commit/efde65279403435c467957f4e20f4c301cda5201)), closes [#22](https://github.com/Zhengqbbb/cz-git/issues/22)
* **plugin-inquirer:** add fuzzyFilter util Fuc provide cz-git ([83f773e](https://github.com/Zhengqbbb/cz-git/commit/83f773ed7561494d8f98fcb2cc316146ae90a29a)), closes [#22](https://github.com/Zhengqbbb/cz-git/issues/22)


## [1.2.7](https://github.com/Zhengqbbb/cz-git/compare/v1.2.6...v1.2.7) (2022-04-27)


### Bug Fixes

* fix deploy script ([a2b6242](https://github.com/Zhengqbbb/cz-git/commit/a2b624298081a790a3cbae8861f58ac35472f015))



## [1.2.6](https://github.com/Zhengqbbb/cz-git/compare/v1.2.5...v1.2.6) (2022-04-27)


### Bug Fixes

* **cz-git:** fix breaking char priority than maxNumber ([4f463fa](https://github.com/Zhengqbbb/cz-git/commit/4f463fa60b73fcd18b23b49786d7d34d58d1275a))


### Features

* **cz-git:** support single item intelligent filter ouput of scope and issueprefix ([73f688c](https://github.com/Zhengqbbb/cz-git/commit/73f688cb3d8ec565db2d272e215951e8fa86184c)), closes [#12](https://github.com/Zhengqbbb/cz-git/issues/12)
* **cz-git:** upgrade inquirer dep version 8.2.2 ([fbbf429](https://github.com/Zhengqbbb/cz-git/commit/fbbf4298491413f6360400366d35af310fb76233))


### Reverts

* **cz-git:** fix getSingleParams use error param ([3c32415](https://github.com/Zhengqbbb/cz-git/commit/3c32415359bf0b4d490d51f4eb411f1e59d606bc))



## [1.2.5](https://github.com/Zhengqbbb/cz-git/compare/v1.2.4...v1.2.5) (2022-04-23)


### Bug Fixes

* **cz-git:** both check the scope empty rule use ruleIsNotApplicable ([3545cce](https://github.com/Zhengqbbb/cz-git/commit/3545ccecc9fc0651d17ad9a5e4a2e16ded183a7c)), closes [#15](https://github.com/Zhengqbbb/cz-git/issues/15)
* **cz-git:** use strict empty scope strategy ([ba44c8d](https://github.com/Zhengqbbb/cz-git/commit/ba44c8dc7d28e49717cd22b68e1f5f403bb67e4c)), closes [#12](https://github.com/Zhengqbbb/cz-git/issues/12) [#15](https://github.com/Zhengqbbb/cz-git/issues/15)





## [1.2.4](https://github.com/Zhengqbbb/cz-git/compare/v1.2.3...v1.2.4) (2022-04-23)


### Bug Fixes

* **cz-git:** fix custom scope skip allowEmptyScopes check ([f0d8c53](https://github.com/Zhengqbbb/cz-git/commit/f0d8c53319915bce17378e81b14065fef25c1d95)), closes [#16](https://github.com/Zhengqbbb/cz-git/issues/16)
* **cz-git:** fix minor issues in default messages ([99d8cc4](https://github.com/Zhengqbbb/cz-git/commit/99d8cc4752e117157cceaee00a364e27854216f2))


### Features

* **cz-git:** add strict issuePrefixs configure ([f2d11a9](https://github.com/Zhengqbbb/cz-git/commit/f2d11a93db6cb8bc17f80d9895eac25f2ef6469d)), closes [#12](https://github.com/Zhengqbbb/cz-git/issues/12)
* **cz-git:** allowEmptyScopes can base on ["scope-empty"] rule ([4d3eff9](https://github.com/Zhengqbbb/cz-git/commit/4d3eff9d1d3f5c113264a0b7d84dbc0277f38705)), closes [#15](https://github.com/Zhengqbbb/cz-git/issues/15)
* **cz-git:** use defaultScope can star item of scope list ([b899d2c](https://github.com/Zhengqbbb/cz-git/commit/b899d2c47967752cc364d7a0b747175d0697ea29)), closes [#16](https://github.com/Zhengqbbb/cz-git/issues/16)





## [1.2.3](https://github.com/Zhengqbbb/cz-git/compare/v1.2.2...v1.2.3) (2022-04-07)


### Features

* **cz-git:** add typesAppend options to add extra types to default types ([8e8d4cc](https://github.com/Zhengqbbb/cz-git/commit/8e8d4cc12b41bbcd968fc601530e8eca0a5ac53e))





## [1.2.2](https://github.com/Zhengqbbb/cz-git/compare/v1.2.1...v1.2.2) (2022-03-30)


### Features

* **cz-git:** add max string number to break line for Body and BreakingChange ([e9fe6ae](https://github.com/Zhengqbbb/cz-git/commit/e9fe6aea5a00c0dc646bca405171cd5fe710b1fc)), closes [#6](https://github.com/Zhengqbbb/cz-git/issues/6)





## [1.2.1](https://github.com/Zhengqbbb/cz-git/compare/v1.2.0...v1.2.1) (2022-03-11)


### Bug Fixes

* **cz-git:** fix limit length defind commitlint config ([f602c9e](https://github.com/Zhengqbbb/cz-git/commit/f602c9e6e20d3ad284807629565fb4764ece0374))





# [1.2.0](https://github.com/Zhengqbbb/cz-git/compare/v1.1.8...v1.2.0) (2022-03-06)

**Note:** Version bump only for package cz-git





## [1.1.8](https://github.com/Zhengqbbb/cz-git/compare/v1.1.7...v1.1.8) (2022-03-04)


### Features

* **cz-git:** add auto get issue id ([05ae340](https://github.com/Zhengqbbb/cz-git/commit/05ae34045cec23a023bd3f107eecb772d3b844b7))


### BREAKING CHANGES

* **cz-git:** can see the config: https://github.com/Zhengqbbb/cz-git/blob/main/.commitlintrc.js





## [1.1.7](https://github.com/Zhengqbbb/cz-git/compare/v1.1.6...v1.1.7) (2022-03-03)


### Features

* **cz-git:** keep inquirer dep version same lerna inquirer version ([a2de902](https://github.com/Zhengqbbb/cz-git/commit/a2de902eb592b70b83213cbfc97a27e88211300e))

## [1.1.3](https://github.com/Zhengqbbb/cz-git/compare/v1.1.1...v1.1.3) (2022-03-03)


### Features

* **cz-git:** init monorepo project ([ef6f30d](https://github.com/Zhengqbbb/cz-git/commit/ef6f30d6670c3817163c5b0f7c1fe0bb4d65c9e5)), closes [#2](https://github.com/Zhengqbbb/cz-git/issues/2)
* **cz-git:** reduce commitizen dev number and lock commitilint load ([2b207be](https://github.com/Zhengqbbb/cz-git/commit/2b207be37ef4594aaede5b51496377a8ed4ca172)), closes [#2](https://github.com/Zhengqbbb/cz-git/issues/2)
* **cz-git:** reduce commitlint type dev ([8427b2b](https://github.com/Zhengqbbb/cz-git/commit/8427b2b21c6a07069aca1c12331542bb27d89217))
* **cz-git:** reduce editor dev ([d709130](https://github.com/Zhengqbbb/cz-git/commit/d7091300a74734b87270c9a782ead7d730737b02))
* **cz-git:** reduce inquirer dev number ([7efb64f](https://github.com/Zhengqbbb/cz-git/commit/7efb64f9ae1d3df52a4b835f643a585cdd3c2060))
* **cz-git:** reduce word-wrap and temp dev number ([e94f05a](https://github.com/Zhengqbbb/cz-git/commit/e94f05a6712e6513f263344c10dd77cec9828359)), closes [#2](https://github.com/Zhengqbbb/cz-git/issues/2)





## [1.1.2](https://github.com/Zhengqbbb/cz-git/compare/v1.1.1...v1.1.2) (2022-03-03)


### Features

* **cz-git:** init monorepo project ([ef6f30d](https://github.com/Zhengqbbb/cz-git/commit/ef6f30d6670c3817163c5b0f7c1fe0bb4d65c9e5)), closes [#2](https://github.com/Zhengqbbb/cz-git/issues/2)
* **cz-git:** reduce commitizen dev number and lock commitilint load ([2b207be](https://github.com/Zhengqbbb/cz-git/commit/2b207be37ef4594aaede5b51496377a8ed4ca172)), closes [#2](https://github.com/Zhengqbbb/cz-git/issues/2)
* **cz-git:** reduce commitlint type dev ([8427b2b](https://github.com/Zhengqbbb/cz-git/commit/8427b2b21c6a07069aca1c12331542bb27d89217))
* **cz-git:** reduce editor dev ([d709130](https://github.com/Zhengqbbb/cz-git/commit/d7091300a74734b87270c9a782ead7d730737b02))
* **cz-git:** reduce word-wrap and temp dev number ([e94f05a](https://github.com/Zhengqbbb/cz-git/commit/e94f05a6712e6513f263344c10dd77cec9828359)), closes [#2](https://github.com/Zhengqbbb/cz-git/issues/2)





## [1.1.2](https://github.com/Zhengqbbb/cz-git/compare/v1.1.1...v1.1.2) (2022-03-03)


### Features

* **cz-git:** init monorepo project ([ef6f30d](https://github.com/Zhengqbbb/cz-git/commit/ef6f30d6670c3817163c5b0f7c1fe0bb4d65c9e5)), closes [#2](https://github.com/Zhengqbbb/cz-git/issues/2)
* **cz-git:** reduce commitizen dev number and lock commitilint load ([2b207be](https://github.com/Zhengqbbb/cz-git/commit/2b207be37ef4594aaede5b51496377a8ed4ca172)), closes [#2](https://github.com/Zhengqbbb/cz-git/issues/2)
* **cz-git:** reduce commitlint type dev ([8427b2b](https://github.com/Zhengqbbb/cz-git/commit/8427b2b21c6a07069aca1c12331542bb27d89217))
* **cz-git:** reduce editor dev ([d709130](https://github.com/Zhengqbbb/cz-git/commit/d7091300a74734b87270c9a782ead7d730737b02))
* **cz-git:** reduce word-wrap and temp dev number ([e94f05a](https://github.com/Zhengqbbb/cz-git/commit/e94f05a6712e6513f263344c10dd77cec9828359)), closes [#2](https://github.com/Zhengqbbb/cz-git/issues/2)





### [1.1.1](https://github.com/Zhengqbbb/cz-git/compare/v1.1.0...v1.1.1) (2022-02-28)

### Bug Fixes

* **cz-git:** fix footerPrefix custom ([fc8dc78](https://github.com/Zhengqbbb/cz-git/commit/fc8dc7869a8db022771cd1ff9bcbdb99917aeb58))

## [1.1.0](https://github.com/Zhengqbbb/cz-git/compare/v1.0.9...v1.1.0) (2022-02-28)


### Features

* **cz-git:** done document README.Marks the official version release ([31e8b4d](https://github.com/Zhengqbbb/cz-git/commit/31e8b4d3ec4fa51d376b70202e7d9d7ce510e0d6)), closes [#1](https://github.com/Zhengqbbb/cz-git/issues/1)

### [1.0.9](https://github.com/Zhengqbbb/cz-git/compare/v1.0.7...v1.0.9) (2022-02-27)


### ⚠ BREAKING CHANGES

* **cz-git:** - `customScopesAlign` and `customIssuePrefixsAlign`:
can change align in selet
- `emptyScopesAlias`, `customScopesAlias`, `emptyIssuePrefixsAlias`, `customIssuePrefixsAlias`:
can change name of the prompt show

### Features

* **cz-git:** add align and alias option for selector ([5be93a5](https://github.com/Zhengqbbb/cz-git/commit/5be93a5ee07f969c32d74536d4c9dc8fed7737e7)), closes [#1](https://github.com/Zhengqbbb/cz-git/issues/1)
* **cz-git:** add allowEmptyScopes, allowCustomScopes to control disable ([e0becb6](https://github.com/Zhengqbbb/cz-git/commit/e0becb6fce5d6adae266f51aae58aac1a625c718)), closes [#1](https://github.com/Zhengqbbb/cz-git/issues/1)


### Bug Fixes

* **cz-git:** fixed use both maxHeaderLength and maxSubjectLengt ([659b8eb](https://github.com/Zhengqbbb/cz-git/commit/659b8eb9f9787698b766185fb62043fb98d8a511)), closes [#1](https://github.com/Zhengqbbb/cz-git/issues/1)

### [1.0.8](https://github.com/Zhengqbbb/cz-git/compare/v1.0.7...v1.0.8) (2022-02-24)


### ⚠ BREAKING CHANGES
- feat: allowCustomScopes and allowCustomScopes control disable
- feat: scopes can auto load value
from `commitlint`
* **cz-git:** - `customScopesAlign` and `customIssuePrefixsAlign`:
can change align in selet
- `emptyScopesAlias`, `customScopesAlias`, `emptyIssuePrefixsAlias`, `customIssuePrefixsAlias`:
can change name of the prompt show

### Features

* **cz-git:** add align and alias option for selector ([5be93a5](https://github.com/Zhengqbbb/cz-git/commit/5be93a5ee07f969c32d74536d4c9dc8fed7737e7)), closes [#1](https://github.com/Zhengqbbb/cz-git/issues/1)
* **cz-git:** add allowEmptyScopes, allowCustomScopes to control disable ([e0becb6](https://github.com/Zhengqbbb/cz-git/commit/e0becb6fce5d6adae266f51aae58aac1a625c718)), closes [#1](https://github.com/Zhengqbbb/cz-git/issues/1)

### [1.0.7](https://github.com/Zhengqbbb/cz-git/compare/v1.0.6...v1.0.7) (2022-02-22)


### ⚠ BREAKING CHANGES

* **cz-git:** `confirmColorize` option: Prompt final determination whether to display the color

### Features

* **cz-git:** add confirmColorize option to handle confirm colorize ([68b2629](https://github.com/Zhengqbbb/cz-git/commit/68b26296cb00ca0d33fcebbec6ba8ed36ca53e96)), closes [#1](https://github.com/Zhengqbbb/cz-git/issues/1)

### [1.0.6](https://github.com/Zhengqbbb/cz-git/compare/v1.0.5...v1.0.6) (2022-02-21)


### ⚠ BREAKING CHANGES

* **cz-git:** add option `breaklineChar`

### Features

* **cz-git:** add breaklineChar option to make new line for body and BreakingChanges ([6691c26](https://github.com/Zhengqbbb/cz-git/commit/6691c2624925551b4ad4175e0e9d953ebfe47baf)), closes [#1](https://github.com/Zhengqbbb/cz-git/issues/1)

### [1.0.5](https://github.com/Zhengqbbb/cz-git/compare/v1.0.4...v1.0.5) (2022-02-21)


### Features

* **cz-git:** support both head and subject max rules ([2444724](https://github.com/Zhengqbbb/cz-git/commit/24447247fec13d3f9c4ba323d74da5904f63133f)), closes [#1](https://github.com/Zhengqbbb/cz-git/issues/1)

### [1.0.4](https://github.com/Zhengqbbb/cz-git/compare/v1.0.3...v1.0.4) (2022-02-19)


### ⚠ BREAKING CHANGES

* **cz-git:** Need open option `useEmoji`

### Features

* **cz-git:** :sparkles: support commit add emoji ([dd7d9e0](https://github.com/Zhengqbbb/cz-git/commit/dd7d9e05e6aed48fd3962663fa5f00940d177070)), closes [#1](https://github.com/Zhengqbbb/cz-git/issues/1)

### [1.0.3](https://github.com/Zhengqbbb/cz-git/compare/v1.0.2...v1.0.3) (2022-02-19)


### ⚠ BREAKING CHANGES

* **cz-git:** e.g: { value: "cz-git", name: "cz-git:   core control" }

### Features

* **cz-git:** scopes config support value to add descrition for selector ([980f163](https://github.com/Zhengqbbb/cz-git/commit/980f1631d00a68a9a328319c0f8d3523c5e3e0e2)), closes [#1](https://github.com/Zhengqbbb/cz-git/issues/1)

### [1.0.2](https://github.com/Zhengqbbb/cz-git/compare/v1.0.1...v1.0.2) (2022-02-18)


### ⚠ BREAKING CHANGES

* **cz-git:** if you want to use just set option:
1. defaultScope
2. defaultSubject
3. defaultBody
4. defaultIssues
more introduction see types:
https://github.com/Zhengqbbb/cz-git/blob/main/src/share.ts#L176
### Features

* **cz-git:** add default option to provide default value ([9910b75](https://github.com/Zhengqbbb/cz-git/commit/9910b7542d303a5b7830dbdf05785928d32b8292)), link [#1](https://github.com/Zhengqbbb/cz-git/issues/1)

### [1.0.1](https://github.com/Zhengqbbb/cz-git/compare/v1.0.0...v1.0.1) (2022-02-18)


### Features

* **config:** add standard-version to generate CHANGELOG ([08f5b77](https://github.com/Zhengqbbb/cz-git/commit/08f5b77428cf2042f154b5f39524b8c28adcb6a1))


### Bug Fixes

* **cz-git:** fix package main enter file path ([a1ec4e0](https://github.com/Zhengqbbb/cz-git/commit/a1ec4e0aac8a2fe439c0fc3e384b754322c96347))

## 1.0.0 (2022-02-18)


### Features

* **cz-git:** done commit prompt overall process ([bfb969c](https://github.com/Zhengqbbb/cz-git/commit/bfb969cd03711a2733fcfe59ff93170d353da6e4)), link [#1](https://github.com/Zhengqbbb/cz-git/issues/1)
