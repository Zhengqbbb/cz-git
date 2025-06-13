import type MarkdownIt from 'markdown-it'
import type { RenderRule } from 'markdown-it/lib/renderer'
import container from 'markdown-it-container'

export async function containerPlugin(md: MarkdownIt) {
    md
        .use(...createComptContainer(
            'code-group',
            () => '<CodeGroup>\n',
            () => '</CodeGroup>\n',
        ),
        )
        .use(...createComptContainer(
            'code-group-item',
            (info: string) => `<CodeGroupItem title="${info}">\n`,
            () => '</CodeGroupItem>\n',
        ),
        )
        .use(...createComptContainer(
            'ul',
            () => '<StepFlow type="ul">\n',
            () => '</StepFlow>\n',
        ),
        )
        .use(...createComptContainer(
            'ol',
            () => '<StepFlow type="ol">\n',
            () => '</StepFlow>\n',
        ),
        )
        .use(...createComptContainer(
            'li',
            (info: string) => {
                return `
<StepFlowItem>
<template #title>
${md.renderInline(info)}
</template>
`
            },
            () => '</StepFlowItem>\n',
        ),
        )
}

type ContainerArgs = [typeof container, string, { render: RenderRule }]
type RenderPlaceFunction = (info: string) => string

function createComptContainer(
    name: string,
    before: RenderPlaceFunction,
    after: RenderPlaceFunction,
): ContainerArgs {
    return [
        container,
        name,
        {
            render(tokens, idx) {
                const infoStack: string[] = []
                const token = tokens[idx]
                if (token.nesting === 1) {
                    const info = token.info.trim().slice(name.length).trim()
                    infoStack.push(info)
                    return before(info)
                }
                else {
                    const info = infoStack.pop() || ''
                    return after(info)
                }
            },
        },
    ]
}

export default containerPlugin
