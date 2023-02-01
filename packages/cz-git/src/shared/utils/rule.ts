/**
 * @description: fork by "@commitlint/cz-commitlint/src/utils/" v16.2.1
 */

import type { RuleConfigCondition } from '../types'
import { RuleConfigSeverity } from '../types'

type Rule =
  | Readonly<[RuleConfigSeverity.Disabled]>
  | Readonly<[RuleConfigSeverity, RuleConfigCondition]>
  | Readonly<[RuleConfigSeverity, RuleConfigCondition, unknown]>

/**
 * @description: rule is Disabled
 * @example: ruleIsDisabled([0]) => true
 * @example: ruleIsDisabled([2]) => false
 */
export function ruleIsDisabled(rule: Rule): rule is Readonly<[RuleConfigSeverity.Disabled]> {
  if (rule && Array.isArray(rule) && rule[0] === RuleConfigSeverity.Disabled)
    return true

  return false
}

/**
 * @description: rule is Warning
 * @example: ruleIsDisabled([0]) => false
 * @example: ruleIsDisabled([1]) => true
 * @example: ruleIsDisabled([2]) => false
 */
export function ruleIsWarning(rule?: Rule): rule is Readonly<[RuleConfigSeverity.Disabled]> {
  if (rule && Array.isArray(rule) && rule[0] === RuleConfigSeverity.Warning)
    return true

  return false
}

/**
 * @description: rule is use
 * @example: ruleIsActive([0]) => false
 * @example: ruleIsActive([2]) => true
 */
export function ruleIsActive<T extends Rule>(
  rule: T | undefined,
): rule is Exclude<T, Readonly<[RuleConfigSeverity.Disabled]>> {
  if (rule && Array.isArray(rule))
    return rule[0] > RuleConfigSeverity.Disabled

  return false
}

/**
 * @description: rule is effect.
 */
export function ruleIsNotApplicable(
  rule: Rule,
): rule is
  | Readonly<[RuleConfigSeverity, 'never']>
  | Readonly<[RuleConfigSeverity, 'never', unknown]> {
  if (rule && Array.isArray(rule))
    return rule[1] === 'never'

  return false
}

/**
 * @description: rule is not can be ignore
 */
export function ruleIsApplicable(
  rule: Rule,
): rule is
  | Readonly<[RuleConfigSeverity, 'always']>
  | Readonly<[RuleConfigSeverity, 'always', unknown]> {
  if (rule && Array.isArray(rule))
    return rule[1] === 'always'

  return false
}

export function enumRuleIsActive(
  rule: Rule | undefined,
): rule is Readonly<[RuleConfigSeverity.Warning | RuleConfigSeverity.Error, 'always', string[]]> {
  return (
    ruleIsActive(rule) && ruleIsApplicable(rule) && Array.isArray(rule[2]) && rule[2].length > 0
  )
}

export function getEnumList(rule: Rule | undefined): string[] {
  return (rule && Array.isArray(rule) && Array.isArray(rule[2])) ? rule[2] : []
}

export function emptyRuleIsActive(rule: Rule | undefined): boolean {
  return (rule && Array.isArray(rule)) ? (ruleIsActive(rule) && ruleIsNotApplicable(rule)) : false
}

/**
 * @example: getMaxLength(rules['max-header-length'] => 100)
 */
export function getMaxLength(rule?: Rule): number {
  if (rule && ruleIsActive(rule) && ruleIsApplicable(rule) && typeof rule[2] === 'number')
    return rule[2]

  return Infinity
}

/**
 * @example:  getMinLength(rules['min-header-length'] => 2)
 */
export function getMinLength(rule?: Rule): number {
  if (rule && ruleIsActive(rule) && ruleIsApplicable(rule) && typeof rule[2] === 'number')
    return rule[2]

  return 0
}
