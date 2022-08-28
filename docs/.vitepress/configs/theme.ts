import type { DefaultTheme } from 'vitepress'
import { github, site } from '../meta'
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
  ],
  editLink: {
    pattern: `${github}/edit/main/docs/:path`,
    text: 'Suggest changes to this page',
  },
  localeLinks: {
    text: 'English',
    items: [{ text: '简体中文', link: `${site}/zh/` }],
  },
  algolia: {
    appId: 'QC8EFXZNC3',
    apiKey: 'bf9a47e8561e6b8ffdda0bf8595a2f5d',
    indexName: 'cz-git',
    searchParameters: {
      facetFilters: ['lang:en-US'],
    },
  },
  footer: {
    message: 'I just try my best to make thing well, Could you give a <a c-orange-5 target="_blank" href="https://github.com/Zhengqbbb/cz-git">star ⭐</a>',
    copyright: 'MIT Licensed | Copyright © 2022-present <a target="_blank" href="https://github.com/Zhengqbbb">Zhengqbbb</a>',
  },
  nav: nav.en,
  sidebar: sidebar.en,
}
