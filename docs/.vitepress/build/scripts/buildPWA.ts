import { resolveConfig } from 'vite'
import { optimizePages } from './optimizeAssert'

/** when `vite-plugin-pwa` is presented, use it to regenerate SW after rendering */
export const rebuildPWA = async () => {
  const config = await resolveConfig({}, 'build', 'production')
  const pwaPlugin = config.plugins.find(i => i.name === 'vite-plugin-pwa')?.api
  if (pwaPlugin && pwaPlugin.generateSW && !pwaPlugin.disabled) {
    await optimizePages()
    await pwaPlugin.generateSW()
    console.log('\x1B[32m✓\x1B[0m regenerate PWA ServiceWorker... \x1B[90m[buildEnd]\x1B[0m')
  }
}
