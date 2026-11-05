<template>
  <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
    <BlogDate :date="post.date" />
    <template v-if="post.readingTime">
      <span aria-hidden="true">·</span>
      <BlogReadingTime :minutes="Number(post.readingTime)" />
    </template>
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  post: Pick<BlogCollectionItem, 'date' | 'readingTime'>;
}>();
</script>
