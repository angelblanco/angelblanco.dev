<template>
  <UiPageNotFound v-if="!posts?.length" />
  <div v-else class="mx-auto min-h-screen-content max-w-post p-4">
    <BlogIndexHeader>
      <template #title>
        {{ $t('blogTagTitle', { tag }) }}
      </template>
      <template #description>
        <NuxtLinkLocale to="/blog" class="inline-flex items-center gap-1 text-sm text-primary hover:underline">
          <Icon name="tabler:arrow-left" class="size-4" />
          {{ $t('blogAllPosts') }}
        </NuxtLinkLocale>
      </template>
    </BlogIndexHeader>
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
