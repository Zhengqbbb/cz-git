import type { MarkdownOptions } from 'vitepress'
import { ImagePlugin, useCodeGroup, useCodeGroupItem } from '../theme/components/markdown'

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
  config: (md) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    md.use(require('markdown-it-mark'))
    md.use(useCodeGroup.container, useCodeGroup.type, { render: useCodeGroup.render })
    md.use(useCodeGroupItem.container, useCodeGroupItem.type, {
      render: useCodeGroupItem.render,
    })
    md.use(ImagePlugin)
  },
}
