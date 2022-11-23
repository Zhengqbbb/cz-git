import { h, watchEffect } from 'vue'
import Theme from 'vitepress/theme'
import { inBrowser, useData } from 'vitepress'
import type { EnhanceAppContext } from 'vitepress'
import './style/main.css'
import './style/vars.css'
import 'uno.css'
import { createMediumZoomProvider, usePageAnalytics } from './components/composables'
import HomePage from './components/HomePage.vue'
import CodeGroupItem from './components/CodeGroupItem.vue'
import { CodeGroup } from './components/CodeGroup'

if (inBrowser)
  import('./pwa')

export default {
  ...Theme,
  Layout() {
    return h(Theme.Layout, null, {
      'home-features-after': () => h(HomePage),
    })
  },
  enhanceApp({ app, router }: EnhanceAppContext) {
    app.component('CodeGroup', CodeGroup)
    app.component('CodeGroupItem', CodeGroupItem)
    createMediumZoomProvider(app, router)
    usePageAnalytics('G-V5E08LL4GP', 'b1d9002033c7e550e55a51a23dca4f31')
  },
  setup() {
    const { lang } = useData()
    watchEffect(() => {
      if (typeof document !== 'undefined')
        document.cookie = `nf_lang=${lang.value}; expires=Sun, 1 Jan 2024 00:00:00 UTC; path=/`
    })
  },
}
