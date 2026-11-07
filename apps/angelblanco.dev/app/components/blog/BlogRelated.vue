<template>
  <section v-if="related.length" id="blog-related" class="mt-24 mb-8 border-t border-base-300 pt-10" aria-labelledby="blog-related-title">
    <h2 id="blog-related-title" class="mb-6 font-mono text-sm font-medium tracking-wide text-base-content/70 uppercase">
      {{ $t('blogRelatedPosts') }}
    </h2>
    <ul class="grid gap-6" :class="relatedPostsGridClass(related.length)">
      <li v-for="item in related" :key="item.id" class="group relative border-t-2 border-base-300 pt-3 transition-colors hover:border-primary">
        <BlogPostMeta :post="item" class="mb-1 text-xs text-base-content/70" />
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
const { post, posts } = defineProps<{
  post: Pick<BlogPostSummary, 'path' | 'date' | 'tags'>;
  posts: BlogPostSummary[];
}>();

const related = computed(() => relatedPosts(post, posts));
</script>
