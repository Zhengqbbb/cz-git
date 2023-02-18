# czg ai

Let the AI generate your **git commit message** subject <sup>(short description)</sup>

![demo-gif](https://user-images.githubusercontent.com/40693636/219867044-3ca9823d-9294-4e02-9a5b-624578844168.gif) <!-- size=686x309 -->

## Synopsis

**`czg ai`** - Turn on OpenAI generate subject mode

:::info Preparation
Get your OpenAI API Key: https://platform.openai.com/account/api-keys<br>
```sh
czg --openai-token=sk-xxxxx
```
:::

## Options

| Shorthand, Name | Description |
| --- | --- | 
|  `-N=<number>`,`--ai-num=<number>` | Setting AI return number subjects and Turn on choose mode |
| `--no-ai` | Turn off AI prompt mode in this session |  
| `--openai-token=<token>` | Setup OpenAI API secret key to local (.config/.czrc) |

:::tip
more information and usage [⇒ see the recipes](/recipes/openai)
:::
