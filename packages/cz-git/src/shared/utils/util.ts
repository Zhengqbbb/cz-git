/**
 * @description: provide until function
 * @author: @Zhengqbbb (zhengqbbb@gmail.com)
 * @license: MIT
 */

import { wrap } from "./wrap";
// @ts-ignore

import { Answers, CommitizenGitOptions, Option, ScopesType, StringCallback } from "..";

export function log(type: "info" | "warm" | "err", msg: string) {
  const colorMapping = {
    info: "\u001B[32m",
    warm: "\u001B[33m",
    err: "\u001B[31m",
    reset: "\u001B[0m"
  };
  console.info(`${colorMapping[type]}[${type}]>>>: ${msg}${colorMapping.reset}`);
}

export const getProcessSubject = (text: string) => {
  return text.replace(/(^[\s]+|[\s\.]+$)/g, "") ?? "";
};

const getEmojiStrLength = (options: CommitizenGitOptions, type?: string): number => {
  const item = options.types?.find((i: { value?: string }) => i.value === type);
  // space
  return item?.emoji ? item.emoji.length + 1 : 0;
};

const countLength = (target: number, typeLength: number, scope: number, emojiLength: number) =>
  target - typeLength - 2 - scope - emojiLength;

export const getMaxSubjectLength = (
  type: Answers["type"],
  scope: Answers["scope"],
  options: CommitizenGitOptions
) => {
  let optionMaxLength = Infinity;
  const typeLength = type?.length ? type.length : 0;
  const scopeLength = scope ? scope.length + 2 : 0;
  const emojiLength = options.useEmoji ? getEmojiStrLength(options, type) : 0;
  const maxHeaderLength = options?.maxHeaderLength ? options?.maxHeaderLength : Infinity;
  const maxSubjectLength = options?.maxSubjectLength ? options?.maxSubjectLength : Infinity;
  if (options?.maxHeaderLength === 0 || options?.maxSubjectLength === 0) {
    return 0;
  } else if (maxHeaderLength === Infinity) {
    return maxSubjectLength !== Infinity ? maxSubjectLength : Infinity;
  } else {
    optionMaxLength =
      countLength(maxHeaderLength, typeLength, scopeLength, emojiLength) < maxSubjectLength
        ? maxHeaderLength
        : maxSubjectLength;
  }
  return countLength(optionMaxLength, typeLength, scopeLength, emojiLength);
};

const filterCustomEmptyByOption = (
  target: {
    name: string;
    value: any;
  }[],
  allowCustom = true,
  allowEmpty = true
) => {
  target = allowCustom ? target : target.filter((i) => i.value !== "___CUSTOM___");
  return allowEmpty ? target : target.filter((i) => i.value !== false);
};

/**
 * @description: add separator custom empty
 */
export const handleCustomTemplate = (
  target: Array<{ name: string; value: string }>,
  cz: any,
  align = "top",
  emptyAlias = "empty",
  customAlias = "custom",
  allowCustom = true,
  allowEmpty = true,
  defaultValue = ""
) => {
  let result: Array<{ name: string; value: any }> = [
    { name: emptyAlias, value: false },
    { name: customAlias, value: "___CUSTOM___" },
    new cz.Separator()
  ];
  if (!Array.isArray(target)) {
    return result;
  } else if (defaultValue !== "") {
    // put the defaultValue to the top
    const targetIndex = target.findIndex((i) => i.value === defaultValue);
    if (targetIndex !== -1)
      target = [
        target[targetIndex],
        ...target.slice(0, targetIndex),
        ...target.slice(targetIndex + 1)
      ];
  }
  switch (align) {
    case "top":
      result = result.concat(target);
      break;
    case "bottom":
      result = target.concat(result.reverse());
      break;
    case "top-bottom":
      result = [{ name: emptyAlias, value: false }, new cz.Separator()]
        .concat(target)
        .concat([new cz.Separator(), { name: customAlias, value: "___CUSTOM___" }]);
      break;
    case "bottom-top":
      result = result = [{ name: customAlias, value: "___CUSTOM___" }, new cz.Separator()]
        .concat(target)
        .concat([new cz.Separator(), { name: emptyAlias, value: false }]);
      break;
    default:
      result = result.concat(target);
      break;
  }
  return filterCustomEmptyByOption(result, allowCustom, allowEmpty);
};

