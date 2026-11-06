<template>
  <ul class="flex flex-wrap gap-x-4 gap-y-2 font-mono text-sm" :aria-label="$t('blogTags')">
    <li v-for="{ tag, count } in tags" :key="tag">
      <NuxtLinkLocale
        :to="`/blog/tags/${tag}`"
        :aria-label="`#${tag}, ${$t('blogArticleCount', count)}`"
        class="text-base-content/80 transition-colors hover:text-primary"
        active-class="text-primary"
      >
        #{{ tag }}<sup class="ml-0.5 text-[0.7em] text-base-content/50">{{ count }}</sup>
      </NuxtLinkLocale>
    </li>
  </ul>
</template>

<script lang="ts" setup>
defineProps<{
  tags: TagCount[];
}>();
</script>
