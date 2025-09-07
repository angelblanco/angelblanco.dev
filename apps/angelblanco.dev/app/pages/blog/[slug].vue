<template>
  <UiPageNotFound v-if="!post" />
  <div v-else class="min-h-screen-content mx-auto max-w-ui p-4">
    <BlogHeader :post="post" :alternative-locale="alternativeLocale" />

    <div class="prose max-w-none lg:prose-lg">
      <ContentRenderer :value="post" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();

const { post, alternativeLocale, loadPost } = useBlogPost(route.path);

loadPost();

useSeoMeta({
  title: post.value?.title,
  description: post.value?.description,
  ogImage: post.value?.image,
});
</script>
