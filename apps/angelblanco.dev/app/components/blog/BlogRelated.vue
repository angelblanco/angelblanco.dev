<template>
  <section v-if="related.length" id="blog-related" class="mt-24 mb-8 border-t border-base-300 pt-10" aria-labelledby="blog-related-title">
    <h2 id="blog-related-title" class="mb-6 font-mono text-sm font-medium tracking-wide text-base-content/60 uppercase">
      {{ $t('blogRelatedPosts') }}
    </h2>
    <ul class="grid gap-6 sm:grid-cols-3">
      <li v-for="item in related" :key="item.id" class="group relative border-t-2 border-base-300 pt-3 transition-colors hover:border-primary">
        <BlogPostMeta :post="item" class="mb-1 text-xs text-base-content/60" />
        <h3 class="leading-snug font-semibold text-pretty">
          <NuxtLink :to="item.path" class="transition-colors group-hover:text-primary after:absolute after:inset-0">
            {{ item.title }}
          </NuxtLink>
        </h3>
      </li>
    </ul>
  </section>
</template>

<script lang="ts" setup>
const { post } = defineProps<{
  post: Pick<BlogCollectionItem, 'path' | 'date' | 'tags'>;
}>();

const { blogCollection, queryBlogPostSummaries } = useBlog();

const { data: posts } = await useAsyncData(
  `${blogCollection.value}-related-${post.path}`,
  () => queryBlogPostSummaries().where('path', '<>', post.path).all(),
);

const related = computed(() => relatedPosts(post, posts.value ?? []));
</script>
