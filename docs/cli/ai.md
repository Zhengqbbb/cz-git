# czg ai

Let the AI generate your **git commit message** subject <sup>(short description)</sup>

![demo-gif](https://user-images.githubusercontent.com/40693636/219867044-3ca9823d-9294-4e02-9a5b-624578844168.gif) <!-- size=720x309 -->

## Synopsis

**`czg ai`** - Turn on OpenAI generate subject mode

:::info Preparation
Get your OpenAI API Key: https://platform.openai.com/account/api-keys<br>
```sh
czg --api-key=sk-xxxxx
```
:::

## Options

| Shorthand, Name | Description |
| --- | --- | 
|  `-N=<number>`<br>`--ai-num=<number>` | Setting AI return number subjects and Turn on choose mode |
| `--no-ai` | Turn off AI prompt mode in this session |  
| `--api-key=<token>` | Setup OpenAI API secret key to local (.config/.czrc) |
| `--api-proxy=<proxy_URL>` | Setup request OpenAI API proxy to local (.config/.czrc)<br>e.g:<br> 1. `npx czg --api-proxy="socks5://127.0.0.1:1080"`<br>2. `npx czg --api-proxy="http://127.0.0.1:1080"`  |
| `--api-endpoint=<url>` | Setup request OpenAI API endpoint to local<br>Default `"https://api.openai.com/v1"`  |
| `--unset-proxy` | Unset request API proxy on local configure |

:::tip
more information and usage [⇒ see the recipes](/recipes/openai)
:::
