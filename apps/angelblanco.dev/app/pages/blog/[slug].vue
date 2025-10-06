<template>
  <UiPageLoader v-if="postPending || altPending" class=" mx-auto max-w-post" />
  <UiPageNotFound v-else-if="!post" />
  <div v-else class="min-h-screen-content mx-auto max-w-post p-4">
    <BlogHeader :post="post" :alternative-locale="alternativeLocale" />

    <div class="prose max-w-none">
      <ContentRenderer :value="post" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();

const path = computed(() => route.path);
const { post, postPending, altPending, alternativeLocale } = useBlogPost(path);

useHead({
  title: () => post.value?.title,
});

useSeoMeta({
  description: () => post.value?.description,
  ...post.value?.seo || {},
});
</script>
