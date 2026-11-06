<template>
  <div>
    <h1 class="mt-5 text-4xl font-semibold tracking-normal text-pretty md:text-4xl">
      {{ post.title }}
    </h1>
    <BlogPostMeta :post="post" class="mt-2 text-sm font-light text-base-content/60">
      <span aria-hidden="true">·</span>
      <NuxtLinkLocale to="/about" class="hover:text-primary">
        {{ $t('blogAuthoredBy') }}
      </NuxtLinkLocale>
    </BlogPostMeta>
    <BlogTags :tags="post.tags" class="mt-3 mb-8" />

    <div v-if="alternativeLocale" class="mb-4 text-secondary">
      <SwitchLocalePathLink class="flex items-center gap-1 bg-secondary/10 p-1 text-xs font-bold dark:font-medium" :locale="alternativeLocale">
        <Icon name="tabler:language" class="size-4" /> <span>{{ $t('blogAlternativeLink') }}</span>
      </SwitchLocalePathLink>
    </div>
    <BlogToc v-if="post.body.toc" :toc="post.body.toc" />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  post: BlogCollectionItem;
  alternativeLocale?: 'es' | 'en' | null;
}>();
</script>
