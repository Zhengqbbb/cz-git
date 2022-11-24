import type { DefaultTheme } from 'vitepress'

export const en: DefaultTheme.Sidebar = {
  '/cli/': [
    {
      text: 'Guide',
      collapsible: true,
      collapsed: false,
      items: [
        {
          text: 'Introduction',
          link: '/cli/',
        },
        {
          text: 'Getting Started',
          link: '/cli/install',
        },
        {
          text: 'Why czg',
          link: '/cli/why',
        },
      ],
    },
    {
      text: 'Subcommands',
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
        {
          text: 'gpg',
          link: '/cli/gpg',
        },
      ],
    },
    {
      text: 'Options',
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
      text: 'Guide',
      collapsible: true,
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
      collapsible: true,
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
