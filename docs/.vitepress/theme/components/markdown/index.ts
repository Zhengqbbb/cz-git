import { useMarkdownContainer } from './plugins/contatiner'

export const useCodeGroup = useMarkdownContainer({
  type: 'code-group',
  before: () => '<CodeGroup>\n',
  after: () => '</CodeGroup>\n',
})

export const useCodeGroupItem = useMarkdownContainer({
  type: 'code-group-item',
  before: (info: string) => `<CodeGroupItem title="${info}">\n`,
  after: () => '</CodeGroupItem>\n',
})

export * from './plugins/image'
