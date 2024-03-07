---
title: 常见问题
sidebarDepth: 1
lastUpdated: true
sitemap:
    priority: 0.6
---
# 常见问题

## Error: require() of ES Module ... not supported

1. 如果你是 ESM 项目 (即 package.json 中有 `"type": "module"`)
    - 可以尝试更改 [配置名](/zh/config/) `.js` => `.cjs`
2. 如果你使用了 commitlint 版本(> 18)
    - 例如配置 `extends: ['@commitlint/config-conventional']`
    - 请升级 cz-git 或 czg 到最新版本

## 可以自定义消息格式吗

1. 配置总含有大部分消息格式的微调需求，例如 [emojiAlign](/zh/config/show#emojialign) 更换 emoji 位置
2. [formatMessageCB](/zh/config/engineer#formatmessagecb): 是最终格式回调函数，你可以配置它来达到你需求的消息格式

## 配置加载不符合预期

可以运行命令查看配置加载的路径

```sh
# commitizen cli
CZ_DEBUG=1 cz
# czg cli
CZ_DEBUG=1 czg
```

## githooks 模式下打开了像 `vim` 的编辑器

> 在使用 `prepare-commit-msg` hook 中会在消息合并后使用 editor [=> githooks 命令手册](https://git-scm.com/docs/githooks#_prepare_commit_msg)

1. 将 editor 从默认 `vi` 改为 `cat`
    ```sh
    git config --local core.editor cat
    ```
2. 添加 packages scripts 初始化脚本 `prepare` or pnpm's `postinstall`, 帮助其他贡献者进行初始化
    ```diff
    {
      "scripts": {
    -    "prepare": "husky install"
    +    "prepare": "husky install && git config --local core.editor cat"
      }
    }
    ```

## 全局安装后无法找到命令

- 输入命令 `npm prefix -g` 查看当中 npm 全局下载的 bin 文件夹路径是否添加到系统环境变量 `$PATH`
- 大概率是因为使用 nvm 更改了 npm 的全局下载路径前缀，但系统环境变量没有记录

## 终端无法显示 Emoji 符号

- 终端无法显示 Emoji 符号，大概率是因为你的终端对于 emoji/unicode 字符支持较差，但是不影响提交，因为最终输出提交的是 Emoji Code，可以考虑更换终端以及终端设置使用的[字体](https://github.com/ryanoasis/nerd-fonts)

## `cz-git` 和 `czg` 有什么不同

> 可以查看更多信息 [czg 的动机](/zh/cli/why.html)

- 如果你使用 `cz` 或 `git cz` 命令将会启动 `commitizen` CLI ==+== `cz-git` 适配器
- 如果你使用 `czg` 或 `git czg` 命令只会启动 `czg` CLI
