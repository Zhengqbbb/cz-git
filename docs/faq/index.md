---
title: FAQ
sidebarDepth: 1
lastUpdated: true
sitemap:
    priority: 0.6
---

# FAQ

## Error: require() of ES Module ... not supported

1. If you are an ESM project (i.e., `"type": "module"` in package.json),
    - You can try changing the [configuration name](/config/) from `.js` to `.cjs`.
2. If you are using commitlint version (> 18),
    - For example, configuring `extends: ['@commitlint/config-conventional']`,
    - Please upgrade cz-git or czg to the latest version.

## Can I customize the message format ?

1. The configuration contains most of the message format fine-tuning requirements, such as changing the emoji position with [emojiAlign](/config/show#emojialign).
2. [formatMessageCB](/config/engineer#formatmessagecb): It is the final format callback function. You can configure it to achieve the message format you need.

## Configure load not as expected

Run the command to check the path of the configuration load

```sh
# commitizen cli
CZ_DEBUG=1 cz
# czg cli
CZ_DEBUG=1 czg
```

## Opening a like `vim` editor in git hooks mode

> The `prepare-commit-msg` githook opens an editor after the commit message has been prepared [=> githooks man](https://git-scm.com/docs/githooks#_prepare_commit_msg)

1. Changing the default editor from `vi` to `cat`
    ```sh
    git config --local core.editor cat
    ```
2. Adding package scripts initialization script `prepare` or pnpm's `postinstall` to assist other contributors with initialization
    ```diff
    {
      "scripts": {
    -    "prepare": "husky install"
    +    "prepare": "husky install && git config --local core.editor cat"
      }
    }
    ```


## Cannot find the command after global install

- Enter the command `npm prefix -g` to check whether the bin folder path of npm's global download is added to the system environment variable `$PATH`.
- Most likely because using nvm changed the npm global download path prefix, but the system environment variable was not recorded.

## Terminal cannot display Emoji symbols

- The terminal cannot Emoji symbols, the high probability is because your terminal has poor support for emoji/unicode characters, but it does not affect the submission
   Because the final output is submitted by Emoji Code, you can consider changing the terminal and [font](https://github.com/ryanoasis/nerd-fonts)

## What is different between `cz-git` and `czg`

> See more [Why czg](/cli/why.html)

- If you using `cz` or `git cz` command will start `commitizen` CLI ==+== `cz-git` adapter
- If you using `czg` or `git czg` command will only start `czg` CLI

