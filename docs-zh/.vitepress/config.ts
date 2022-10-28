import { defineConfig } from 'vitepress'
import * as pageConfig from './configs'
import { optimizePages, rebuildPWA } from './build/scripts'

export default defineConfig({
  base: pageConfig.base,
  head: pageConfig.head,
  locales: pageConfig.locales,

  appearance: 'dark',
  themeConfig: pageConfig.themeConfig,
  markdown: pageConfig.markdownConfig,
  lastUpdated: true,
  useWebFonts: true,

  buildEnd: async () => {
    await optimizePages()
    await rebuildPWA()
  },
})
