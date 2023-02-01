import { execSync } from 'child_process'
import { createWriteStream } from 'fs'
import type { SiteConfig } from 'vitepress'
import rm from 'rimraf'
import { SitemapStream } from 'sitemap'
import { resolve } from 'pathe'
import { site } from '../../meta'

/**
 * Main: Generate sitemap.xml
 * @see https://cz-git.qbb.sh/sitemap.xml
 */
async function generateSitemap(siteConfig: SiteConfig) {
  console.log('\x1B[32m✓\x1B[0m generate sitemap... \x1B[90m[buildEnd]\x1B[0m')
  const { pages, outDir, srcDir } = siteConfig
  const smStream = new SitemapStream({
    hostname: site,
  })
  const pagesData = getPagesData(site, srcDir, pages)
  rm.sync(
    resolve(outDir, 'sitemap.xml'),
  )
  const writeStream = createWriteStream(
    resolve(outDir, 'sitemap.xml'),
  )
  smStream.pipe(writeStream)
  pagesData.forEach(mapping => smStream.write(mapping))
  smStream.end()
}

function getGitTimestamp(file: string) {
  const output = execSync(`git log -1 --pretty='%ci' ${file} || true`).toString().trim()
  return output ? new Date(output).toISOString() : new Date().toISOString()
}

interface PagesData {
  url?: string
  lastmod?: string
  priority?: number
  lang?: string
  changefreq?: string
  linkTemp?: string
  links?: { lang?: string; url?: string }[]
}

function getPagesData(site: string, srcDir: string, pages: string[]): PagesData[] {
  const result: PagesData[] = pages.map((p) => {
    return {
      url: `${site}/${
        p.endsWith('index.md')
          ? p.replace('index.md', '')
          : p.replace('.md', '')
      }`,
      lastmod: getGitTimestamp(resolve(srcDir, p)),
      priority: (p === 'index.md' || p === 'zh/index.md')
        ? 1
        : p.endsWith('index.md')
          ? 0.8
          : 0.6,
      lang: p.startsWith('zh') ? 'zh-CN' : 'en-US',
      linkTemp: p.startsWith('zh/') ? p.substring(3) : p,
      changefreq: 'daily',
    }
  })

  return result.map((page) => {
    page.links = [{ lang: page.lang, url: page.url }]
    result.forEach((item) => {
      if (item.lang !== page.lang && item.linkTemp === page.linkTemp)
        page.links?.push({ lang: item.lang, url: item.url })
    })
    return page
  })
}

export { generateSitemap }
export default generateSitemap
