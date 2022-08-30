# 为什么选择 czg

## 动机

cz-git 一直以来都是作为 [Commitizen CLI](https://github.com/commitizen/cz-cli) 的适配器，但现在我需要一款零依赖项，下载速度更快，启动速度更快，简单且方便的 CLI，以至于无需任何的前置条件就可以快速启动 CLI。

## 与 Commitizen CLI 相比有什么不同

- 无需任何前置配置
- 在原有基础上扩展 cz-git 的基础功能
- 启动速度更快。内部已包含 cz-git 核心，不需要寻找适配器和其他操作

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

## 与 cz-git 相比有什么不同
cz-git 是 **commitizen 的适配器**。而 czg 具有 cz-git 相同的行为和配置加载。如果你的团队中有人使用 Commitizen CLI，两者可以混用，毕竟两者都非常小并且无需下载其他依赖项。

