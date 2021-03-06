import type { DefaultTheme } from 'vitepress'

export const zh: DefaultTheme.Sidebar = {
  '/cli/': [
    {
      text: '指南',
      collapsible: true,
      collapsed: false,
      items: [
        {
          text: '介绍',
          link: '/cli/',
        },
        {
          text: '快速开始',
          link: '/cli/install',
        },
        {
          text: '为什么选择 czg',
          link: '/cli/why',
        },
      ],
    },
    {
      text: '子命令',
      collapsible: true,
      collapsed: false,
      items: [
        {
          text: 'break',
          link: '/cli/break',
        },
        {
          text: 'emoji',
          link: '/cli/emoji',
        },
        {
          text: 'checkbox',
          link: '/cli/checkbox',
        },
      ],
    },
    {
      text: '选项',
      collapsible: true,
      collapsed: false,
      items: [
        {
          text: '--alias',
          link: '/cli/alias',
        },
        {
          text: '--retry',
          link: '/cli/retry',
        },
        {
          text: '--config',
          link: '/cli/config',
        },
      ],
    },
  ],
  '/': [
    {
      text: '指南',
      collapsible: true,
      collapsed: false,
      items: [
        {
          text: '简介',
          link: '/guide/introduction',
        },
        {
          text: '动机',
          link: '/guide/why',
        },
        {
          text: '快速开始',
          link: '/guide/',
        },
      ],
    },
    {
      text: '配置',
      collapsible: true,
      collapsed: false,
      items: [
        {
          text: '配置模板',
          link: '/config/',
        },
        {
          text: '显示相关',
          link: '/config/show',
        },
        {
          text: '工程化相关',
          link: '/config/engineer',
        },
      ],
    },
    {
      text: '窍门',
      collapsible: true,
      collapsed: false,
      items: [
        {
          text: 'scopes',
          link: '/recipes/',
        },
        {
          text: 'alias',
          link: '/recipes/alias',
        },
        {
          text: 'markBreakingChange',
          link: '/recipes/breakingchange',
        },
        {
          text: 'issuePrefixs',
          link: '/recipes/issuePrefixs',
        },
        {
          text: 'defaultScope',
          link: '/recipes/defaultScope',
        },
        {
          text: 'defaultSubject',
          link: '/recipes/defaultSubject',
        },
        {
          text: 'defaultIssues',
          link: '/recipes/defaultIssues',
        },
      ],
    },
    {
      text: '常见问题',
      items: [
        {
          text: 'FAQ',
          link: '/faq/',
        },
      ],
    },
  ],
}
