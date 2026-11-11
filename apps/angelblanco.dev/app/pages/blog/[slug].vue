<template>
  <UiPageNotFound v-if="!post" />
  <div v-else class="mx-auto min-h-screen-content max-w-post p-4">
    <BlogHeader :post="post" :alternative-locale="alternativeLocale" />

    <div class="prose max-w-none">
      <ContentRenderer :value="post" />
    </div>

    <BlogRelated :post="post" :posts="posts ?? []" />
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
  queryBlogPostSummaries,
} = useBlog();
const switchLocalePath = useSwitchLocalePath();
const path = withoutTrailingSlash(route.path);
const alternativePath = withoutTrailingSlash(switchLocalePath(otherLocale.value));

const [{ data: post }, { data: alternativePost }, { data: posts }] = await Promise.all([
  useAsyncData(
    `${locale.value}-main-${blogCollection.value}-${path}`,
    () => queryBlogCollection().path(path).first(),
  ),
  useAsyncData(
    `${locale.value}-alternative-${alternativeBlogCollection.value}-${alternativePath}`,
    () => queryAlternativeBlogCollection().path(alternativePath).first(),
  ),
  useAsyncData(
    `${blogCollection.value}-related-${path}`,
    () => queryBlogPostSummaries().where('path', '<>', path).all(),
  ),
]);

const event = useRequestEvent();
if (event && !post.value)
  setResponseStatus(event, 404);

const alternativeLocale = computed(() => alternativePost.value ? otherLocale.value : null);

const { ogImages } = useLocalizedSeo({
  title: computed(() => post.value?.title),
  description: computed(() => post.value?.description),
  cta: 'ogCtaArticle',
});

if (post.value) {
  useBlogPostSeo(post.value, alternativeLocale.value
    ? [locale.value, alternativeLocale.value]
    : [locale.value], ogImages);
}

useSeoMeta({
  ...post.value?.seo || {},
});
</script>
