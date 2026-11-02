<template>
  <div v-if="toc.links.length > 0" class="border border-primary/40 bg-primary/5 p-4">
    <div class="pb-4 font-mono text-sm font-bold tracking-wide text-primary-content md:text-base dark:font-medium dark:text-base-content">
      {{ t('On this page') }}
    </div>

    <div class="border border-primary/40 bg-base-100 p-2 lg:p-4">
      <BlogTocLink v-for="(link, i) in toc.links" :key="i" :toc-link="link" first-level :not-first-in-group="i !== 0" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Toc } from '@nuxt/content';

const { toc } = defineProps<{ toc: Toc }>();
const { t } = useI18n();
</script>
