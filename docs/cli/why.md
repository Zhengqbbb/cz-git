# Why czg

## Motivation

Article: [「czg development journey」](https://www.qbb.sh/posts/2022-12-26-cz-git-czg-journey#the-development-journey-of-czg)

cz-git has always used [Commitizen CLI](https://github.com/commitizen/cz-cli) as an adapter (plugin)

But recently I want a CLI which is zero dependency, faster to download, faster to start, simple and convenient, that I can use it in any project without any additional configuration items, fast starts the CLI.

So i finished `czg` CLI. You can understand it as **commitizen CLI alternative** (`commitizen` CLI + `cz-git`)

## What is different from Commitizen CLI

- No additional download step required
- Expand cz-git features on its original basis
- The startup faster. Since the core of cz-git is already inside, Has all the same convenient features as cz-git
- More Lightweight. Better as project **devDependencies** or use `npx` in any of your projects

```sh{7,9}
$ npm install -D commitizen
added 148 packages, and audited 149 packages in 2 m
$ du -sh ./node_modules
102M ./node_modules

$ npm install -D czg
added 1 package, and audited 2 packages in 408 ms
$ du -sh ./node_modules/*
1.3M ./node_modules/czg
```

## What is different from cz-git
cz-git is **commitizen adapter**. czg behaves and loads config... the same as cz-git. If someone on your team is using Commitizen CLI. The two can be mixed, after all, both are very small and have zero dependencies.

- If you using `cz` or `git cz` command will start `commitizen` CLI ==+== `cz-git` adapter
- If you using `czg` or `git czg` command will only start `czg` CLI
