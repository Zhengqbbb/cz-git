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
