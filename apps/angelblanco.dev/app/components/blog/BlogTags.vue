<template>
  <ul class="flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs font-medium" :aria-label="$t('blogTags')">
    <li v-for="tag in tags" :key="tag">
      <NuxtLinkLocale
        :to="`/blog/tags/${tag}`"
        class="relative z-10 text-base-content/70 transition-colors hover:text-primary"
        active-class="text-primary"
      >
        #{{ tag }}
      </NuxtLinkLocale>
    </li>
  </ul>
</template>

<script lang="ts" setup>
defineProps<{
  tags: string[];
}>();
</script>
