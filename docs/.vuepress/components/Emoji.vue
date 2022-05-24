<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
const emoji = ref("🎉");
const emojiArr = [
  "🎉",
  "🐛",
  "💚",
  "🔍️",
  "💫",
  "👷",
  "🎡",
  "🧱",
  "💄",
  "⚡️",
  "♻️",
  "🔧",
  "✨",
  "🔨",
  "🏷️",
  "🚀",
  "🌐",
  "📝",
  "📚",
  "✅",
  "🔖",
  "📦️"
];

onMounted(() => {
  const interval = setInterval(() => {
    emoji.value = emojiArr[Math.floor(Math.random() * emojiArr.length)];
  }, 340);
  onBeforeUnmount(() => {
    clearInterval(interval);
  });
});
</script>

<template>
  <span class="emoji-code">{{ emoji }}</span>
</template>
