<template>
  <div>
    <h1 class="mt-5 text-4xl font-semibold tracking-normal text-pretty md:text-4xl">
      {{ post.title }}
    </h1>
    <BlogPostMeta :post="post" class="mt-2 text-sm font-light text-base-content/70">
      <span aria-hidden="true">·</span>
      <NuxtLinkLocale to="/about" class="hover:text-primary">
        {{ $t('blogAuthoredBy') }}
      </NuxtLinkLocale>
    </BlogPostMeta>
    <BlogTags :tags="post.tags" class="mt-3 mb-8" />

    <BlogAlternativeLocaleLink v-if="alternativeLocale" :locale="alternativeLocale" />
    <BlogToc v-if="post.body.toc" :toc="post.body.toc" />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  post: BlogCollectionItem;
  alternativeLocale?: 'es' | 'en' | null;
}>();
</script>
