<template>
  <div v-if="!hasWrapper" :data-theme="theme">
    <slot />
  </div>
  <div v-else class="space-y-2" :data-theme="theme">
    <div class="p-4 flex justify-end">
      <select v-model="theme" class="select">
        <option v-for="option in availableThemes" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Story, Variant } from 'histoire';
import { computed } from 'vue';
import useHistoireTheme from './useHistoireTheme';

declare module 'histoire' {
  interface CommonMeta {
    wrapper?: boolean;
  }
}

const props = defineProps<{
  story: Story;
  variant?: Variant;
}>();

// Wrapper is only rendered inside the theme switcher histoire
const hasWrapper = computed(() => {
  return (
    props.story.meta?.wrapper === true || props.variant?.meta?.wrapper === true
  );
});

const { theme, availableThemes, verifyTheme, syncTheme } = useHistoireTheme();

verifyTheme();
syncTheme();
</script>
