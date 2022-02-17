/**
 * @from: @commitlint/cz-commitlint/src/utils/rules.ts
 */
import { RuleConfigCondition, RuleConfigSeverity } from "@commitlint/types";

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
    info: "\x1b[32m",
    warm: "\x1b[33m",
    err: "\x1b[31m",
    reset: "\x1b[0m"
  };
  console.log(`${colorMapping[type]}[${type}]»»»: ${msg}`);
}
