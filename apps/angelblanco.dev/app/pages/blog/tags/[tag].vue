<template>
  <UiPageNotFound v-if="!posts?.length" />
  <div v-else class="mx-auto min-h-screen-content max-w-post p-4">
    <header class="mt-5 mb-10">
      <BlogBackLink to="/blog/tags">
        {{ $t('blogAllTopics') }}
      </BlogBackLink>
      <h1 class="font-mono text-5xl font-bold tracking-tighter wrap-break-word sm:text-7xl lg:ml-[-1ch]">
        <span class="sr-only">{{ `${$t('blogTaggedPrefix')} ` }}</span>
        <span class="font-light text-primary">#</span>{{ tag }}
      </h1>
      <p class="mt-3 font-mono text-sm text-base-content/70">
        {{ $t('blogArticleCount', posts.length) }}
      </p>
    </header>
    <BlogPostList :posts="posts" />
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const { t } = useI18n();
const { queryBlogPostSummaries } = useBlog();

const tag = computed(() => String(route.params.tag));

const { data: posts } = await useAsyncData(
  route.path,
  () => queryBlogPostSummaries().where('tags', 'LIKE', `%"${tag.value}"%`).all(),
);

useLocalizedSeo({
  title: computed(() => t('blogTagTitle', { tag: tag.value })),
  description: computed(() => t('blogTagDescription', { tag: tag.value })),
  cta: 'ogCtaBlog',
});
</script>
