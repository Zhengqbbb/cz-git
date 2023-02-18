import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { homedir } from 'os'
import path from 'path'
import { style } from 'cz-git'

export const setupOpenAIToken = (token: string) => {
  const configDir = path.join(homedir(), '.config')
  const configFile = path.join(configDir, '.czrc')
  try {
    const config = { openAIToken: token }
    if (!existsSync(configDir))
      mkdirSync(configDir, { recursive: true })
    writeFileSync(configFile, JSON.stringify(config), 'utf8')
  }
  catch (e) {
    console.log(style.red('>>> Setup OpenAI API key. The sugguestion save $HOME/.czrc or $HOME/.config/.czrc as json format with "openAIToken" field'))
    console.error(e)
    process.exit(1)
  }
  console.log(style.green('>>> Setup OpenAI API key on'), style.underline(style.yellow(configFile)), style.green('successfully'))
}
