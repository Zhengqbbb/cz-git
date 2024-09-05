<script setup lang="ts">
// @ts-expect-error
import { useLangs } from 'vitepress/dist/client/theme-default/composables/langs'

const { currentLang } = useLangs({ correspondingLink: true })
</script>

<template>
    <div class="w-250px rd bg-$vp-carbon-ads-bg-color">
        <a v-if="currentLang.label === 'English'" class="p-2 flex items-center justify-center" href="https://www.siteground.com/index.htm?afcode=15ef80d558a8f791784686f35c96efcd" target="_blank">
            <img src="/images/250x250-en.webp" width="230" height="230" alt="Ad - Web Hosting from SiteGround - Crafted for easy site management. Click to learn more.">
        </a>
        <a v-else class="p-2 flex items-center justify-center" href="https://my.laoxuehost.com/aff.php?aff=11895" target="_blank">
            <img src="/images/250x250-cn.webp" width="230" height="230" alt="广告 - 一键建站，香港云主机，一年59元起，75折专属推荐码 qbbsh。点击了解更多">
        </a>
    </div>
</template>
