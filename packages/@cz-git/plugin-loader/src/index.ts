import type { QualifiedRules, Rule } from "@commitlint/types";
import "@commitlint/types";
import resolveExtends from "@commitlint/resolve-extends";
import { cosmiconfig } from "cosmiconfig";
import path from "path";

type ExectableConfig<T> = (() => T) | (() => Promise<T>);
type Config<T> = T | Promise<T> | ExectableConfig<T>;
type ExecutedRule<T> = readonly [string, T];

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

export async function execute<T = unknown>(rule?: Rule<T>): Promise<ExecutedRule<T> | null> {
  if (!Array.isArray(rule)) {
    return null;
  }

  const [name, config] = rule;

  const fn = executable(config) ? config : async () => config;

  return [name, await fn()];
}

function executable<T>(config: Config<T>): config is ExectableConfig<T> {
  return typeof config === "function";
}

export const clLoader = async () => {
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

  const rules = (
    await Promise.all(Object.entries(extended.rules || {}).map((entry) => execute(entry as any)))
  ).reduce<QualifiedRules>((registry, item) => {
    // type of `item` can be null, but Object.entries always returns key pair
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const [key, value] = item!;
    // @ts-ignore
    registry[key] = value;
    return registry;
  }, {});

  return {
    prompt: extended.prompt,
    rules: rules
  };
};

export const czLoader = async () => {
  const moduleName = "cz";
  const options = {
    moduleName,
    searchPlaces: [
      `.${moduleName}rc`,
      `.${moduleName}.json`,
      `.${moduleName}.js`,
      `${moduleName}.js`,
      `${moduleName}.config.js`,
      `${moduleName}.cjs`,
      "package.json"
    ],
    packageProp: ["config", "commitizen"]
  };
  const data = await loader(options);
  return data === null ? {} : data.config || data;
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
