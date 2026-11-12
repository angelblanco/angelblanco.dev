<template>
  <div v-if="toc.links.length > 0" class="border-y border-base-300 py-2 text-[13px]/5 text-base-content/70">
    <button type="button" class="flex cursor-pointer items-center gap-1.5 transition-colors hover:text-base-content" :aria-expanded="expanded" @click="toggle">
      <Icon name="tabler:list-tree" class="size-3.5" /> <span>{{ t('On this page') }}</span>
      <Icon name="tabler:chevron-down" class="size-3.5 transition-transform" :class="{ 'rotate-180': expanded }" />
    </button>

    <div v-if="expanded" class="mt-2 pb-1 pl-5">
      <BlogTocLink v-for="(link, i) in toc.links" :key="i" :toc-link="link" first-level :not-first-in-group="i !== 0" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Toc } from '@nuxt/content';

const { toc } = defineProps<{ toc: Toc }>();
const { t } = useI18n();
const expanded = ref(false);
function toggle() {
  expanded.value = !expanded.value;
}
</script>
