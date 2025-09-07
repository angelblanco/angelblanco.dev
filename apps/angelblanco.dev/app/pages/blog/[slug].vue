<template>
  <UiPageNotFound v-if="!page.post" />
  <div v-else class="min-h-screen-content mx-auto max-w-ui p-4">
    <BlogHeader :post="page.post" :alternative-locale="page.alternativeLocale" />

    <div class="prose max-w-none lg:prose-lg">
      <ContentRenderer v-if="page.post" :value="page.post" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { BlogCollectionItem } from '@nuxt/content';

const route = useRoute();

const { slug } = route.params;
const { locale } = useI18n();

const { data: esPost } = await useAsyncData(() => queryCollection('blog').path(`/blog/es/${slug}`).first());
const { data: enPost } = await useAsyncData(() => queryCollection('blog').path(`/blog/en/${slug}`).first());

const page = computed<{
  post: BlogCollectionItem | null;
  alternativeLocale: 'es' | 'en' | null;
}>(() => {
  let post = locale.value === 'en' ? enPost.value ?? null : esPost.value ?? null;

  let alternativePost: BlogCollectionItem | null = locale.value === 'es' ? esPost.value ?? null : enPost.value ?? null;

  if (!post && alternativePost) {
    post = alternativePost;
    alternativePost = null;
  }

  const alternativeLocale = alternativePost ? (locale.value === 'en' ? 'es' : 'en') : null;

  return {
    post: post ?? null,
    alternativeLocale,
  };
});

useSeoMeta({
  title: page.value.post?.title,
  description: page.value.post?.description,
  ogImage: page.value.post?.image,
});
</script>
