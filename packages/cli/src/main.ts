import process from 'node:process'
import { czg, generateHelp, setupAIConfig } from './generator'
import { resovleArgs } from './shared'

process.on('uncaughtException', (err) => {
    console.error(err.message || err)
    process.exit(1)
})

process.on('SIGINT', () => {
    process.exit(130) // 128 + SIGINT
})

/**
 * Main CLI Enter Point
 * @param environment use debug mode
 * @param {string[]} argv  Node.js process
 */
export function main(environment: any = {}, argv = process.argv) {
    const commandArgs = argv.slice(2, argv.length)
    // eslint-disable-next-line ts/no-require-imports
    const czgitVersion = require('../package.json').version
    const parsedArgs = resovleArgs(commandArgs)

    if (!parsedArgs.czgitArgs.subCommand && !parsedArgs.czgitArgs.flag) {
        czg(czgitVersion, parsedArgs, environment)
        return
    }

    if (parsedArgs.czgitArgs.flag) {
        const {
            help: printHelp,
            version: printVersion,
            'openai-token': openAIToken,
            'api-key': openAIAPIKey,
            'api-model': apiModel,
            'api-proxy': apiProxy,
            'api-endpoint': apiEndpoint,
            'unset-proxy': unsetProxy,
        } = parsedArgs.czgitArgs?.flag

        if (printHelp) {
            generateHelp(czgitVersion)
        }
        else if (printVersion) {
            console.log(czgitVersion)
            process.exit(0)
        }
        else if (openAIAPIKey || openAIToken || apiProxy || unsetProxy || apiEndpoint || apiModel) {
            setupAIConfig(openAIAPIKey || openAIToken, apiProxy, unsetProxy, apiEndpoint, apiModel)
            process.exit(0)
        }
    }
    else if (parsedArgs.czgitArgs.subCommand) {
        const { init: initMode } = parsedArgs.czgitArgs.subCommand
        if (initMode) {
            // TODO: init
            console.log('TODO: init')
            process.exit(0)
        }
    }

    if (parsedArgs.gitArgs.includes('-a') || parsedArgs.gitArgs.includes('--all'))
        process.env.CZ_ALL_CHANGE_MODE = '1'

    czg(czgitVersion, parsedArgs, environment)
}

main()
