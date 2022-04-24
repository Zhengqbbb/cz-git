/**
 * @description: fork by "@cz-cli" v4.2.4
 */
import fs from "fs";
import path from "path";
import glob from "glob";
import stripJSONComments from "strip-json-comments";
// Configuration sources in priority order.
const configs = [".czrc", ".cz.json", "package.json"];

export function commitizenConfigLoader(config?: string, cwd?: string): any {
  return loader(configs, config, cwd);
}

/**
 * Command line config helpers
 * Shamelessly ripped from with slight modifications:
 * https://github.com/jscs-dev/node-jscs/blob/master/lib/cli-config.js
 */
/**
 * Get content of the configuration file
 * @param {String} config - partial path to configuration file
 * @param {String} [cwd = process.cwd()] - directory path which will be joined with config argument
 * @return {Object|undefined}
 */
function loader(configs: string[], config?: string, cwd?: string): object | undefined {
  const directory = cwd || process.cwd();

  // If config option is given, attempt to load it
  if (config) {
    return getContent(config, directory);
  }

  let content = getContent(
    findup(configs, { nocase: true, cwd: directory }, function (configPath: string) {
      if (path.basename(configPath) === "package.json") {
        // return !!this.getContent(configPath);
      }

      return true;
    })
  );

  if (content) {
    return content;
  }
  /* istanbul ignore if */
  if (!isInTest()) {
    // Try to load standard configs from home dir
    const directoryArr = [process.env.USERPROFILE, process.env.HOMEPATH, process.env.HOME];
    for (let i = 0, dirLen = directoryArr.length; i < dirLen; i++) {
      if (!directoryArr[i]) {
        continue;
      }

      for (let j = 0, len = configs.length; j < len; j++) {
        content = getContent(configs[j], directoryArr[i]);

        if (content) {
          return content;
        }
      }
    }
  }
}

// Before, "findup-sync" package was used,
// but it does not provide filter callback
function findup(patterns: string[], options: any, fn: any): any {
  /* jshint -W083 */

  let lastpath;
  let file;

  options = Object.create(options);
  options.maxDepth = 1;
  options.cwd = path.resolve(options.cwd);

  do {
    file = patterns.filter(function (pattern: string) {
      const configPath = glob.sync(pattern, options)[0];

      if (configPath) {
        return fn(path.join(options.cwd, configPath));
      }
    })[0];

    if (file) {
      return path.join(options.cwd, file);
    }

    lastpath = options.cwd;
    options.cwd = path.resolve(options.cwd, "..");
  } while (options.cwd !== lastpath);
}

/**
 * Get content of the configuration file
 * @param {String} configPath - partial path to configuration file
 * @param {String} directory - directory path which will be joined with config argument
 * @return {Object}
 */
function getContent(configPath: string, baseDirectory?: string) {
  if (!configPath) {
    return;
  }

  const resolvedPath = path.resolve(baseDirectory || "", configPath);
  const configBasename = path.basename(resolvedPath);

  if (!fs.existsSync(resolvedPath)) {
    return getNormalizedConfig(resolvedPath);
  }

  const content = readConfigContent(resolvedPath);
  return getNormalizedConfig(configBasename, content);
}

function getNormalizedConfig(config: string, content?: any) {
  if (content && config === "package.json") {
    // PACKAGE.JSON

    // Use the npm config key, be good citizens
    if (content.config && content.config.commitizen) {
      return content.config.commitizen;
    } else if (content.czConfig) {
      // Old method, will be deprecated in 3.0.0

      // Suppress during test
      if (typeof global.it !== "function") {
        console.error(
          '\n********\nWARNING: This repository\'s package.json is using czConfig. czConfig will be deprecated in Commitizen 3. \nPlease use this instead:\n{\n  "config": {\n    "commitizen": {\n      "path": "./path/to/adapter"\n    }\n  }\n}\nFor more information, see: http://commitizen.github.io/cz-cli/\n********\n'
        );
      }
      return content.czConfig;
    }
  } else {
    // .cz.json or .czrc
    return content;
  }
}

/**
 * Read the content of a configuration file
 * - if not js or json: strip any comments
 * - if js or json: require it
 * @param {String} configPath - full path to configuration file
 * @return {Object}
 */
