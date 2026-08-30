<template>
  <UiPageNotFound v-if="!post" />
  <div v-else class="min-h-screen-content mx-auto max-w-post p-4">
    <BlogHeader :post="post" :alternative-locale="alternativeLocale" />

    <div class="prose max-w-none">
      <ContentRenderer :value="post" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const { locale, alternativeLocale: otherLocale } = useLocale();
const {
  blogCollection,
  alternativeBlogCollection,
  queryBlogCollection,
  queryAlternativeBlogCollection,
} = useBlog();

const [{ data: post }, { data: alternativePost }] = await Promise.all([
  useAsyncData(
    `${locale.value}-main-${blogCollection.value}-${route.path}`,
    () => queryBlogCollection().path(route.path).first(),
  ),
  useAsyncData(
    `${locale.value}-alternative-${alternativeBlogCollection.value}-${route.path}`,
    () => queryAlternativeBlogCollection().path(route.path).first(),
  ),
]);

const alternativeLocale = computed(() => alternativePost.value ? otherLocale.value : null);

useLocalizedSeo({
  title: computed(() => post.value?.title),
  description: computed(() => post.value?.description),
});

useSeoMeta({
  ...post.value?.seo || {},
});
</script>
