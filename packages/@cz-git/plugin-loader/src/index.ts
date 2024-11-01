import '@commitlint/types'
import path from 'node:path'
import os from 'node:os'
import process from 'node:process'
import resolveExtends from '@commitlint/resolve-extends'
import { cosmiconfig } from 'cosmiconfig'
import type { RulesConfig } from '@commitlint/types'
import { esmTsLoader } from './esm-ts-loader'

type ExectableConfig<T> = (() => T) | (() => Promise<T>)
type Config<T> = T | Promise<T> | ExectableConfig<T>
type ExecutedConfig<T> = readonly [string, T]
interface CommitlintOptions {
    rules?: Partial<RulesConfig>
    prompt?: any
}

export interface LoaderOptions {
    moduleName: string
    cwd?: string
    stopDir?: string
    explicitPath?: string
    searchPlaces?: string[]
    packageProp?: string[]
}

const commonCosmiconfigOptions = {
    ignoreEmptySearchPlaces: true,
    cache: true,
    loaders: {
        '.ts': esmTsLoader(),
        '.cts': esmTsLoader(),
        '.mjs': esmTsLoader(),
        '.mts': esmTsLoader(),
    },
}

export async function loader(options: LoaderOptions) {
    const cwd = options.cwd || process.cwd()
    const cosmiconfigFn = cosmiconfig(options.moduleName, {
        searchPlaces: options.searchPlaces || [],
        packageProp: options.packageProp || options.moduleName,
        stopDir: options.stopDir,
        ...commonCosmiconfigOptions,
    })

    const resultPath = options.explicitPath ? path.resolve(cwd, options.explicitPath) : undefined
    const resultFn = resultPath ? cosmiconfigFn.load : cosmiconfigFn.search
    const searchPath = resultPath || cwd
    const result = await resultFn(searchPath) ?? await cosmiconfigFn.search(os.homedir())
    if (process.env.CZ_DEBUG)
        console.log(options.moduleName, 'config-file:', result?.filepath)
    return result ?? null
}

function executable<T>(config: Config<T>, name: string): config is ExectableConfig<T> {
    return typeof config === 'function' && !name.endsWith('CB')
}

async function configExecute<T>(
    isRule: boolean,
    configItem?: [string, Config<T>],
): Promise<ExecutedConfig<T> | null> {
    if (isRule && !Array.isArray(configItem))
        return null

    const [name, config] = configItem as [string, Config<T>]
    const fn = executable(config, name) ? config : async () => config
    return [name, await fn()]
}

async function execute<T>(config: Config<T>, isRule = true): Promise<T> {
    return (
        await Promise.all(Object.entries(config || {}).map(entry => configExecute(isRule, entry)))
    ).reduce((registry: any, item) => {
        const [key, value] = item!
        registry[key] = value
        return registry
    }, {})
}

export async function clLoader(cwd?: string): Promise<CommitlintOptions> {
    const moduleName = 'commitlint'
    const options = {
        moduleName,
        searchPlaces: [
            'package.json',
            `.${moduleName}rc`,
            `.${moduleName}rc.json`,
            `.${moduleName}rc.yaml`,
            `.${moduleName}rc.yml`,
            `.${moduleName}rc.js`,
            `.${moduleName}rc.cjs`,
            `.${moduleName}rc.mjs`,
            `.${moduleName}rc.ts`,
            `.${moduleName}rc.cts`,
            `.${moduleName}rc.mts`,
            `${moduleName}.config.js`,
            `${moduleName}.config.cjs`,
            `${moduleName}.config.mjs`,
            `${moduleName}.config.ts`,
            `${moduleName}.config.cts`,
            `${moduleName}.config.mts`,
        ],
        cwd,
    }
    const data = await loader(options)
    if (data === null)
        return {}

    // resolve extends
    const base = (data && data.filepath) ? path.dirname(data.filepath) : process.cwd()
    const extended = await resolveExtends(data.config, {
        prefix: 'commitlint-config',
        cwd: base,
    })

    return Promise.all([
        execute(extended.rules || {}, true),
        execute(extended.prompt || {}, false),
    ]).then(([rules, prompt]) => {
        return {
            rules: rules || {},
            prompt: prompt || {},
        }
    })
}

export async function czLoader(cwd?: string) {
    const moduleName = 'cz'
    const options = {
        moduleName,
        searchPlaces: [
            `.${moduleName}rc`,
            `${moduleName}.config.js`,
            `${moduleName}.config.cjs`,
            `${moduleName}.config.mjs`,
            `${moduleName}.config.ts`,
            `${moduleName}.config.cts`,
            `${moduleName}.config.mts`,
            'package.json',
        ],
        packageProp: ['config', 'commitizen'],
        cwd,
    }
    let data = await loader(options)
    if (!data)
        return {}
    if (typeof data.config.czConfig === 'string') {
        const base = (data && data.filepath) ? path.dirname(data.filepath) : process.cwd()
        data = await cosmiconfig('commitizen', commonCosmiconfigOptions)
            .load(path.resolve(base, data.config.czConfig))
    }
    return await execute(data?.config || data || {}, true)
}

export async function aiLoader() {
    const cwd = os.homedir()
    const options = {
        moduleName: 'ai',
        searchPlaces: [
            '.config/.czrc',
            '.czrc',
        ],
        cwd,
        stopDir: cwd,
    }
    const data = await loader(options)
    return {
        openAIToken: data?.config?.openAIToken || '',
        apiEndpoint: data?.config?.apiEndpoint || '',
        apiProxy: data?.config?.apiProxy || '',
        apiModel: data?.config?.apiModel || '',
    }
}

export interface UserOptions {
    /** Debug mode path */
    cwd?: string
    /** Directly specify the configuration path */
    configPath?: string
}

/**
 * @description Main Func: both loader commitizen config and commitlint config
 */
export async function configLoader(options?: UserOptions) {
    // provide cli config loader
    if (typeof options?.configPath === 'string') {
        const czData = await cosmiconfig('commitizen', commonCosmiconfigOptions)
            .load(path.resolve(options.cwd || process.cwd(), options.configPath))

        return { prompt: await execute(czData?.config || czData || {}, true) }
    }
    else {
        return Promise
            .all([clLoader(options?.cwd), czLoader(options?.cwd), aiLoader()])
            .then(([clData, czData, aiData]) => {
                const clPrompt = clData.prompt || {}
                return {
                    ...clData,
                    prompt: {
                        ...czData,
                        ...clPrompt,
                        ...aiData,
                    },
                }
            })
    }
}
