import "@commitlint/types";
import resolveExtends from "@commitlint/resolve-extends";
import { cosmiconfig } from "cosmiconfig";
import path from "path";
import type { RulesConfig } from "@commitlint/types";

type ExectableConfig<T> = (() => T) | (() => Promise<T>);
type Config<T> = T | Promise<T> | ExectableConfig<T>;
type ExecutedConfig<T> = readonly [string, T];
type CommitlintOptions = {
  rules?: Partial<RulesConfig>;
  prompt?: any;
};

export interface LoaderOptions {
  moduleName: string;
  cwd?: string;
  stopDir?: string;
  explicitPath?: string;
  searchPlaces?: string[];
  packageProp?: string[];
}

export const loader = async (options: LoaderOptions) => {
  const cwd = options.cwd || process.cwd();
  const cosmiconfigFn = cosmiconfig(options.moduleName, {
    searchPlaces: options.searchPlaces || [],
    packageProp: options.packageProp || options.moduleName,
    stopDir: options.stopDir,
    ignoreEmptySearchPlaces: true,
    cache: true
  });

  const resultPath = options.explicitPath ? path.resolve(cwd, options.explicitPath) : undefined;
  const resultFn = resultPath ? cosmiconfigFn.load : cosmiconfigFn.search;
  const searchPath = resultPath ? resultPath : cwd;
  const result = await resultFn(searchPath);

  return result ?? null;
};

function executable<T>(config: Config<T>): config is ExectableConfig<T> {
  return typeof config === "function";
}

async function configExecute<T>(
  isRule: boolean,
  configItem?: [string, Config<T>]
): Promise<ExecutedConfig<T> | null> {
  if (isRule && !Array.isArray(configItem)) {
    return null;
  }
  const [name, config] = configItem as [string, Config<T>];
  const fn = executable(config) ? config : async () => config;
  return [name, await fn()];
}

async function execute<T>(config: Config<T>, isRule = true): Promise<T> {
  return (
    await Promise.all(Object.entries(config || {}).map((entry) => configExecute(isRule, entry)))
  ).reduce((registry: any, item) => {
    const [key, value] = item!;
    registry[key] = value;
    return registry;
  }, {});
}

export const clLoader = async (): Promise<CommitlintOptions> => {
  const moduleName = "commitlint";
  const options = {
    moduleName,
    searchPlaces: [
      "package.json",
      `.${moduleName}rc`,
      `.${moduleName}rc.json`,
      `.${moduleName}rc.yaml`,
      `.${moduleName}rc.yml`,
      `.${moduleName}rc.js`,
      `.${moduleName}rc.cjs`,
      `${moduleName}.config.js`,
      `${moduleName}.config.cjs`
    ]
  };
  const data = await loader(options);
  if (data === null) return {};

  // resolve extends
  const extended = resolveExtends(data.config, {
    prefix: "commitlint-config",
    cwd: data.filepath
  });

  return Promise.all([
    execute(extended.rules || {}, true),
    execute(extended.prompt || {}, false)
  ]).then(([rules, prompt]) => {
    return {
      rules: rules || {},
      prompt: prompt || {}
    };
  });
};

export const czLoader = async () => {
  const moduleName = "cz";
  const options = {
    moduleName,
    searchPlaces: [
      `.${moduleName}rc`,
      `.${moduleName}.json`,
      `.${moduleName}.js`,
      `${moduleName}.config.js`,
      "package.json"
    ],
    packageProp: ["config", "commitizen"]
  };
  let data = await loader(options);
  if (!data) return {};
  if (typeof data.config.czConfig === "string") {
    data = await cosmiconfig("commitizen", {
      ignoreEmptySearchPlaces: true,
      cache: true
    }).load(path.resolve(process.cwd(), data.config.czConfig));
  }
  return await execute(data?.config || data || {}, true);
};

/**
 * @description: Main Func: both loader commitizen config and commitlint config
 */
export const configLoader = async () => {
  return Promise.all([clLoader(), czLoader()]).then(([clData, czData]) => {
    const clPrompt = clData.prompt || {};
    return {
      ...clData,
      prompt: {
        ...czData,
        ...clPrompt
      }
    };
  });
};
