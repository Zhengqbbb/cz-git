---
outline: [2, 3]
---

# OpenAI <Badge type="info" text="`gpt-4o-mini` 模型 「默认」" /><Badge type="tip" text="Node.js >= 16.5.0+" />

让 AI 生成你的 git commit 提交信息简短描述

![demo-gif](https://user-images.githubusercontent.com/40693636/219867044-3ca9823d-9294-4e02-9a5b-624578844168.gif) <!-- size=720x309 -->

:::::info 快速体验
利用 `npx` 填入 Token ，并在你的任何项目中运行下列命令进行体验<br>
**OpenAI API Token** 获取: https://platform.openai.com/account/api-keys

:::: code-group
::: code-group-item NPX

```sh
CZ_OPENAI_API_KEY="sk-xxxxx" npx czg ai
```

:::
::: code-group-item BUNX

```sh
CZ_OPENAI_API_KEY="sk-xxxxx" bunx czg ai
```

:::
::::

:::::

## 配置 OpenAI token

1. https://platform.openai.com/account/api-keys <br>登陆并创建你的 OpenAI API 密钥，通常以 `sk-` 开头
2. 运行命令 `npx czg --api-key=<API secret key>` 填入 OpenAI API 密钥完成设置

:::: code-group
::: code-group-item NPX

```sh
npx czg --api-key=sk-xxxxx

# 如果你在需要进行 socks5 或 http proxy 代理请求，可以添加选项 `--api-proxy` 进行代理配置
# npx czg --api-proxy="http://127.0.0.1:1080"
# 如果想要使用自定义托管的 OpenAI API 服务，可以设置 API 请求的 endpoint
# npx czg --api-endpoint="https://xxxxx.deno.dev/v1"
```

:::
::: code-group-item BUNX

```sh
bunx czg --api-key=sk-xxxxx

# 如果你在需要进行 socks5 或 http proxy 代理请求，可以添加选项 `--api-proxy` 进行代理配置
# bunx czg --api-proxy="http://127.0.0.1:1080"
# 如果想要使用自定义托管的 OpenAI API 服务，可以设置 API 请求的 endpoint
# bunx czg --api-endpoint="https://xxxxx.deno.dev/v1"
```

:::
::: code-group-item 全局下载之后

```sh
czg --api-key=sk-xxxxx

# 如果你在需要进行 socks5 或 http proxy 代理请求，可以添加选项 `--api-proxy` 进行代理配置
# czg --api-proxy="http://127.0.0.1:1080"
# 如果想要使用自定义托管的 OpenAI API 服务，可以设置 API 请求的 endpoint
# czg --api-endpoint="https://xxxxx.deno.dev/v1"
```

:::
::::

:::details DeepSeek 配置方式
1. 获取 DeepSeek [API Key](https://platform.deepseek.com/api_keys)
2. 运行命令进行配置
    ```sh
    npx czg --api-key="sk-xxxxxx" --api-endpoint="https://api.deepseek.com" --api-model="deepseek-v4-flash"
    ```
:::

:::details GitHub Models 配置方式
1. 加入 GitHub Models [候补名单](https://github.com/marketplace/models/waitlist)
2. 获取 GitHub [personal access tokens](https://github.com/settings/tokens)
3. 在 [Models Marketplace](https://github.com/marketplace/models) 中选择你想要使用的模型，获取模型名称 (点击右上角 Get started 按钮，查看信息)
4. 运行命令进行配置
    ```sh
    npx czg --api-key="ghp_xxxxxx" --api-endpoint="https://models.inference.ai.azure.com" --api-model="gpt-4o-mini"
    ```
:::

:::details Ollama 配置方式
1. 安装 [Ollama](https://ollama.com/) 并启动服务
2. [选择](https://ollama.com/library)并拉取模型
    ```sh
    # 以 gemma2 模型为例
    ollama pull gemma2
    # 确认模型是否拉取成功
    ollama ls
    ```
3. 运行命令进行配置
    ```sh
    npx czg --api-key=" " --api-endpoint="http://localhost:11434/v1" --api-model="gemma2"
    ```
:::

## 全局使用

:::: code-group
::: code-group-item NPM

```sh
npm install -g czg
```

:::
::: code-group-item Homebrew

```sh
brew install czg
```

:::
::::

```sh
# 设置token `czg --api-key=sk-xxxxx`
# 设置完token后，在你的任何项目中，运行下列命令
czg ai
# 返回多个简短描述，并开启选择模式
git czg ai -N=5
```


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

:::: code-group
::: code-group-item NPX

```sh
npx czg ai
```

:::
::: code-group-item BUNX

```sh
bunx czg ai
```

:::
::::

> 返回多个简短描述，并开启选择模式

:::: code-group
::: code-group-item NPX

```sh
npx czg ai -N=5
```

:::
::: code-group-item BUNX

```sh
bunx czg ai -N=5
```

:::
::::

## Commitizen CLI + cz-git 使用

如果你当前使用 [Commitizen CLI](https://github.com/commitizen/cz-cli) + cz-git 适配器

#### 有三种方式配置 OpenAI API Key：
1. 运行 `czg` 进行配置: `npx czg --api-key=sk-xxxxx`
2. 使用环境变量传入并启动：`CZ_OPENAI_API_KEY="sk-xxxxx" czai=1 cz`
3. 配置环境变量于 rc 文件之中：添加 `export CZ_OPENAI_API_KEY="sk-xxxxx"` 于 `.zshrc` 或 `.bashrc`

#### 有两种方式进行启动：
1. 使用环境变量传入 `czai=1` 并启动: `czai=1 cz`
2. [配置文件](/zh/config/engineer#useai)中使用开启 AI 模式： `useAI: true`


## 配置

- 国内用户如果无法访问 OpenAI API <br>可进行 proxy 代理设置后进行使用<br>
  或使用 [`--api-proxy`](/zh/cli/ai#%E9%80%89%E9%A1%B9) 进行代理配置
- 如果你开启了配置 `useAI`，但是本次你不想使用 AI 模式，想切换为普通模式，可以运行命令
  - czg CLI: `czg --no-ai`
  - Commitizen CLI + cz-git: `no_czai=1 cz`
- 如果你想自定义配置发起 OpenAI 请求的描述信息，像支持本地化，可以使用配置项进行更改 [aiQuestionCB](/zh/config/engineer#aiquestioncb)，例如：

```js
module.exports = {
  aiQuestionCB: ({ maxSubjectLength, diff }) => `用完整句子为以下 Git diff 代码写一个有见解并简洁的 Git 中文提交消息，不加任何前缀，并且内容不能超过 ${maxSubjectLength} 个字符: \`\`\`diff\n${diff}\n\`\`\``,
}
```
- 关于 AI 相关的配置信息 可查看 [Options - AI Related](/zh/config/engineer#useai)
- 关于项目或全局配置文件信息 可查看 [Configure Template](/zh/config/#configure-template)

## AI 生成后如何进行再编辑

在生成完成确认 message 时，按下 <kbd>m</kbd> <sup>(Modify)</sup>，会再次进入交互提示，此时生成的简短描述会变成补全模版，可自行调节文案或添加额外信息。

![ai-modify-demo](https://static.qbb.sh/cz-git/ai-modify.webp) <!-- size=2384 × 2534 -->

## 如何实现

- 运行 git diff 命令获取文件的差异，并结合描述信息，发送请求给 **OpenAI API** - `/v1/chat/completions`，来获取 AI 生成的简短描述
- 💡 灵感来源 [aicommits](https://github.com/Nutlope/aicommits) 并修改了部分代码
