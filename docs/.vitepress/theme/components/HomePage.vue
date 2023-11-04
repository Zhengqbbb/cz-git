<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { VPTeamMembers } from 'vitepress/theme'
import { useEmojiItem, useMediumZoom } from './composables'

const emoji = useEmojiItem()
const { frontmatter } = useData()
const features = computed(() => frontmatter.value.czFeatures)
const pkgFeatureTitle = computed(() => frontmatter.value.pkgFeatureTitle)
const emojiFeature = computed(() => frontmatter.value.emojiFeature)
const openAIFeature = computed(() => frontmatter.value.openAIFeature)
const collaborator = computed(() => frontmatter.value.collaborator)
const sponsor = computed(() => frontmatter.value.sponsor)
useMediumZoom()
</script>

<template>
  <div
    flex="~ wrap grow basis-30% md:row col"
    class="maauto max-w-1152px mt-12 lg:px-1 px-2 py-0 justify-between items-stretch"
  >
    <div class="feat">
      <h2 class="featTitle">
        {{ openAIFeature.title }}
        <i class="i-simple-icons:openai" />
      </h2>
      <p class="dark:c-gray-4 c-gray-5 text-4.2">
        {{ openAIFeature.details }}<br>
        <a :href="openAIFeature.link" class="text-$vp-c-brand text-sm underline underline-offset-4 underline-solid underline-transparent transition-all" hover="underline-$vp-c-brand">
          {{ openAIFeature.linkText }}
        </a>
      </p>
    </div>
    <div v-for="(feat, i) in features" :key="i" class="feat" :class="{ relative: i !== 2 }">
      <h2 class="featTitle">
        {{ feat.title }}
      </h2>
      <p class="dark:c-gray-4 c-gray-5 text-4.2 whitespace-pre-wrap">
        {{ feat.details }}
      </p>
    </div>
    <div class="feat relative">
      <h2 class="featTitle">
        {{ pkgFeatureTitle }}
      </h2>
      <p class="dark:c-gray-4 c-gray-5 text-4.2">
        $ npm install -D cz-git<br>
        + cz-git
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        (<span c-orange-5> 1.9 MB </span>) <br>added &nbsp;<span c-orange-5>1</span>&nbsp; package
        in &nbsp;<span c-orange-5>0.582s</span>
      </p>
    </div>
    <div class="feat">
      <h2 class="featTitle">
        {{ emojiFeature.title }}
      </h2>
      <p class="dark:c-gray-4 c-gray-5 text-4.2">
        <span text-6>{{ emoji }}</span>&nbsp; {{ emojiFeature.details }}
      </p>
    </div>
  </div>
  <p class="maauto max-w-1152px mt-14 lg:px-1 px-2">
    <img
      class="max-w-100%"
      src="https://user-images.githubusercontent.com/40693636/188255006-b9df9837-4678-4085-9395-e2905d7ec7de.gif"
      alt="demo-gif"
      width="1144"
      height="376"
      loading="lazy"
      decoding="async"
      onerror="this.classList.add('error', 'animate-none!');"
      onload="this.classList.add('animate-none!');"
    >
  </p>
  <div class="mt-14" flex="~ col items-center wrap">
    <VPTeamMembers size="small" :members="collaborator.team" />
    <h2 class="my-4 text-base font-600 text-center">
      💖 {{ sponsor }}
    </h2>
    <div class="" flex="~ gap-4">
      <a
        href="https://github.com/sponsors/Zhengqbbb"
        target="_blank" rel="noopener"
        class="px-5 leading-9 text-sm b b-rose4 text-rose4 bg-rose4:5 rd-5 text-center font-600 whitespace-nowrap hover:op-80 transition-opacity"
        flex="~ items-center gap-1"
      >
        <i class="i-ri:heart-3-line" /> Sponsor
      </a>
      <a
        href="https://afdian.net/a/qbbsh"
        target="_blank" rel="noopener"
        class="px-5 leading-9 b b-$vp-custom-block-warning-border text-$vp-custom-block-warning-text-deep bg-$vp-custom-block-warning-bg rd-5 text-center font-600 whitespace-nowrap hover:op-80 transition-opacity"
        flex="~ items-center gap-1"
      >
        <i class="i-ri:flashlight-line" /> 爱发电
      </a>
    </div>
    <h2 class="mt-8 mb-4 text-base color-$vp-button-alt-text font-600 text-center">
      {{ collaborator.text }}
    </h2>
    <a :href="collaborator.link" target="_blank" rel="noopener">
      <img
        :src="collaborator.image"
        class="image-src "
        alt="contributors-img"
        loading="lazy"
        decoding="async"
        onerror="this.classList.add('error');"
      >
    </a>
  </div>
</template>
