<script setup lang="ts">
import { useData } from "vitepress";
import { useEmojiItem } from "./composables";

const features = useData().frontmatter.value.czFeatures;
const pkgFeatureTitle = useData().frontmatter.value.pkgFeatureTitle;
const emojiFeature = useData().frontmatter.value.emojiFeature;
const emoji = useEmojiItem();
</script>

<template>
  <div flex="~ wrap grow basis-30%" px-24px max-w-960px maauto>
    <div v-for="(feat, i) in features" :key="i">
      <h2>{{ feat.title }}</h2>
      <p>{{ feat.details }}</p>
    </div>
    <div>
      <h2>{{ pkgFeatureTitle }}</h2>
      <p>
        $ npm install -D cz-git<br />
        + cz-git
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        (<span color-yellow-6> 1.7 MB </span>) <br />added &nbsp;<span color-yellow-6>1</span>&nbsp;
        package in &nbsp;<span color-yellow-6>0.461s</span>
      </p>
    </div>
    <div>
      <h2>{{ emojiFeature.title }}</h2>
      <p>
        <span text-6>{{ emoji }}</span> {{ emojiFeature.details }}
      </p>
    </div>
  </div>
</template>
