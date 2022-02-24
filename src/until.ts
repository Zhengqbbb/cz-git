/**
 * @from: @commitlint/cz-commitlint/src/utils/rules.ts
 */
import { RuleConfigCondition, RuleConfigSeverity } from "@commitlint/types";
import fs from "fs";
import path from "path";
import wrap from "word-wrap";
// @ts-ignore
import editor from "editor";
import { open as tempOpen } from "temp";
import { Answers, CommitizenGitOptions, Option, ScopesType } from "./share";

export type Rule =
  | Readonly<[RuleConfigSeverity.Disabled]>
  | Readonly<[RuleConfigSeverity, RuleConfigCondition]>
  | Readonly<[RuleConfigSeverity, RuleConfigCondition, unknown]>;

/**
 * @description: rule is Disabled
 * @example: ruleIsDisabled([0]) => true
 * @example: ruleIsDisabled([2]) => false
 */
export function ruleIsDisabled(rule: Rule): rule is Readonly<[RuleConfigSeverity.Disabled]> {
  if (rule && Array.isArray(rule) && rule[0] === RuleConfigSeverity.Disabled) {
    return true;
  }
  return false;
}

/**
 * @description: rule is use
 * @example: ruleIsActive([0]) => false
 * @example: ruleIsActive([2]) => true
 */
export function ruleIsActive<T extends Rule>(
  rule: T
): rule is Exclude<T, Readonly<[RuleConfigSeverity.Disabled]>> {
  if (rule && Array.isArray(rule)) {
    return rule[0] > RuleConfigSeverity.Disabled;
  }
  return false;
}

/**
 * @description: rule is can ignore
 */
export function ruleIsNotApplicable(
  rule: Rule
): rule is
  | Readonly<[RuleConfigSeverity, "never"]>
  | Readonly<[RuleConfigSeverity, "never", unknown]> {
  if (rule && Array.isArray(rule)) {
    return rule[1] === "never";
  }
  return false;
}

/**
 * @description: rule is effect
 */
export function ruleIsApplicable(
  rule: Rule
): rule is
  | Readonly<[RuleConfigSeverity, "always"]>
  | Readonly<[RuleConfigSeverity, "always", unknown]> {
  if (rule && Array.isArray(rule)) {
    return rule[1] === "always";
  }
  return false;
}

export function enumRuleIsActive(
  rule: Rule
): rule is Readonly<[RuleConfigSeverity.Warning | RuleConfigSeverity.Error, "always", string[]]> {
  return (
    ruleIsActive(rule) && ruleIsApplicable(rule) && Array.isArray(rule[2]) && rule[2].length > 0
  );
}

export function getEnumList(rule: Rule): string[] {
  return rule && Array.isArray(rule) && Array.isArray(rule[2]) ? rule[2] : [];
}

/**
 * @example: getMaxLength(rules['max-header-length'] => 100)
 */
export function getMaxLength(rule?: Rule): number {
  if (rule && ruleIsActive(rule) && ruleIsApplicable(rule) && typeof rule[2] === "number") {
    return rule[2];
  }
  return Infinity;
}

/**
 * @example:  getMinLength(rules['min-header-length'] => 2)
 */
export function getMinLength(rule?: Rule): number {
  if (rule && ruleIsActive(rule) && ruleIsApplicable(rule) && typeof rule[2] === "number") {
    return rule[2];
  }
  return 0;
}

export function log(type: "info" | "warm" | "err", msg: string) {
  const colorMapping = {
    info: "\u001B[32m",
    warm: "\u001B[33m",
    err: "\u001B[31m",
    reset: "\u001B[0m"
  };
  console.log(`${colorMapping[type]}[${type}]>>>: ${msg}${colorMapping.reset}`);
}

