/**
 * @description: fork by "word-wrap" v1.2.3"
 */

function identity(str: string) {
  return str;
}

interface Options {
  width?: number;
  indent?: string;
  newline?: string;
  escape?: (str: string) => string;
  trim?: boolean;
  cut?: boolean;
}

export const wrap = (str: string, options: Options) => {
  options = options || {};
  if (str == null) {
    return str;
  }

  const width = options.width || 50;
  const indent = typeof options.indent === "string" ? options.indent : "";

  const newline = options.newline || "\n" + indent;
  const escape = typeof options.escape === "function" ? options.escape : identity;

  let regexString = ".{1," + width + "}";
  if (options.cut !== true) {
    regexString += "([\\s\u200B]+|$)|[^\\s\u200B]+?([\\s\u200B]+|$)";
  }

  const re = new RegExp(regexString, "g");
  const lines = str.match(re) || [];
  let result =
    indent +
    lines
      .map(function (line) {
        if (line.slice(-1) === "\n") {
          line = line.slice(0, line.length - 1);
        }
        return escape(line);
      })
      .join(newline);

  if (options.trim === true) {
    result = result.replace(/[ \t]*$/gm, "");
  }
  return result;
};
