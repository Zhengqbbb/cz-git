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
 * Check if a rule definition is active
 * @param rule to check
 * @return if the rule definition is active
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
 * Check if a rule definition is applicable
 * @param rule to check
 * @return if the rule definition is applicable
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

/**
 * @example: getMaxLength(rules['max-line-length'])
 */
export function getMaxLength(rule?: Rule): number {
  if (rule && ruleIsActive(rule) && ruleIsApplicable(rule) && typeof rule[2] === "number") {
    return rule[2];
  }
  return Infinity;
}

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

export const getMaxSubjectLength = (
  type: Answers["type"],
  scope: Answers["scope"],
  options: CommitizenGitOptions
) => {
  return (
    (options?.maxSubjectLength ? options?.maxSubjectLength : 100) -
    (type?.length ? type.length : 0) -
    // `: `
    2 -
    // `()`
    (scope ? scope.length + 2 : 0) -
    (options.useEmoji ? 2 : 0)
  );
};

/**
 * @description: handle scope configuration option into standard options
 * @param {ScopesType}
 * @returns {Option[]}
 */
export const handleScopes = (scopes: ScopesType): Option[] => {
  return scopes.map((scope) => {
    return typeof scope === "string"
      ? { name: scope, value: scope }
      : !scope.value
      ? { value: scope.name, ...scope }
      : { value: scope.value, name: scope.name };
  });
};

const addType = (type: string, options: CommitizenGitOptions, color?: boolean) => {
  type = color ? `\u001B[33m${type}\u001B[0m` : type;
  if (options.useEmoji) {
    const item = options.types?.find((i) => i.value === type);
    return item?.emoji ? `${item.emoji} ${type}` : type;
  } else {
    return type;
  }
};

const addScope = (scope?: string, color?: boolean) => {
  const separator = ": ";
  if (!scope) return separator;
  scope = color ? `\u001B[35m${scope}\u001B[0m` : scope;
  return `(${scope.trim()})${separator}`;
};

const addSubject = (subject?: string, color?: boolean) => {
  if (!subject) return "";
  subject = color ? `\u001B[36m${subject}\u001B[0m` : subject;
  return subject.trim();
};

const addBreaklinesIfNeeded = (value: string, breaklineChar = "|") =>
  value.split(breaklineChar).join("\n").valueOf();

const addFooter = (footer: string, footerPrefixsSelect = "", color?: boolean) => {
  if (footerPrefixsSelect === "") {
    return color ? `\n\n\u001B[32m${footer}\u001B[0m` : `\n\n${footer}`;
  }
  return color
    ? `\n\n\u001B[32m${footerPrefixsSelect} ${footer}\u001B[0m`
    : `\n\n${footerPrefixsSelect} ${footer}`;
};

export const buildCommit = (answers: Answers, options: CommitizenGitOptions, color = false) => {
  const wrapOptions = {
    trim: true,
    newLine: "\n",
    indent: "",
    width: 100
  };
  const head =
    addType(answers.type ?? "", options, color) +
    addScope(answers.scope, color) +
    addSubject(answers.subject, color);
  const body = wrap(answers.body ?? "", wrapOptions);
  const breaking = wrap(answers.breaking ?? "", wrapOptions);
  const footer = wrap(answers.footer ?? "", wrapOptions);

  let result = head;
  if (body) {
    // TODO: options.breaklineChar => prams
    result += `\n\n${addBreaklinesIfNeeded(body)}`;
  }
  if (breaking) {
    result += `\n\nBREAKING CHANGE :\n${addBreaklinesIfNeeded(breaking)}`;
  }
  if (footer) {
    result += addFooter(footer, answers.footerPrefixsSelect, color);
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