export const getPreparedCommit = (context: string) => {
  let message = null;
  if (fs.existsSync(path.resolve(__dirname, "./.git/COMMIT_EDITMSG"))) {
    const prepared = fs.readFileSync(path.resolve(__dirname, "./.git/COMMIT_EDITMSG"), "utf-8");

    const preparedCommit = prepared
      .replace(/^#.*/gm, "")
      .replace(/^\s*[\r\n]/gm, "")
      .replace(/[\r\n]$/, "")
      .split(/\r\n|\r|\n/);

    if (preparedCommit.length && preparedCommit[0]) {
      if (context === "subject") [message] = preparedCommit;
      else if (context === "body" && preparedCommit.length > 1) {
        preparedCommit.shift();
        message = preparedCommit.join("|");
      }
    }
  }
  return message;
};

export const getProcessSubject = (text: string) => {
  return text.replace(/(^[\s]+|[\s\.]+$)/g, "") ?? "";
};

const getEmojiStrLength = (options: CommitizenGitOptions, type?: string): number => {
  const item = options.types?.find((i) => i.value === type);
  // space
  return item?.emoji ? item.emoji.length + 1 : 0;
};

export const getMaxSubjectLength = (
  type: Answers["type"],
  scope: Answers["scope"],
  options: CommitizenGitOptions
) => {
  let optionMaxLength = Infinity;
  const maxHeaderLength = options?.maxHeaderLength ? options?.maxHeaderLength : Infinity;
  const maxSubjectLength = options?.maxSubjectLength ? options?.maxSubjectLength : Infinity;
  if (options?.maxHeaderLength === 0 || options?.maxSubjectLength === 0) {
    return 0;
  } else if (maxHeaderLength === Infinity) {
    optionMaxLength = maxSubjectLength !== Infinity ? maxSubjectLength : Infinity;
  } else {
    optionMaxLength = maxHeaderLength < maxSubjectLength ? maxHeaderLength : maxSubjectLength;
  }
  return (
    optionMaxLength -
    (type?.length ? type.length : 0) -
    // `()`
    (scope ? scope.length + 2 : 0) -
    // `: `
    2 -
    (options.useEmoji ? getEmojiStrLength(options, type) : 0)
  );
};

const filterCustomEmptyByOption = (
  target: {
    name: string;
    value: any;
  }[],
  allowCustom = true,
  allowEmpty = true
) => {
  if (!Array.isArray(target) || target.length === 3 || target.length === 4) {
    return allowCustom ? target : target.filter((i) => i.value !== "___CUSTOM___");
  }
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
  allowEmpty = true
) => {
  let result: Array<{ name: string; value: any }> = [
    { name: emptyAlias, value: false },
    { name: customAlias, value: "___CUSTOM___" },
    new cz.Separator()
  ];
  if (!Array.isArray(target)) {
    return result;
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

const addType = (type: string, colorize?: boolean) =>
  colorize ? `\u001B[33m${type}\u001B[0m` : type;

const addScope = (scope?: string, colorize?: boolean) => {
  const separator = ":";
  if (!scope) return separator;
  scope = colorize ? `\u001B[35m${scope}\u001B[0m` : scope;
  return `(${scope.trim()})${separator}`;
};

const addEmoji = (type: string, options: CommitizenGitOptions): string => {
  if (options.useEmoji && type !== "") {
    const item = options.types?.find((i) => i.value === type);
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
    width: 100
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

export const editCommit = (
  answers: Answers,
  options: CommitizenGitOptions,
  cb: (message: string) => void
) => {
  tempOpen(undefined, (err, info) => {
    if (!err) {
      fs.writeSync(info.fd, buildCommit(answers, options));
      fs.close(info.fd, () => {
        editor(info.path, (code: number) => {
          if (code === 0) {
            const commitStr = fs.readFileSync(info.path, {
              encoding: "utf8"
            });
            cb(commitStr);
          } else {
            log(
              "warm",
              `Editor exit non zero. Commit message was:\n${buildCommit(answers, options)}`
            );
          }
        });
      });
    }
  });
};
