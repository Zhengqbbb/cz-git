# Why czg

## Motivation

cz-git has always used commitizen CLI as a launcher as an adapter, but recently I want a CLI which is zero dependency, faster to download, faster to start, simple and convenient, so that I can use it in any project without any additional configuration items, fast starts the CLI.

## What is different from commitizen

- No additional configuration required
- Expand cz-git features on its original basis
- The startup faster. Since the core of cz-git is already inside, there is no need to search for adapters and other operations

```bash{7,9}
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


