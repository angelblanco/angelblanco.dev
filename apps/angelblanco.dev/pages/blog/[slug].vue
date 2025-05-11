<template>
  <UiPageNotFound v-if="!currentPost" />
  <div v-else class="min-h-screen-content mx-auto max-w-ui p-4">
    <h1 class="tracking-tight font-medium text-5xl mt-5 text-pretty">
      {{ currentPost.title }}
    </h1>
    <div class="mb-10 mt-4 text-sm">
      Created on: {{ currentPost.date }}
    </div>

    <div class="prose max-w-none lg:prose-lg">
      <ContentRenderer v-if="currentPost" :value="currentPost" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();

const { slug } = route.params;
const { locale } = useI18n();

const { data: esPost } = await useAsyncData(() => queryCollection('blog').path(`/blog/es/${slug}`).first());
const { data: enPost } = await useAsyncData(() => queryCollection('blog').path(`/blog/en/${slug}`).first());

let currentPost = enPost;
let isCurrentLocale = locale.value === 'en';
let hasAlterntiveVersion = isCurrentLocale && esPost;
if (locale.value === 'es' || !enPost) {
  currentPost = esPost;
  isCurrentLocale = locale.value === 'es';
  hasAlterntiveVersion = isCurrentLocale && enPost;
}

useSeoMeta({
  title: currentPost.value?.title,
  description: currentPost.value?.description,
  ogImage: currentPost.value?.image,
});
</script>
