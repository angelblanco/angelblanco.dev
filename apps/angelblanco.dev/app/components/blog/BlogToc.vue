<template>
  <div v-if="toc.links.length > 0" class="p-4 border border-primary/40 bg-primary/5">
    <div class="font-bold pb-4 text-sm md:text-base font-mono text-primary-content tracking-wide dark:text-base-content dark:font-medium">
      {{ t('On this page') }}
    </div>

    <div class="border-primary/40 border p-2 lg:p-4 bg-base-100">
      <BlogTocLink v-for="(link, i) in toc.links" :key="i" :toc-link="link" first-level :not-first-in-group="i !== 0" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Toc } from '@nuxt/content';

const { toc } = defineProps<{ toc: Toc }>();
const { t } = useI18n();
</script>
