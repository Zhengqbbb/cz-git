import process from 'node:process'
import path from 'node:path'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { style } from 'cz-git'

export function setupAIConfig(token?: string, apiProxy?: string, unsetProxy?: boolean, apiEndpoint?: string, apiModel?: string) {
    const configDir = path.join(homedir(), '.config')
    const configFile = path.join(configDir, '.czrc')
    try {
        if (!existsSync(configDir))
            mkdirSync(configDir, { recursive: true })

        const config = { openAIToken: token, apiProxy, apiEndpoint, apiModel }
        if (!existsSync(configFile)) {
            writeFileSync(configFile, JSON.stringify(config), 'utf8')
        }
        else {
            const originConfig: typeof config = JSON.parse(readFileSync(configFile, 'utf8'))
            const result = {
                openAIToken: config.openAIToken || originConfig.openAIToken,
                apiProxy: config.apiProxy || originConfig.apiProxy,
                apiEndpoint: config.apiEndpoint || originConfig.apiEndpoint,
                apiModel: config.apiModel || originConfig.apiModel,
            }
            if (unsetProxy)
                delete result?.apiProxy
            writeFileSync(configFile, JSON.stringify(result), 'utf8')
        }
    }
    catch (e) {
        console.log(style.red('>>> Setup OpenAI API key failure. The sugguestion save $HOME/.czrc or $HOME/.config/.czrc as json format with "openAIToken" field'))
        console.error(e)
        process.exit(1)
    }
    console.log(style.green('>>> Setup OpenAI API key on'), style.underline(style.yellow(configFile)), style.green('successfully'))
}
