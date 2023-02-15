import '@commitlint/types'
import path from 'path'
import resolveExtends from '@commitlint/resolve-extends'
import { cosmiconfig } from 'cosmiconfig'
import type { RulesConfig } from '@commitlint/types'

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

export const loader = async (options: LoaderOptions) => {
  const cwd = options.cwd || process.cwd()
  const cosmiconfigFn = cosmiconfig(options.moduleName, {
    searchPlaces: options.searchPlaces || [],
    packageProp: options.packageProp || options.moduleName,
    stopDir: options.stopDir,
    ignoreEmptySearchPlaces: true,
    cache: true,
  })

  const resultPath = options.explicitPath ? path.resolve(cwd, options.explicitPath) : undefined
  const resultFn = resultPath ? cosmiconfigFn.load : cosmiconfigFn.search
  const searchPath = resultPath || cwd
  const result = await resultFn(searchPath)

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

export const clLoader = async (cwd?: string): Promise<CommitlintOptions> => {
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
      `${moduleName}.config.js`,
      `${moduleName}.config.cjs`,
    ],
    cwd,
  }
  const data = await loader(options)
  if (data === null)
    return {}

  // resolve extends
  const base = (data && data.filepath) ? path.dirname(data.filepath) : process.cwd()
  const extended = resolveExtends(data.config, {
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

export const czLoader = async (cwd?: string) => {
  const moduleName = 'cz'
  const options = {
    moduleName,
    searchPlaces: [
      `.${moduleName}rc`,
      `${moduleName}.config.js`,
      `${moduleName}.config.cjs`,
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
    data = await cosmiconfig('commitizen', {
      ignoreEmptySearchPlaces: true,
      cache: true,
    }).load(path.resolve(base, data.config.czConfig))
  }
  return await execute(data?.config || data || {}, true)
}

export const rootLoader = async () => {
  const cwd = process.env.HOME || process.env.USERPROFILE
  const options = {
    moduleName: '.czrc',
    searchPlaces: [
      '.czrc',
      '.config/.czrc',
    ],
    cwd,
    stopDir: cwd,
  }
  const data = await loader(options)
  return {
    openAIToken: data?.config?.openAIToken || '',
  }
}

export interface UserOptions {
  /** Debug mode path */
  cwd?: string
  /** Directly specify the configuration path */
  configPath?: string
}

/**
 * @description: Main Func: both loader commitizen config and commitlint config
 */
export const configLoader = async (options?: UserOptions) => {
  // provide cli config loader
  if (typeof options?.configPath === 'string') {
    const czData = await cosmiconfig('commitizen', {
      ignoreEmptySearchPlaces: true,
      cache: true,
    }).load(path.resolve(options.cwd || process.cwd(), options.configPath))
    return { prompt: await execute(czData?.config || czData || {}, true) }
  }
  else {
    return Promise.all([clLoader(options?.cwd), czLoader(options?.cwd), rootLoader()]).then(
      ([clData, czData, rootData]) => {
        const clPrompt = clData.prompt || {}
        return {
          ...clData,
          prompt: {
            ...czData,
            ...clPrompt,
            ...rootData,
          },
        }
      },
    )
  }
}
