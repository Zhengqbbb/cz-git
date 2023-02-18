import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Sidebar = {
  '/zh/cli/': [
    {
      text: '指南',
      collapsed: false,
      items: [
        {
          text: '介绍',
          link: '/zh/cli/',
        },
        {
          text: '为什么选择 czg',
          link: '/zh/cli/why',
        },
        {
          text: '快速开始',
          link: '/zh/cli/install',
        },
      ],
    },
    {
      text: '子命令',
      collapsed: false,
      items: [
        {
          text: 'ai',
          link: '/zh/cli/ai',
        },
        {
          text: 'break',
          link: '/zh/cli/break',
        },
        {
          text: 'emoji',
          link: '/zh/cli/emoji',
        },
        {
          text: 'checkbox',
          link: '/zh/cli/checkbox',
        },
        {
          text: 'gpg',
          link: '/zh/cli/gpg',
        },
      ],
    },
    {
      text: '选项',
      collapsed: false,
      items: [
        {
          text: '--alias',
          link: '/zh/cli/alias',
        },
        {
          text: '--retry',
          link: '/zh/cli/retry',
        },
        {
          text: '--config',
          link: '/zh/cli/config',
        },
      ],
    },
  ],
  '/zh/': [
    {
      text: '指南',
      collapsed: false,
      items: [
        {
          text: '简介',
          link: '/zh/guide/introduction',
        },
        {
          text: '动机',
          link: '/zh/guide/why',
        },
        {
          text: '快速开始',
          link: '/zh/guide/',
        },
      ],
    },
    {
      text: '配置',
      collapsed: false,
      items: [
        {
          text: '配置模板',
          link: '/zh/config/',
        },
        {
          text: '显示相关',
          link: '/zh/config/show',
        },
        {
          text: '工程化相关',
          link: '/zh/config/engineer',
        },
      ],
    },
    {
      text: '窍门',
      collapsed: false,
      items: [
        {
          text: 'OpenAI',
          link: '/zh/recipes/openai',
        },
        {
          text: 'scopes',
          link: '/zh/recipes/',
        },
        {
          text: 'alias',
          link: '/zh/recipes/alias',
        },
        {
          text: 'markBreakingChange',
          link: '/zh/recipes/breakingchange',
        },
        {
          text: 'issuePrefixes',
          link: '/zh/recipes/issue-prefixs',
        },
        {
          text: 'defaultScope',
          link: '/zh/recipes/default-scope',
        },
        {
          text: 'defaultSubject',
          link: '/zh/recipes/default-subject',
        },
        {
          text: 'defaultIssues',
          link: '/zh/recipes/default-issues',
        },
      ],
    },
    {
      text: '常见问题',
      items: [
        {
          text: 'FAQ',
          link: '/zh/faq/',
        },
      ],
    },
  ],
}
export default sidebar
