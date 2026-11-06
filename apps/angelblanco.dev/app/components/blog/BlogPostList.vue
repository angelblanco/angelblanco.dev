<template>
  <ul class="grid gap-6">
    <li v-for="post in posts" :key="post.id">
      <BlogPostCard :post="post" />
    </li>
  </ul>
</template>

<script lang="ts" setup>
defineProps<{
  posts: BlogPostSummary[];
}>();
</script>
