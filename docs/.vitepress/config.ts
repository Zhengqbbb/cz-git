import { defineConfig } from 'vitepress'
import * as pageConfig from './configs'
import { generateSitemap, optimizePages, rebuildPWA } from './build/scripts'

export default defineConfig({
  base: pageConfig.base,
  head: pageConfig.head,
  locales: pageConfig.locales,

  markdown: pageConfig.markdownConfig,
  themeConfig: pageConfig.themeConfig,
  lastUpdated: true,

  buildEnd: async () => {
    await generateSitemap()
    await optimizePages()
    await rebuildPWA()
  },
})
