---
title: 常见问题
sidebarDepth: 1
lastUpdated: true
---
# 常见问题
## 为什么做了这款插件
[cz-git 友好型 commitizen 的适配器，我的开发的心路历程](https://www.qbenben.com/post/2022/02/27/cz-git/)

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
## 为什么输出的 Emoji符号要放在 subject
- 我也知道会破坏最终输出格式的美观体验，但Emoji 放在 subject 是因为遵循 [Angular commit](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits) 规范不能放于 type 中
