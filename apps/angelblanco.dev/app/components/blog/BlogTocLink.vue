<template>
  <div :class="{ 'mt-1': notFirstInGroup === true }">
    <a :href="href" class="block py-0.5 text-[13px]/5 transition-colors hover:text-base-content" :class="firstLevel ? 'text-base-content' : 'text-base-content/70'">
      {{ tocLink.text }}
    </a>
  </div>
  <div v-if="tocLink.children" class="pl-4">
    <BlogTocLink v-for="(child, i) in tocLink.children" :key="i" :toc-link="child" />
  </div>
</template>

<script lang="ts" setup>
import type { TocLink } from '@nuxt/content';

const { tocLink, firstLevel, notFirstInGroup } = defineProps<{
  tocLink: TocLink;
  firstLevel?: boolean;
  notFirstInGroup?: boolean;
}>();

const href = computed(() => `#${tocLink.id}`);
</script>
