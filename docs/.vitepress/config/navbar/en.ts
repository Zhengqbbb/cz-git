import type { DefaultTheme } from 'vitepress'
import { github, npm, version } from '../../meta'

export const nav: DefaultTheme.NavItem[] = [
    {
        text: 'Guide',
        link: '/guide/',
        activeMatch: '/guide/',
    },
    {
        text: 'Config',
        link: '/config/',
        activeMatch: '/config/',
    },
    {
        text: 'Recipes',
        link: '/recipes/openai',
        activeMatch: '/recipes/',
    },
    {
        text: 'CLI',
        link: '/cli/',
        activeMatch: '/cli/',
    },
    {
        text: `v${version}`,
        items: [
            {
                text: 'Changelog',
                link: `${github}/blob/main/CHANGELOG.md`,
            },
            {
                text: 'NPM',
                link: npm,
            },
            {
                text: 'Playground',
                link: 'https://github.com/Zhengqbbb/czgit-playground',
            },
            {
                text: 'FAQ',
                link: '/faq/',
            },
        ],
    },
]
export default nav
