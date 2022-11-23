import { promises as fs } from 'fs'
import fg from 'fast-glob'

export const optimizePages = async () => {
  const pages = await fg('./.vitepress/dist/**/*.html', { onlyFiles: true })

  await Promise.all(
    pages.map(async (page) => {
      let html = await fs.readFile(page, 'utf8')

      // const prefetchImg = '\n\t<link rel="prefetch" href="/images/logo.svg">'

      html = html.replace(
        '</head>',
        `  <link rel="prefetch" href="/manifest.webmanifest">
\t<link rel="manifest" href="/manifest.webmanifest">\n</head>`)

      await fs.writeFile(page, html, 'utf8')
    }),
  )
  console.log('\x1B[32m✓\x1B[0m optimizing pages... \x1B[90m[buildEnd]\x1B[0m')
}
