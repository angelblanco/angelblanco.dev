<template>
  <div v-if="toc.links.length > 0" class="cursor-pointer border border-primary/40 bg-primary/5 px-4 pt-2" :class="{ 'pb-4': expanded }">
    <div class="flex items-center gap-2 pb-2 text-sm font-medium tracking-wide text-primary-content md:text-base dark:text-base-content" @click="toggle">
      <Icon name="tabler:list-tree" class="size-5" />  <span>{{ t('On this page') }} </span>
    </div>

    <div v-if="expanded" class="border border-primary/40 bg-base-100 p-2 lg:p-4">
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
