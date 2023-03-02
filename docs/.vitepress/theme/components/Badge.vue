<script setup lang="ts">
defineProps<{
  text?: string
  type?: 'info' | 'tip' | 'warning' | 'danger'
}>()
</script>

<template>
  <span class="Badge" :class="type ?? 'tip'">
    <slot>{{ text }}</slot>
  </span>
</template>

<style scoped>
.Badge {
  display: inline-block;
  margin-left: 2px;
  border: 1px solid transparent;
  border-radius: 10px;
  padding: 0 8px;
  line-height: 18px;
  font-size: 12px;
  font-weight: 600;
  transform: translateY(-2px);
}

h1 .Badge,
h2 .Badge,
h3 .Badge,
h4 .Badge,
h5 .Badge,
h6 .Badge {
  vertical-align: top;
}

h2 .Badge {
  border-radius: 11px;
  line-height: 20px;
}

.Badge.info {
  border-color: var(--vp-custom-block-info-border);
  color: var(--vp-custom-block-info-text);
  background-color: var(--vp-custom-block-info-bg);
}

.Badge.tip {
  border-color: var(--vp-custom-block-tip-border);
  color: var(--vp-custom-block-tip-text);
  background-color: var(--vp-custom-block-tip-bg);
}

.Badge.warning {
  border-color: var(--vp-custom-block-warning-border);
  color: var(--vp-custom-block-warning-text);
  background-color: var(--vp-custom-block-warning-bg);
}

.Badge.danger {
  border-color: var(--vp-custom-block-danger-border);
  color: var(--vp-custom-block-danger-text);
  background-color: var(--vp-custom-block-danger-bg);
}
</style>
