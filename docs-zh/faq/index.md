---
title: 常见问题
sidebarDepth: 1
lastUpdated: true
sitemap:
    priority: 0.6
---
# 常见问题

## Windows 用户使用

- Windows用户建议不要使用 powershell, cmd 进行命令行的使用
- 因为他们不是基于 POSIX SHELL 规范，即不是标准终端环境
- 建议也不要使用 gitbash，因为该终端并不是交互型终端，上下选择会受到很大的使用体验
- **建议使用 Windows Terminal 结合 WSL ，你在日常的开发和使用中也应该如此**

## 全局安装后无法找到命令

- 输入命令 `npm prefix -g` 查看当中npm全局下载的路径是否为根目录下
- 大概率是因为使用 nvm 更改了 npm 的全局下载路径前缀
- 可以打开.zshrc 或者 .bashrc 将加载 nvm 部分先注释掉，重新开启终端检查

## 终端无法显示Emoji符号

- 终端无法Emoji符号，大概率是因为你的终端对于 emoji/unicode 字符支持较差，但是不影响提交
  因为最终输出提交的是 Emoji Code，可以考虑更换终端与[字体](https://github.com/ryanoasis/nerd-fonts)

## `cz-git` 和 `czg` 有什么不同

> 可以查看更多信息 [czg 的动机](/cli/why.html)

- 如果你使用 `cz` 或 `git cz` 命令将会启动 `commitizen` CLI ==+== `cz-git` 适配器
- 如果你使用 `czg` 或 `git czg` 命令只会启动 `czg` CLI
