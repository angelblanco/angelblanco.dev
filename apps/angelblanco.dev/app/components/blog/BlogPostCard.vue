<template>
  <article class="group relative border border-base-300 bg-base-200 p-5 transition hover:border-primary/60 hover:shadow-lg sm:p-6">
    <BlogPostMeta :post="post" class="mb-2 text-xs text-base-content/70" />
    <component :is="headingTag" class="text-2xl font-bold tracking-tight text-pretty">
      <NuxtLink :to="post.path" class="group-hover:gradient-text after:absolute after:inset-0">
        {{ post.title }}
      </NuxtLink>
    </component>
    <p v-if="post.description" class="mt-3 leading-7 text-pretty text-base-content/80">
      {{ post.description }}
    </p>
    <BlogTags :tags="post.tags" class="mt-4" />
  </article>
</template>

<script lang="ts" setup>
const { headingTag = 'h2' } = defineProps<{
  post: BlogPostSummary;
  headingTag?: 'h2' | 'h3';
}>();
</script>
