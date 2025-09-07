<template>
  <div class="py-2">
    <a :href="href"># {{ tocLink.text }}</a>
  </div>
  <div v-if="tocLink.children" class="pl-4">
    <BlogTocLink v-for="(child, i) in tocLink.children" :key="i" :toc-link="child" />
  </div>
</template>

<script lang="ts" setup>
import type { TocLink } from '@nuxt/content';

const { tocLink } = defineProps<{
  tocLink: TocLink;
}>();

const href = computed(() => `#${tocLink.id}`);
</script>
