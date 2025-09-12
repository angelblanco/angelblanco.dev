<template>
  <div>
    <div class="bg-base-content text-base-100 p-2 font-medium">
      On this page
    </div>

    <div class="border border-base-content px-2">
      <BlogTocLink v-for="(link, i) in toc.links" :key="i" :toc-link="link" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Toc } from '@nuxt/content';

const { toc } = defineProps<{ toc: Toc }>();
</script>
