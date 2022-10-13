declare const dataLayer: any[]
declare const gtag: (...args: any[]) => void
declare global {
  interface Window {
    dataLayer?: typeof dataLayer
    _hmt?: any
    gtag?: typeof gtag
  }
}

const baiduAnalytics = (id: string) => {
  const btagScript = document.createElement('script')
  btagScript.src = `https://hm.baidu.com/hm.js?${id}`
  btagScript.async = true
  if (!document.head.contains(btagScript))
    document.head.appendChild(btagScript)

  window._hmt = window._hmt || []
}

/** Powered by vuepress-next */
const googleAnalytics = (id: string) => {
  if (window.dataLayer && window.gtag)
    return

  // insert gtag `<script>` tag
  const gtagScript = document.createElement('script')
  gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
  gtagScript.async = true
  document.head.appendChild(gtagScript)

  // insert gtag snippet
  window.dataLayer = window.dataLayer || []
  // the gtag function must use `arguments` object to forward parameters
  window.gtag = function () {
    // eslint-disable-next-line prefer-rest-params
    dataLayer.push(arguments)
  }

  gtag('js', new Date())
  gtag('config', id)
}

/**
 * Main: Generate sitemap.xml
 */
export const usePageAnalytics = (googleID: string, baiduId: string) => {
  if (import.meta.env.SSR || import.meta.env.DEV)
    return

  baiduAnalytics(baiduId)
  googleAnalytics(googleID)
}
