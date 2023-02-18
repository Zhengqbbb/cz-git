# OpenAI

让 AI 生成你的 git commit 提交信息简短描述

![demo-gif](https://user-images.githubusercontent.com/40693636/219867044-3ca9823d-9294-4e02-9a5b-624578844168.gif) <!-- size=686x309 -->

:::info 快速体验
利用 `npx` 填入 Token ，并在你的任何项目中运行下列命令进行体验<br>
**OpenAI API Token** 获取: https://platform.openai.com/account/api-keys

```sh
CZ_OPENAI_TOKEN="sk-xxxxx" npx czg ai
```
:::

## 设置 OpenAI token

1. https://platform.openai.com/account/api-keys <br>登陆并创建你的 OpenAI API 密钥，通常以 `sk-` 开头
2. 运行命令 `npx czg --openai-token=<API secret key>` 填入 OpenAI API 密钥完成设置

```sh
npx czg --openai-token=sk-xxxxx
```

## 全局使用

:::: code-group
::: code-group-item NPM

```sh
npm install -g czg
# 设置token `czg --openai-token=sk-xxxxx`
# 设置完token后，在你的任何项目中，运行下列命令
czg ai
# 返回多个简短描述，并开启选择模式
git czg ai -N=5
```

:::
::: code-group-item Homebrew

```sh
brew install czg
# 设置token `czg --openai-token=sk-xxxxx`
# 设置完token后，在你的任何项目中，运行下列命令
czg ai
# 返回多个简短描述，并开启选择模式
git czg ai -N=5
```

:::
::::

## 作为项目依赖使用

:::: code-group
::: code-group-item NPM

```sh
npm install -D czg
```

:::
::: code-group-item YARN

```sh
yarn add -D czg
```

:::
::: code-group-item PNPM

```sh
pnpm install -D czg
```

:::
::::

1. 在 `package.json` 中添加 `script`<br>
2. 在设置完 token 后运行启动命令 `npm cz ai` | `yarn cz ai` | `pnpm cz ai`
```json
{
  "scripts": {
    "cz": "czg"
  }
}
```

## `npx` 使用

- 在设置完 token 后，运行命令在你的任何项目中

```sh
npx czg ai
```

> 返回多个简短描述，并开启选择模式
```sh
npx czg ai -N=5
```

## 配置

- 如果你开启了配置 `useAI`，但是你不想使用 AI 模式，想切换为普通模式
  - czg CLI: `czg --no-ai`
  - Commitizen CLI + cz-git: `no_czai=1 cz`
- 如果你想自定义配置发起 OpenAI 请求的描述信息，像支持本地化，可以使用配置项进行更改 [aiQuestionCB](/zh/config/engineer#aiquestioncb)，例如：

```js
module.exports = {
  aiQuestionCB: ({ maxSubjectLength, diff }) => `用完整句子为以下 Git diff 代码写一个有见解并简洁的 Git 中文提交消息，不加任何前缀，并且内容不能超过 ${maxSubjectLength} 个字符: \`\`\`diff\n${diff}\n\`\`\``,
}
```
- 关于 AI 相关的配置信息 可查看 [Options - AI Related](/zh/config/engineer#useai)
- 关于项目或全局配置文件信息 可查看[Configure Template](/zh/config/#configure-template)

## 如何实现

- 运行 git diff 命令获取文件的差异，并结合描述信息，发送请求给 **OpenAI GPT-3 API**，来获取 AI 生成的简短描述
- 💡 灵感来源 [aicommits](https://github.com/Nutlope/aicommits) 并修改了部分代码
