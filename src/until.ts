/**
 * @from: @commitlint/cz-commitlint/src/utils/rules.ts
 */
import { RuleConfigCondition, RuleConfigSeverity } from "@commitlint/types";
import fs from "fs";
import path from "path";
// import wrap from "word-wrap";
import { Answers, CommitizenGitOptions } from "./share";

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
  console.log(`${colorMapping[type]}[${type}]>>>: ${msg}`);
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
  if (!options.maxHeaderWidth || !type?.length) return 100;
  return (
    options.maxHeaderWidth -
    type.length -
    2 -
    (scope ? scope.length + 2 : 0) -
    (options.useEmoji ? 2 : 0)
  );
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

export const buildCommit = (answers: Answers, options: CommitizenGitOptions, color: boolean) => {
  // const wrapOption = {
  //   trim: true,
  //   newLine: "\n",
  //   indent: "",
  //   width: 100
  // };
  const head =
    addType(answers.type ?? "", options, color) +
    addScope(answers.scope, color) +
    addSubject(answers.subject, color);
  return head;
};
