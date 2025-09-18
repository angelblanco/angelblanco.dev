<template>
  <NuxtLinkLocale v-if="latestPost" :to="latestPost.path" class="ml-10 mr-5 lg:m-0">
    <div class="max-w-ui mx-auto mb-15 lg:hover:scale-105 transition relative cursor-pointer">
      <div class="absolute shadow-lg top-2 right-2 -bottom-2 -left-2 bg-primary z-2" />
      <div class="absolute shadow-lg top-4 right-4 -bottom-4 -left-4 bg-secondary z-1" />
      <div class="absolute shadow-lg top-6 right-6 -bottom-6 -left-6 bg-info z-0" />
      <div
        class="relative shadow-lg z-10 bg-base-200 p-4 border border-base-300 flex items-center hover:shadow  cursor:pointer"
      >
        <div class="flex-1">
          <div class="text-lg font-bold">
            {{ latestPost.title }}
          </div>
          <div class="text-xs text-base-content/70">
            {{ dayjs(latestPost.date).format('LL') }}
          </div>

          <div class="font-mono text-xs font-medium mt-2 flex gap-1 flex-wrap">
            <span v-for="tag in latestPost.tags" :key="tag">#{{ tag }}</span>
          </div>
        </div>
        <Icon name="heroicons:chevron-right" class="size-6 flex-none" />
      </div>
    </div>
  </NuxtLinkLocale>

  <div class="max-w-ui mx-auto font-medium tracking-wide text-sm text-base-content/80 px-2 lg:p-0 mb-2">
    {{ $t('Other entries') }}...
  </div>

  <div v-if="otherPosts" class="max-w-ui mx-auto lg:border border-base-300 divide-y divide-base-300 mb-4">
    <NuxtLinkLocale
      v-for="post in otherPosts"
      :key="post.id" :to="post.path"
      class="p-3 flex gap-4 items-center hover:bg-base-200 cursor-pointer"
    >
      <div class="flex-1">
        <div class="font-bold text-sm">
          {{ post.title }}
        </div>
        <div class="text-xs text-base-content/70">
          {{ dayjs(post.date).format('LL') }}
        </div>
      </div>
      <Icon name="heroicons:chevron-right" class="size-4 flex-none" />
    </NuxtLinkLocale>
  </div>
  <div class="max-w-ui mx-auto flex lg:justify-end">
    <NuxtLinkLocale
      to="/blog"
      class="font-medium tracking-wide text-sm px-2 lg:p-0 text-primary hover:underline"
    >
      {{ $t('Show more') }}
    </NuxtLinkLocale>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const { queryBlogCollection } = useBlog();

const MAX_OTHER_POSTS_COUNT = 8;

function queryHomeBlog() {
  return queryBlogCollection()
    .select('path', 'title', 'description', 'date', 'id', 'tags', 'post_id')
    .order('post_id', 'DESC');
}

const { data: latestPost } = await useAsyncData(
  `${route.path}` + `_latest`,
  () => queryHomeBlog().first(),
);

const { data: otherPosts } = await useAsyncData(
  `${route.path}_other`,
  () => queryHomeBlog().skip(1).limit(MAX_OTHER_POSTS_COUNT).all(),
);
</script>
