<template>
  <div :class="{ 'mt-2': notFirstInGroup === true }">
    <a :href="href" :class="linkClass" class="flex items-center gap-2 p-1 text-sm hover:bg-primary/10 md:text-base lg:p-2">
      <Icon v-if="firstLevel" name="heroicons:hashtag" class="size-6 text-primary" /><span class="text-base-content/90">{{ tocLink.text }}</span>
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

const linkClass = computed(() => {
  return firstLevel ? 'font-semibold lg:font-bold dark:font-medium tracking-wide' : '';
});
</script>
