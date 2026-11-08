<template>
  <div>
    <h1 class="mt-5 text-[26px]/[34px] font-medium tracking-[-0.015em] text-balance text-(--ink)">
      {{ post.title }}
    </h1>
    <BlogPostMeta :post="post" class="mt-2 text-[13px] text-(--grey)">
      <span aria-hidden="true">·</span>
      <NuxtLinkLocale to="/about" class="hover:text-primary">
        {{ $t('blogAuthoredBy') }}
      </NuxtLinkLocale>
    </BlogPostMeta>
    <BlogTags :tags="post.tags" class="mt-3 mb-6" />

    <div v-if="alternativeLocale || post.body.toc?.links.length" class="mb-2 divide-y divide-(--hair) border-y border-(--hair) text-[13px]/5 text-(--grey)">
      <NuxtLink
        v-if="alternativeLocale"
        :to="$switchLocalePath(alternativeLocale)"
        :hreflang="alternativeLocale"
        class="flex items-center gap-1.5 py-2 transition-colors hover:text-(--ink)"
      >
        <Icon name="tabler:language" class="size-3.5" /> <span>{{ $t('blogAlternativeLink') }}</span>
      </NuxtLink>
      <BlogToc v-if="post.body.toc" :toc="post.body.toc" />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  post: BlogCollectionItem;
  alternativeLocale?: 'es' | 'en' | null;
}>();
</script>
