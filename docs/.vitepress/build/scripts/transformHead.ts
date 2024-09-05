import type { HeadConfig, TransformContext } from 'vitepress'

export async function transformHead({ pageData }: TransformContext): Promise<HeadConfig[]> {
    const head: HeadConfig[] = []

    const home = pageData.relativePath === 'index.md'

    head.push(['link', { rel: 'prefetch', href: '/logo.svg' }])
    if (home)
        head.push(['link', { rel: 'prefetch', href: '/netlify.svg' }])

    return head
}
