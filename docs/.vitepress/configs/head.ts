import type { HeadConfig } from 'vitepress'
import {
  baiduVerify,
  descriptionEN,
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
  ['meta', { name: 'twitter:description', content: descriptionEN }],
  ['meta', { name: 'twitter:creator', content: '@zhengqbbb' }],
  ['meta', { name: 'twitter:site', content: '@zhengqbbb' }],
  ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ['meta', { name: 'twitter:image', content: ogImg }],
  ['meta', { name: 'twitter:image:alt', content: 'logo' }],
  ['meta', { name: 'og:description', content: descriptionEN }],
  ['meta', { name: 'og:url', content: site }],
  ['meta', { name: 'og:type', content: 'article' }],
  ['meta', { name: 'og:locale', content: 'en_US' }],
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

  ['link', { rel: 'shortcut icon', href: '/images/favicon.ico' }],
  ['link', { rel: 'icon', type: 'image/x-icon', size: '16x16', href: '/images/favicon.ico' }],
  ['link', { rel: 'icon', sizes: '32x32', href: '/images/icons/favicon-32.png' }],
  ['link', { rel: 'icon', sizes: '192x192', href: '/images/icons/favicon-192.png' }],
  ['link', { rel: 'mask-icon', href: '/images/logo.svg', color: '#000000' }],

  ['link', { rel: 'apple-touch-icon', href: '/images/icons/apple-touch-120x120.png' }],
  ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/images/icons/apple-touch-180x180.png' }],
  ['link', { rel: 'apple-touch-icon', sizes: '120x120', href: '/images/icons/apple-touch-120x120.png' }],
  ['link', { rel: 'apple-touch-icon', sizes: '167x167', href: '/images/icons/apple-touch-167x167.png' }],
  ['link', { rel: 'apple-touch-icon', sizes: '152x152', href: '/images/icons/apple-touch-152x152.png' }],
  ['link', { rel: 'apple-touch-icon', sizes: '80x80', href: '/images/icons/apple-touch-80x80.png' }],
]
