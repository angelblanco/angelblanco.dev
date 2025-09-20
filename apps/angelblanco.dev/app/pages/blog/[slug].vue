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

const { post, alternativeLocale } = useBlogPost(route.path);

useHead(post.value?.head || {});
useSeoMeta(post.value?.seo || {});
</script>
