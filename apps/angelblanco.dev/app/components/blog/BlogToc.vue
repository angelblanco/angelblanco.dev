<template>
  <div class="p-4 border border-primary/40 bg-primary/5">
    <div class="font-bold text-lg pb-4 font-mono text-primary-content tracking-wide dark:text-base-content dark:font-medium">
      On this page
    </div>

    <div class="border-primary/40 border px-6 py-4 bg-base-100">
      <BlogTocLink v-for="(link, i) in toc.links" :key="i" :toc-link="link" first-level :not-first-in-group="i !== 0" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Toc } from '@nuxt/content';

const { toc } = defineProps<{ toc: Toc }>();
</script>
