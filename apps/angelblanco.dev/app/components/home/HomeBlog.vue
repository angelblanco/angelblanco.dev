<template>
  <div class="pr-2 pl-8 lg:p-0">
    <NuxtLinkLocale v-if="latestPost" :to="latestPost.path" class="mr-10 ml-15 lg:m-0">
      <div class="relative mx-auto mb-15 max-w-ui cursor-pointer transition lg:hover:scale-105">
        <div class="absolute top-2 right-2 -bottom-2 -left-2 z-2 bg-primary shadow-lg" />
        <div class="absolute top-4 right-4 -bottom-4 -left-4 z-1 bg-secondary shadow-lg" />
        <div class="absolute top-6 right-6 -bottom-6 -left-6 z-0 bg-info shadow-lg" />
        <div
          class="relative z-10 flex items-center border border-base-300 bg-base-200 p-4 shadow-lg hover:shadow"
        >
          <div class="flex-1">
            <div class="text-lg font-bold">
              {{ latestPost.title }}
            </div>
            <BlogPostMeta :post="latestPost" class="text-xs text-base-content/70" />

            <div class="mt-2 flex flex-wrap gap-1 font-mono text-xs font-medium">
              <span v-for="tag in latestPost.tags" :key="tag">#{{ tag }}</span>
            </div>
          </div>
          <Icon name="tabler:chevron-right" class="size-6 flex-none" />
        </div>
      </div>
    </NuxtLinkLocale>
  </div>

  <div v-if="otherPosts && otherPosts.length > 0" class="mx-auto mb-2 max-w-ui px-2 text-sm font-medium tracking-wide text-base-content/80 lg:p-0">
    {{ $t('Other entries') }}...
  </div>

  <div v-if="otherPosts" class="mx-auto mb-4 max-w-ui divide-y divide-base-300 border border-base-300">
    <NuxtLinkLocale
      v-for="post in otherPosts"
      :key="post.id" :to="post.path"
      class="flex cursor-pointer items-center gap-4 p-3 hover:bg-base-200"
    >
      <div class="flex-1">
        <div class="text-sm font-bold">
          {{ post.title }}
        </div>
        <BlogPostMeta :post="post" class="text-xs text-base-content/70" />
      </div>
      <Icon name="tabler:chevron-right" class="size-4 flex-none" />
    </NuxtLinkLocale>
  </div>
  <div class="mx-auto flex max-w-ui justify-end">
    <NuxtLinkLocale
      to="/blog"
      class="px-2 text-sm font-medium tracking-wide text-primary hover:underline lg:p-0"
    >
      {{ $t('Show more') }}
    </NuxtLinkLocale>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const { queryBlogPostSummaries } = useBlog();

const MAX_OTHER_POSTS_COUNT = 8;

const { data: latestPost } = await useAsyncData(
  `${route.path}` + `_latest`,
  () => queryBlogPostSummaries().first(),
);

const { data: otherPosts } = await useAsyncData(
  `${route.path}_other`,
  () => queryBlogPostSummaries().skip(1).limit(MAX_OTHER_POSTS_COUNT).all(),
);
</script>
