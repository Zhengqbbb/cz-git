<script setup lang="ts">
import { onMounted } from "vue";

defineProps({
  large: {
    type: Boolean,
    default: true
  }
});
const hellow = "Hellow";
onMounted(() => {
  console.log("hello");
});
</script>

<template>
  <div>
    <div text-yellow4 v-if="large">hello</div>
    {{ hellow }}
  </div>
</template>
