import type { MarkdownOptions } from 'vitepress'
import { useCodeGroup, useCodeGroupItem } from '../components/markdown'

/**
 * vitepress markdown config
 * @see https://vitepress.vuejs.org/config/app-configs.html#markdown
 */
export const markdownConfig: MarkdownOptions = {
  // shiki code theme
  theme: {
    light: 'vitesse-light',
    dark: 'vitesse-dark',
  },
  // theme: "one-dark-pro",
  config: (md) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    md.use(require('markdown-it-mark'))
    md.use(useCodeGroup.container, useCodeGroup.type, { render: useCodeGroup.render })
    md.use(useCodeGroupItem.container, useCodeGroupItem.type, {
      render: useCodeGroupItem.render,
    })
  },
}
