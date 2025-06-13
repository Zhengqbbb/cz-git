<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'StepFlowItem',
})
</script>

<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
    <div class="w-full">
        <div class="step-flow-title">
            <slot name="title" />
        </div>
        <div class="step-flow-content">
            <slot />
        </div>
    </div>
</template>
