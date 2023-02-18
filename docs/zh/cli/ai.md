# czg ai

## 概要

**`czg ai`** - 开启 OpenAI 生成简短描述模式

:::info 前置需要
获取 OpenAI API Key: https://platform.openai.com/account/api-keys<br>
```sh
czg --openai-token=sk-xxxxx
```
:::

## 选项

| Shorthand, Name | Description |
| --- | --- | 
|  `-N=<number>`,`--ai-num=<number>` | 设置指定的返回的结果个数，并开启选择模式 |
| `--no-ai` | 在当前会话切换普通模式，关闭 AI 模式 |  
| `--openai-token=<token>` | 设置 OpenAI API 密钥于本地 (.config/.czrc) |

:::tip
更多信息和使用方式, [⇒ 查看小窍门](/zh/recipes/openai)
:::
