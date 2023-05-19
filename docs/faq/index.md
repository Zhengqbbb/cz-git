---
title: FAQ
sidebarDepth: 1
lastUpdated: true
sitemap:
    priority: 0.6
---

# FAQ

## Windows users use

- Windows users are advised not to use powershell, cmd for command line use
- because they are not based on the POSIX SHELL specification, i.e. not a standard terminal environment
- It is recommended not to use git-bash, because the terminal is not an interactive terminal, and the selection up and down will be effected
- **It is recommended to use Windows Terminal combined with WSL, you should also do the same in daily development and use**

## Cannot find command after global install

- Enter the command `npm prefix -g` to check whether the path of npm global download is in the root directory
- The high probability is because the global download path prefix of npm has been changed with nvm
- You can open .zshrc or .bashrc to comment out the loading nvm, and then reopen the terminal to check

## Terminal cannot display Emoji symbols

- The terminal cannot Emoji symbols, the high probability is because your terminal has poor support for emoji/unicode characters, but it does not affect the submission
   Because the final output is submitted by Emoji Code, you can consider changing the terminal and [font](https://github.com/ryanoasis/nerd-fonts)

## What is different between `cz-git` and `czg`

> See more [Why czg](/cli/why.html)

- If you using `cz` or `git cz` command will start `commitizen` CLI ==+== `cz-git` adapter
- If you using `czg` or `git czg` command will only start `czg` CLI

