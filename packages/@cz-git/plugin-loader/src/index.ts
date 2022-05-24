import "@commitlint/types";
import resolveExtends from "@commitlint/resolve-extends";
import { cosmiconfig } from "cosmiconfig";
import path from "path";

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
  return extended;
};

export const czLoader = async () => {
  const moduleName = "commitizen";
  const options = {
    moduleName,
    searchPlaces: ["package.json", ".czrc", ".cz.json"],
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
