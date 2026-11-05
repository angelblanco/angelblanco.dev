<template>
  <header class="mt-5 mb-10">
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
    <BlogTags v-if="tags?.length" :tags="tags" class="mt-6" />
  </header>
</template>

<script lang="ts" setup>
defineProps<{
  tags?: string[];
}>();
</script>
