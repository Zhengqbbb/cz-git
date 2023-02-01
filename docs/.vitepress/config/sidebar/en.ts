import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Sidebar = {
  '/cli/': [
    {
      text: 'Guide',
      collapsed: false,
      items: [
        {
          text: 'Introduction',
          link: '/cli/',
        },
        {
          text: 'Why czg',
          link: '/cli/why',
        },
        {
          text: 'Getting Started',
          link: '/cli/install',
        },
      ],
    },
    {
      text: 'Subcommands',
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
        {
          text: 'gpg',
          link: '/cli/gpg',
        },
      ],
    },
    {
      text: 'Options',
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
      text: 'Guide',
      collapsed: false,
      items: [
        {
          text: 'Introduction',
          link: '/guide/introduction',
        },
        {
          text: 'Why cz-git',
          link: '/guide/why',
        },
        {
          text: 'Getting Started',
          link: '/guide/',
        },
      ],
    },
    {
      text: 'Config',
      collapsed: false,
      items: [
        {
          text: 'Configure Template',
          link: '/config/',
        },
        {
          text: 'Show Related',
          link: '/config/show',
        },
        {
          text: 'Engineering Related',
          link: '/config/engineer',
        },
      ],
    },
    {
      text: 'Recipes',
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
          text: 'defaultScope',
          link: '/recipes/default-scope',
        },
        {
          text: 'defaultSubject',
          link: '/recipes/default-subject',
        },
        {
          text: 'defaultIssues',
          link: '/recipes/default-issues',
        },
      ],
    },
    {
      text: 'FAQ',
      items: [
        {
          text: 'FAQ',
          link: '/faq/',
        },
      ],
    },
  ],
}
export default sidebar
