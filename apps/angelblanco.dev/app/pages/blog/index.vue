<template>
  <div class="mx-auto min-h-screen-content max-w-post p-4">
    <BlogIndexHeader :tags="tags" />
    <BlogPostList v-if="posts" :posts="posts" />
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();

useLocalizedSeo({
  title: 'Blog',
  description: 'BlogDescription',
  cta: 'ogCtaBlog',
});

const { queryBlogPostSummaries } = useBlog();

const { data: posts } = await useAsyncData(route.path, () => queryBlogPostSummaries().all());

const tags = computed(() => tagCounts(posts.value ?? []));
</script>
