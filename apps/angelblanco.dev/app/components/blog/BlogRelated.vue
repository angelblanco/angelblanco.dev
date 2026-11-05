<template>
  <section v-if="related.length" id="blog-related" class="mt-16 border-t border-base-300 pt-8" aria-labelledby="blog-related-title">
    <h2 id="blog-related-title" class="mb-6 text-2xl font-semibold tracking-tight">
      {{ $t('blogRelatedPosts') }}
    </h2>
    <BlogPostList :posts="related" heading-tag="h3" />
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
