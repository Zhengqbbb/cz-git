import type { DefaultTheme } from 'vitepress'
import { github, site, twitter } from '../meta'
import * as nav from './navbar'
import * as sidebar from './sidebar'

/**
 * Theme configs let you customize your theme.
 * @see https://vitepress.vuejs.org/config/theme-configs.html
 */
export const themeConfig: DefaultTheme.Config = {
  logo: {
    src: '/images/logo.png',
    alt: 'cz-git-logo',
  },
  socialLinks: [
    { icon: 'github', link: github },
    { icon: 'twitter', link: twitter },
  ],
  editLink: {
    pattern: `${github}/edit/main/docs-zh/:path`,
    text: '在 GitHub 上编辑此页',
  },
  localeLinks: {
    text: '简体中文',
    items: [{ text: 'English', link: site }],
  },
  algolia: {
    appId: 'QC8EFXZNC3',
    apiKey: 'bf9a47e8561e6b8ffdda0bf8595a2f5d',
    indexName: 'cz-git',
    searchParameters: {
      facetFilters: ['lang:zh-CN'],
    },
  },
  nav: nav.zh,
  sidebar: sidebar.zh,
}
