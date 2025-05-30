# OpenAI <Badge type="info" text="`gpt-4o-mini` Model「default」" /><Badge type="tip" text="Node.js >= 16.5.0+" />
Let the AI generate your **git commit message** subject <sup>(short description)</sup>

![demo-gif](https://user-images.githubusercontent.com/40693636/219867044-3ca9823d-9294-4e02-9a5b-624578844168.gif) <!-- size=720x309 -->

:::::info Have A Try
You can have a try **without setup your token to local** in any of your projects<br> Quick experience interaction. API Key: https://platform.openai.com/account/api-keys<br>

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

## Setup OpenAI token

1. https://platform.openai.com/account/api-keys <br>Login and create your API secret key, which usually starts with `sk-`
2. Run command `npx czg --api-key=<API secret key>` and input your key to setup your token save to local

:::: code-group
::: code-group-item NPX

```sh
npx czg --api-key=sk-xxxxx
```

:::
::: code-group-item BUNX

```sh
bunx czg --api-key=sk-xxxxx
```

:::
::: code-group-item After-global-install

```sh
czg --api-key=sk-xxxxx
```

:::
::::

:::details Setup GitHub Models
1. Join the GitHub Models [waitlist](https://github.com/marketplace/models/waitlist)
2. Get GitHub [personal access tokens](https://github.com/settings/tokens)
3. Choose the model you want to use from the [Models Marketplace](https://github.com/marketplace/models) and get the model name (click the Get started button to view information)
4. Run the command to configure
    ```sh
    npx czg --api-key="ghp_xxxxxx" --api-endpoint="https://models.inference.ai.azure.com" --api-model="gpt-4o-mini"
    ```
:::

:::details Setup DeepSeek
1. Get DeepSeek [API Key](https://platform.deepseek.com/api_keys)
2. Run the command to configure
    ```sh
    npx czg --api-key="sk-xxxxxx" --api-endpoint="https://api.deepseek.com" --api-model="deepseek-chat"
    ```
:::

:::details Setup Ollama
1. Install [Ollama](https://ollama.com/) and start the service
2. [Choose](https://ollama.com/library) and pull the model
    ```sh
    # Using gemma2 model as an example
    ollama pull gemma2
    # Confirm if the model is successfully pulled
    ollama ls
    ```
3. Run the command to configure
    ```sh
    npx czg --api-key=" " --api-endpoint="http://localhost:11434/v1" --api-model="gemma2"
    ```
:::

## As global usage

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
# setup your token `czg --api-key=sk-xxxxx`
# Run the following command in any of your projects after setup OpenAI token
czg ai
# Return multiple subjects, and choose the suitable answer
git czg ai -N=5
```

## As a dev dependency usage

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

1. Add script in `package.json`<br>
2. Try run `npm cz ai` | `yarn cz ai` | `pnpm cz ai` after setup token
```json
{
  "scripts": {
    "cz": "czg"
  }
}
```

## npx usage

- Run the following command in any of your projects after setup OpenAI token

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

> Return multiple subjects, and choose the suitable answer

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

## Commitizen CLI + cz-git usage

If you are currently using [Commitizen CLI](https://github.com/commitizen/cz-cli) with the cz-git adapter:

#### There are three ways to configure the OpenAI API Key:
1. Run `czg` to configure it: `npx czg --api-key=sk-xxxxx`
2. Pass it as an environment variable and start: `CZ_OPENAI_API_KEY="sk-xxxxx" czai=1 cz`
3. Configure it in an environment variable in your rc file: Add `export CZ_OPENAI_API_KEY="sk-xxxxx"` to `.zshrc` or `.bashrc`.

#### There are two ways to turn on AI mode:
1. Pass `czai=1` as an environment variable and start: `czai=1 cz`
2. Enable AI mode in the [configuration file](/config/engineer#useai): `useAI: true`

## Configure
- If you configure `useAI` to true, and you want to **switch to normal mode** not AI prompt mode in this session
  - czg CLI: `czg --no-ai`
  - Commitizen CLI + cz-git: `no_czai=1 cz`
- If you want to **customize the prompt words** sent to OpenAI (like support **i18n**), you can use [aiQuestionCB](/config/engineer#aiquestioncb) option
- The AI **configure options** information see : [Options - AI Related](/config/engineer#useai)
- About project or global support **configure file** information see: [Configure Template](/config/#configure-template)

## How to modify message After AI Generation

When the generation is complete and the confirmation message appears, press <kbd>m</kbd> <sup>(Modify)</sup> to re-enter the interactive prompt. <br>And the generated subject message will turn into a completion template, allowing you to adjust the message or add additional information.

![ai-modify-demo](https://static.qbb.sh/cz-git/ai-modify.webp) <!-- size=2384 × 2534 -->

## How it works

- Run git diff to obtain difference code information, combine prompt task, send them to **OpenAI API** - `/chat/completions`, Return the subjects information generated by AI.
- 💡 Inspired by [aicommits](https://github.com/Nutlope/aicommits) and modified part of the code
