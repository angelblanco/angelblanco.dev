<template>
  <HomeBlogList :latest-post="latestPost ?? null" :other-posts="otherPosts ?? []" />
</template>

<script lang="ts" setup>
const route = useRoute();
const { queryBlogCollection } = useBlog();

const MAX_OTHER_POSTS_COUNT = 8;

function queryHomeBlog() {
  return queryBlogCollection()
    .select('path', 'title', 'description', 'date', 'id', 'tags')
    .order('date', 'DESC');
}

const { data: latestPost } = await useAsyncData(
  `${route.path}` + `_latest`,
  () => queryHomeBlog().first(),
);

const { data: otherPosts } = await useAsyncData(
  `${route.path}_other`,
  () => queryHomeBlog().skip(1).limit(MAX_OTHER_POSTS_COUNT).all(),
);
</script>
