import { execSync } from 'child_process'
import { createWriteStream } from 'fs'
import fg from 'fast-glob'
import rm from 'rimraf'
import { SitemapStream } from 'sitemap'
import { resolve } from 'pathe'
import { site } from '../../meta'

const getGitTimestamp = (file: string) => {
  const output = execSync(`git log -1 --pretty='%ci' ${file} || true`).toString().trim()
  return output ? new Date(output).toISOString() : new Date().toISOString()
}

const __LOCALE_REX = /^(zh\/|zh)/

const basicRoutes = (site: string) =>
  fg
    .sync('**/*', {
      cwd: resolve(__dirname, '../../../'),
      onlyDirectories: true,
      ignore: ['**/node_modules/**', '**/public/**'],
    })
    .map((path) => {
      return {
        url: `${site}/${path}/`,
        lastmod: getGitTimestamp(resolve(__dirname, '../../../', `${path}/index.md`)),
        priority: path === 'zh' ? 1 : 0.8,
        lang: new RegExp(__LOCALE_REX).test(path) ? 'zh-CN' : 'en-US',
        pageIndex: new RegExp(__LOCALE_REX).test(path)
          ? path.replace(__LOCALE_REX, '') || '/'
          : path,
        changefreq: 'daily',
      }
    })

const subRoutes = (site: string) =>
  fg
    .sync('**/*.md', {
      cwd: resolve(__dirname, '../../../'),
      onlyFiles: true,
      ignore: ['**/node_modules/**', '**/public/**', '**/index.md'],
    })
    .map((path) => {
      return {
        url: `${site}/${path.replace(/\.md$/, '.html')}`,
        lastmod: getGitTimestamp(resolve(__dirname, '../../../', path)),
        priority: 0.6,
        lang: new RegExp(__LOCALE_REX).test(path) ? 'zh-CN' : 'en-US',
        pageIndex: new RegExp(__LOCALE_REX).test(path) ? path.replace(__LOCALE_REX, '') : path,
        changefreq: 'daily',
      }
    })

interface PagesData {
  url?: string
  lastmod?: string
  priority?: number
  lang?: string
  pageIndex?: string
  changefreq?: string
  links?: { lang?: string; url?: string }[]
}

const resolveLocales = (site: string): PagesData[] => {
  const basic: PagesData[] = [
    {
      url: `${site}/`,
      lastmod: getGitTimestamp(resolve(__dirname, '../../../', 'index.md')),
      priority: 1,
      lang: 'en-US',
      pageIndex: '/',
      changefreq: 'daily',
    },
    ...basicRoutes(site),
    ...subRoutes(site),
  ]
  const result = basic.map((page: PagesData) => {
    page.links = [{ lang: page.lang, url: page.url }]
    basic.forEach((item) => {
      if (item.lang !== page.lang && item.pageIndex === page.pageIndex)
        page.links?.push({ lang: item.lang, url: item.url })
    })
    return page
  })
  return result
}

/**
 * Main: Generate sitemap.xml
 * @see https://cz-git.qbb.sh/sitemap.xml
 */
const generateSitemap = async () => {
  const smStream = new SitemapStream({
    hostname: site,
  })
  const pages = resolveLocales(site)
  rm.sync(resolve(__dirname, '../../../public', 'sitemap.xml'))
  const writeStream = createWriteStream(resolve(__dirname, '../../../public', 'sitemap.xml'))
  smStream.pipe(writeStream)
  pages.forEach(mapping => smStream.write(mapping))
  smStream.end()
}

export { generateSitemap }
export default generateSitemap
