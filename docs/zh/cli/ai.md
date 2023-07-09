# czg ai

让 AI 生成你的 git commit 提交信息简短描述

![demo-gif](https://user-images.githubusercontent.com/40693636/219867044-3ca9823d-9294-4e02-9a5b-624578844168.gif) <!-- size=686x309 -->

## 概要

**`czg ai`** - 开启 OpenAI 生成简短描述模式

:::info 前置需要
获取 OpenAI API Key: https://platform.openai.com/account/api-keys<br>
```sh
czg --api-key=sk-xxxxx
```

---

```sh
# 如果你在需要进行 socks5 或 http proxy 代理请求，可以使用命令进行代理的设置
czg --api-proxy="http://127.0.0.1:1080"
# 如果想要使用自定义托管的 OpenAI API 服务，可以设置 API 请求的 endpoint
czg --api-endpoint="https://xxxxx.deno.dev/v1"
```
:::

## 选项

| Shorthand, Name | Description |
| --- | --- | 
|  `-N=<number>`,`--ai-num=<number>` | 设置指定的返回的结果个数，并开启选择模式 |
| `--no-ai` | 将当前会话的交互切换普通模式，关闭 AI 模式 |  
| `--api-key=<token>` | 设置 OpenAI API Key 于本地 (.config/.czrc) |
| `--api-proxy=<proxy_URL>` | 设置 Proxy 代理地址于本地 (.config/.czrc)<br>示例:<br> 1. `npx czg --api-proxy="socks5://127.0.0.1:1080"`<br>2. `npx czg --api-proxy="http://127.0.0.1:1080"`  |
| `--api-endpoint=<url>` | 设置 OpenAI API 请求端点于本地 (.config/.czrc)<br>默认 `"https://api.openai.com/v1"` |
| `--unset-proxy` | 移除本地设置的 Proxy 代理 |

:::tip
更多信息和使用方式, [⇒ 查看小窍门](/zh/recipes/openai)
:::
