import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'
import { descriptionEN, github, ogImg, site } from '../meta'
import nav from './navbar/en'
import sidebar from './sidebar/en'

export const enConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  description: descriptionEN,

  themeConfig: {
    nav,
    sidebar,
    docFooter: {
      prev: 'Previous page',
      next: 'Next page',
    },
    returnToTopLabel: 'Return to top',
    outlineTitle: 'On this page',
    darkModeSwitchLabel: 'Appearance',
    sidebarMenuLabel: 'Menu',
    lastUpdatedText: 'Last updated',
    editLink: {
      pattern: `${github}/edit/main/docs/:path`,
      text: 'Suggest changes to this page',
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
      copyright: `MIT Licensed | Copyright © 2022-${new Date().getFullYear()} <a target="_blank" href="https://github.com/Zhengqbbb">Zhengqbbb</a>`,
    },
  },

  head: [
    ['meta', { name: 'twitter:description', content: descriptionEN }],
    ['meta', { name: 'twitter:image', content: ogImg }],
    ['meta', { property: 'og:description', content: descriptionEN }],
    ['meta', { property: 'og:url', content: site }],
    ['meta', { property: 'og:locale', content: 'en_US' }],
    ['meta', { property: 'og:image', content: ogImg }],
  ],
}
