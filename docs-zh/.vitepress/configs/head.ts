import type { HeadConfig } from 'vitepress'
import {
  baiduVerify,
  descriptionCN,
  googleVerify,
  keywords,
  name,
  ogImg,
  ogTitle,
  site,
} from '../meta'

export const head: HeadConfig[] = [
  ['meta', { name: 'google-site-verification', content: googleVerify }],
  ['meta', { name: 'baidu-site-verification', content: baiduVerify }],
  ['meta', { name: 'keywords', content: keywords }],
  ['meta', { name: 'author', content: 'Zhengqbbb' }],
  ['meta', { name: 'twitter:title', content: ogTitle }],
  ['meta', { name: 'twitter:description', content: descriptionCN }],
  ['meta', { name: 'twitter:creator', content: '@zhengqbbb' }],
  ['meta', { name: 'twitter:site', content: '@zhengqbbb' }],
  ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ['meta', { name: 'twitter:image', content: ogImg }],
  ['meta', { name: 'twitter:image:alt', content: 'logo' }],
  ['meta', { name: 'og:description', content: descriptionCN }],
  ['meta', { name: 'og:url', content: site }],
  ['meta', { name: 'og:type', content: 'article' }],
  ['meta', { name: 'og:locale', content: 'zh_CN' }],
  ['meta', { name: 'og:image', content: ogImg }],
  ['meta', { name: 'og:image:alt', content: 'logo' }],
  ['meta', { name: 'application-name', content: name }],
  ['meta', { name: 'apple-mobile-web-app-title', content: name }],
  ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }],

  // NOTE: affect bing search console
  // ['link', { rel: 'canonical', href: site }],
  // ['link', { rel: 'alternate', href: site, hreflang: 'x-default' }],
  // ['link', { rel: 'alternate', href: site, hreflang: 'en-us' }],
  // ['link', { rel: 'alternate', href: `${site}/zh/`, hreflang: 'zh-hans' }],

  ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
  ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  ['link', { rel: 'mask-icon', href: '/images/logo.svg', color: '#dd6954' }],
  ['meta', { name: 'theme-color', content: '#dd6954' }],

  ['link', { rel: 'apple-touch-icon', sizes: '120x120', href: '/images/icons/apple-touch-120x120.png' }],
  // font
  ['link', { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' }],
  ['link', { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' }],
  ['link', { rel: 'preconnect', crossorigin: 'anonymous', href: 'https://fonts.googleapis.com' }],
  ['link', { rel: 'preconnect', crossorigin: 'anonymous', href: 'https://fonts.gstatic.com' }],
]
