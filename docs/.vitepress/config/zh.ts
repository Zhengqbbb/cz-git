import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'
import { descriptionCN, github, ogImgCN, siteCN } from '../meta'
import nav from './navbar/zh'
import sidebar from './sidebar/zh'

export const zhConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
    description: descriptionCN,

    themeConfig: {
        nav,
        sidebar,
        docFooter: {
            prev: '上一页',
            next: '下一页',
        },
        returnToTopLabel: '返回顶部',
        outlineTitle: '导航栏',
        darkModeSwitchLabel: '外观',
        sidebarMenuLabel: '归档',
        lastUpdatedText: '更新于',
        editLink: {
            pattern: `${github}/edit/main/docs/zh/:path`,
            text: '在 GitHub 上编辑此页',
        },
        algolia: {
            appId: 'QC8EFXZNC3',
            apiKey: 'bf9a47e8561e6b8ffdda0bf8595a2f5d',
            indexName: 'cz-git',
            placeholder: '搜索文档',
            translations: {
                button: {
                    buttonText: '搜索文档',
                },
            },
            searchParameters: {
                facetFilters: ['lang:zh-CN'],
            },
        },
        footer: {
            message: '我只是尽力将工具做得更好，如果可以的话欢迎给一个 <a c-orange-5 target="_blank" href="https://github.com/Zhengqbbb/cz-git">star ⭐</a>',
            copyright: `MIT Licensed | 版权所有 © 2022-${new Date().getFullYear()} <a target="_blank" href="https://github.com/Zhengqbbb">Zhengqbbb</a>`,
        },
    },

    head: [
        ['meta', { name: 'twitter:description', content: descriptionCN }],
        ['meta', { name: 'twitter:image', content: ogImgCN }],
        ['meta', { property: 'og:description', content: descriptionCN }],
        ['meta', { property: 'og:url', content: siteCN }],
        ['meta', { property: 'og:locale', content: 'zh_CN' }],
        ['meta', { property: 'og:image', content: ogImgCN }],
    ],
}
