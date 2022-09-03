import ora from 'ora'
import { optimizePages } from './optimizeAssert'
import { rebuildPWA } from './buildPWA'

const spinner = ora('\u001B[38;5;043mpost-build enchance pages...\u001B[0m 📦').start()

try {
  const start = Date.now()
  /**
   * enchance the page html
   */
  optimizePages()
  /**
  * pwa rebuild
  */
  rebuildPWA().then(() => {
    spinner.succeed(
      `\u001B[38;5;043mpost-build enchance pages success! ${((Date.now() - start) / 1000).toFixed(
        2,
      )}s\u001B[0m 🎉`,
    )
  })
}
catch (e) {
  spinner.fail(`post-build enchance pages failed: ${e}`)
}