/**
 * @description: check scope list and issuePrefix is only single item
 */
export const isSingleItem = (allowCustom = true, allowEmpty = true, option: Array<any> = []) =>
  !allowCustom && !allowEmpty && Array.isArray(option) && option.length === 1;

/**
 * @description: handle scope configuration option into standard options
 * @param {ScopesType}
 * @returns {Option[]}
 */
export const handleStandardScopes = (scopes: ScopesType): Option[] => {
  return scopes.map((scope) => {
    return typeof scope === "string"
      ? { name: scope, value: scope }
      : !scope.value
      ? { value: scope.name, ...scope }
      : { value: scope.value, name: scope.name };
  });
};

export const getCurrentScopes = (
  scopes?: any[],
  scopeOverrides?: { [x: string]: any[] },
  answerType?: string
) => {
  let result = [];
  if (scopeOverrides && answerType && scopeOverrides[answerType]) {
    result = scopeOverrides[answerType];
  } else if (Array.isArray(scopes)) {
    result = scopes;
  }
  return result;
};

const addType = (type: string, colorize?: boolean) =>
  colorize ? `\u001B[32m${type}\u001B[0m` : type;

const addScope = (scope?: string, colorize?: boolean) => {
  const separator = ":";
  if (!scope) return separator;
  scope = colorize ? `\u001B[33m${scope}\u001B[0m` : scope;
  return `(${scope.trim()})${separator}`;
};

const addEmoji = (type: string, options: CommitizenGitOptions): string => {
  if (options.useEmoji && type !== "") {
    const itemSource = options.types?.concat(options.typesAppend || []) || [];
    const item = itemSource.find((i) => i.value === type);
    return item?.emoji ? ` ${item.emoji} ` : " ";
  } else {
    return " ";
  }
};

const addSubject = (subject?: string, colorize?: boolean) => {
  if (!subject) return "";
  subject = colorize ? `\u001B[36m${subject}\u001B[0m` : subject;
  return subject.trim();
};

const addBreaklinesIfNeeded = (value: string, breaklineChar = "|") =>
  value.split(breaklineChar).join("\n").valueOf();

const addFooter = (footer: string, footerPrefix = "", colorize?: boolean) => {
  if (footerPrefix === "") {
    return colorize ? `\n\n\u001B[32m${footer}\u001B[0m` : `\n\n${footer}`;
  }
  return colorize
    ? `\n\n\u001B[32m${footerPrefix} ${footer}\u001B[0m`
    : `\n\n${footerPrefix} ${footer}`;
};

export const buildCommit = (answers: Answers, options: CommitizenGitOptions, colorize = false) => {
  const wrapOptions = {
    trim: true,
    newLine: "\n",
    indent: "",
    width: options.breaklineNumber
  };
  const head =
    addType(answers.type ?? "", colorize) +
    addScope(answers.scope, colorize) +
    addEmoji(answers.type ?? "", options) +
    addSubject(answers.subject, colorize);
  const body = wrap(answers.body ?? "", wrapOptions);
  const breaking = wrap(answers.breaking ?? "", wrapOptions);
  const footer = wrap(answers.footer ?? "", wrapOptions);

  let result = head;
  if (body) {
    result += `\n\n${addBreaklinesIfNeeded(body, options.breaklineChar)}`;
  }
  if (breaking) {
    result += `\n\nBREAKING CHANGE :\n${addBreaklinesIfNeeded(breaking, options.breaklineChar)}`;
  }
  if (footer) {
    result += addFooter(footer, answers.footerPrefix, colorize);
  }
  return result;
};

export const getValueByCallBack = (
  target: CommitizenGitOptions,
  targetKey: Array<
    "defaultScope" | "defaultSubject" | "defaultBody" | "defaultFooterPrefix" | "defaultIssues"
  >
): CommitizenGitOptions => {
  if (targetKey.length === 0) return target;
  targetKey.forEach((key) => {
    if (!target[key]) return;
    if (typeof target[key] === "function" && typeof target[key] !== "string") {
      return (target[key] = (target?.[key] as StringCallback)?.call(undefined));
    }
  });
  return target;
};
