import { h, watchEffect } from 'vue'
import Theme from 'vitepress/theme'
import { inBrowser, useData } from 'vitepress'
import type { EnhanceAppContext } from 'vitepress'
import { createMediumZoomProvider } from './composables'
import Badge from './components/Badge.vue'
import HomePage from './components/HomePage.vue'
import CodeGroup from './components/CodeGroup'
import CodeGroupItem from './components/CodeGroupItem.vue'
import StepFlow from './components/StepFlow'
import StepFlowItem from './components/StepFlowItem.vue'

import './style/main.css'
import './style/vars.css'
import 'uno.css'

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
        app.component('Badge', Badge)
        app.component('CodeGroup', CodeGroup)
        app.component('CodeGroupItem', CodeGroupItem)
        app.component('StepFlow', StepFlow)
        app.component('StepFlowItem', StepFlowItem)
        createMediumZoomProvider(app, router)
    },
    setup() {
        const { lang } = useData()
        watchEffect(() => {
            if (typeof document !== 'undefined')
                document.cookie = `nf_lang=${lang.value}; expires=Mon, 1 Jan 2030 00:00:00 UTC; path=/`
        })
    },
}