function readConfigContent(configPath: string): any {
  const parsedPath = path.parse(configPath);
  const isRcFile = parsedPath.ext !== ".js" && parsedPath.ext !== ".json";
  const jsonString = readConfigFileContent(configPath);
  const parse = isRcFile
    ? (contents: any) => JSON.parse(stripJSONComments(contents))
    : (contents: any) => JSON.parse(contents);

  try {
    const parsed = parse(jsonString);

    Object.defineProperty(parsed, "configPath", {
      value: configPath
    });

    return parsed;
  } catch (error: any) {
    error.message = [
      `Parsing JSON at ${configPath} for commitizen config failed:`,
      error.mesasge
    ].join("\n");

    throw error;
  }
}

/**
 * Read proper content from config file.
 * If the chartset of the config file is not utf-8, one error will be thrown.
 * @param {String} configPath
 * @return {String}
 */
function readConfigFileContent(configPath: string) {
  const rawBufContent = fs.readFileSync(configPath);

  if (!isUtf8(rawBufContent)) {
    throw new Error(`The config file at "${configPath}" contains invalid charset, expect utf8`);
  }

  return stripBom(rawBufContent.toString("utf8"));
}

function isInTest() {
  return typeof global.it === "function";
}

function stripBom(string: string): string {
  if (typeof string !== "string") {
    throw new TypeError(`Expected a string, got ${typeof string}`);
  }

  // Catches EFBBBF (UTF-8 BOM) because the buffer-to-string
  // conversion translates it to FEFF (UTF-16 BOM).
  if (string.charCodeAt(0) === 0xfeff) {
    return string.slice(1);
  }

  return string;
}

/**
 * Check if a Node.js Buffer or Uint8Array is UTF-8.
 */
function isUtf8(buf: Buffer | Uint8Array): boolean {
  if (!buf) {
    return false;
  }
  let i = 0;
  const len = buf.length;
  while (i < len) {
    // UTF8-1 = %x00-7F
    if (buf[i] <= 0x7f) {
      i++;
      continue;
    }
    // UTF8-2 = %xC2-DF UTF8-tail
    if (buf[i] >= 0xc2 && buf[i] <= 0xdf) {
      // if(buf[i + 1] >= 0x80 && buf[i + 1] <= 0xBF) {
      if (buf[i + 1] >> 6 === 2) {
        i += 2;
        continue;
      } else {
        return false;
      }
    }
    // UTF8-3 = %xE0 %xA0-BF UTF8-tail
    // UTF8-3 = %xED %x80-9F UTF8-tail
    if (
      ((buf[i] === 0xe0 && buf[i + 1] >= 0xa0 && buf[i + 1] <= 0xbf) ||
        (buf[i] === 0xed && buf[i + 1] >= 0x80 && buf[i + 1] <= 0x9f)) &&
      buf[i + 2] >> 6 === 2
    ) {
      i += 3;
      continue;
    }
    // UTF8-3 = %xE1-EC 2( UTF8-tail )
    // UTF8-3 = %xEE-EF 2( UTF8-tail )
    if (
      ((buf[i] >= 0xe1 && buf[i] <= 0xec) || (buf[i] >= 0xee && buf[i] <= 0xef)) &&
      buf[i + 1] >> 6 === 2 &&
      buf[i + 2] >> 6 === 2
    ) {
      i += 3;
      continue;
    }
    // UTF8-4 = %xF0 %x90-BF 2( UTF8-tail )
    //          %xF1-F3 3( UTF8-tail )
    //          %xF4 %x80-8F 2( UTF8-tail )
    if (
      ((buf[i] === 0xf0 && buf[i + 1] >= 0x90 && buf[i + 1] <= 0xbf) ||
        (buf[i] >= 0xf1 && buf[i] <= 0xf3 && buf[i + 1] >> 6 === 2) ||
        (buf[i] === 0xf4 && buf[i + 1] >= 0x80 && buf[i + 1] <= 0x8f)) &&
      buf[i + 2] >> 6 === 2 &&
      buf[i + 3] >> 6 === 2
    ) {
      i += 4;
      continue;
    }
    return false;
  }
  return true;
}
