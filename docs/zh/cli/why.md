# 为什么选择 czg

## 动机

文章: [「czg 开发的心路历程」](https://www.qbb.sh/posts/2022-12-26-cz-git-czg-journey-zh#czg-%E7%9A%84%E5%BC%80%E5%8F%91%E5%8E%86%E7%A8%8B)

cz-git 一直以来都是作为 [Commitizen CLI](https://github.com/commitizen/cz-cli) 的适配器

但现在我更需要他是一款零依赖项，下载速度更快，启动速度更快，简单且方便的 CLI，以至于无需任何的前置条件就可以快速启动 CLI。

所以我完成了 `czg` CLI。你可以理解为他是 **Commitizen CLI 的替代方案** \
= (`Commitizen` CLI + `cz-git`)

## 与 Commitizen CLI 相比有什么不同

- 无需任何前置配置
- 在原有基础上扩展 cz-git 的基础功能
- 启动速度更快。内部已包含 cz-git 核心，不需要寻找适配器和其他操作. 拥有了 cz-git 一切便利的特性
- 更轻量化。更适合作为项目的依赖性 或 使用 `npx` 在你的任何项目启动

```sh{7,9}
$ npm install -D commitizen
added 148 packages, and audited 149 packages in 2 m
$ du -sh ./node_modules
102M ./node_modules

$ npm install -D czg
added 1 package, and audited 2 packages in 531 ms
$ du -sh ./node_modules/*
1.31M ./node_modules/czg
```

## 与 cz-git 相比有什么不同
cz-git 是 **Commitizen 的适配器**。而 czg 具有 cz-git 相同的行为和配置加载。如果你的团队中有人使用 Commitizen CLI，两者可以混用，毕竟两者都非常小并且无需下载其他依赖项。

- 如果你使用 `cz` 或 `git cz` 命令将会启动 `Commitizen` CLI ==+== `cz-git` 适配器
- 如果你使用 `czg` 或 `git czg` 命令只会启动 `czg` CLI
