<template>
  <header class="mt-5 mb-10">
    <slot name="back" />
    <h1 class="text-4xl font-semibold tracking-tight">
      <slot name="title">
        {{ $t('Blog') }}
      </slot>
    </h1>
    <p class="mt-2 text-base-content/70">
      <slot name="description">
        {{ $t('BlogDescription') }}
      </slot>
    </p>
    <template v-if="tags?.length">
      <BlogTagCloud :tags="tags" class="mt-6" />
      <NuxtLinkLocale to="/blog/tags" class="mt-4 inline-flex items-center gap-1 text-sm text-primary hover:underline">
        {{ $t('blogAllTopics') }}
        <Icon name="tabler:arrow-right" class="size-4" />
      </NuxtLinkLocale>
    </template>
  </header>
</template>

<script lang="ts" setup>
defineProps<{
  tags?: TagCount[];
}>();
</script>
