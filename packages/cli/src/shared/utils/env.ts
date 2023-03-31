/**
 * provide environment flag variable to cz-git
 */
export function injectEnvFlag(key: string, target?: boolean) {
  if (target)
    process.env[key] = '1'
}

/**
 * provide environment flag value to cz-git
 */
export function injectEnvValue(key: string, target?: string) {
  if (target)
    process.env[key] = target
}
