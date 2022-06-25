<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
    default: ""
  },
  description: {
    type: String,
    required: false,
    default: ""
  }
});
</script>

<template>
  <h1 class="clip">{{ title }}</h1>
  <p class="description"> {{ description }} </p>
</template>

<style lang="css">
.vp-doc .clip {
  font-size: 3rem;
  line-height: 3.8rem;
  text-align: center;
  background: var(--vp-home-hero-name-background);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: var(--vp-home-hero-name-color);
}
.description {
  font-size: 1.2rem;
  color: var(--vp-c-text-2);
}
</style>
