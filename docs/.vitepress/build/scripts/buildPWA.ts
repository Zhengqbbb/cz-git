import { resolveConfig } from 'vite'

export const rebuildPWA = async () => {
  const config = await resolveConfig({}, 'build', 'production')
  const pwaPlugin = config.plugins.find(i => i.name === 'vite-plugin-pwa')?.api
  if (pwaPlugin && pwaPlugin.generateSW && !pwaPlugin.disabled)
    await pwaPlugin.generateSW()
}
