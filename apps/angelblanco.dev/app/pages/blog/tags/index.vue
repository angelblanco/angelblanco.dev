<template>
  <div class="mx-auto min-h-screen-content max-w-post p-4">
    <BlogIndexHeader>
      <template #back>
        <BlogBackLink to="/blog">
          {{ $t('blogAllPosts') }}
        </BlogBackLink>
      </template>
      <template #title>
        {{ $t('blogTopics') }}
      </template>
      <template #description>
        {{ $t('blogTopicsDescription') }}
      </template>
    </BlogIndexHeader>
    <ol class="divide-y divide-base-300 border-y border-base-300 font-mono">
      <li v-for="{ tag, count } in tags" :key="tag">
        <NuxtLinkLocale :to="`/blog/tags/${tag}`" class="group flex items-baseline gap-3 py-4 transition-colors hover:text-primary">
          <span class="text-xl font-semibold sm:text-2xl">
            <span class="font-light text-primary">#</span>{{ tag }}
          </span>
          <span class="flex-1 border-b border-dotted border-base-content/25 group-hover:border-primary/50" aria-hidden="true" />
          <span class="text-sm text-base-content/70 group-hover:text-primary">{{ $t('blogArticleCount', count) }}</span>
        </NuxtLinkLocale>
      </li>
    </ol>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const { queryBlogCollection } = useBlog();

const { data: posts } = await useAsyncData(route.path, () => queryBlogCollection().select('tags').all());

const tags = computed(() => tagCounts(posts.value ?? []));

useLocalizedSeo({
  title: 'blogTopics',
  description: 'blogTopicsDescription',
  cta: 'ogCtaBlog',
});

useSchemaOrg([
  defineWebPage({ '@type': 'CollectionPage' }),
]);
</script>
