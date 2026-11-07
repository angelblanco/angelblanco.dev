<template>
  <HomeBlogList :latest-post="latestPost ?? null" :other-posts="otherPosts ?? []" />
</template>

<script lang="ts" setup>
const route = useRoute();
const { queryBlogPostSummaries } = useBlog();

const MAX_OTHER_POSTS_COUNT = 8;

const { data: latestPost } = await useAsyncData(
  `${route.path}` + `_latest`,
  () => queryBlogPostSummaries().first(),
);

const { data: otherPosts } = await useAsyncData(
  `${route.path}_other`,
  () => queryBlogPostSummaries().skip(1).limit(MAX_OTHER_POSTS_COUNT).all(),
);
</script>
