<template>
  <div>
    <h1 class="mt-5 text-4xl font-semibold tracking-normal text-balance md:text-4xl">
      {{ post.title }}
    </h1>
    <div class="mt-2 mb-8 text-sm font-light opacity-60 ">
      {{ createdAt }} - <NuxtLinkLocale to="/about" class="hover:text-primary">
        {{ $t('blogAuthoredBy') }}
      </NuxtLinkLocale>
    </div>

    <div v-if="alternativeLocale" class="mb-4 text-secondary">
      <SwitchLocalePathLink class="flex items-center gap-1 bg-secondary/10 p-1 text-xs font-bold dark:font-medium" :locale="alternativeLocale">
        <Icon name="tabler:language" class="size-4" /> <span>{{ $t('blogAlternativeLink') }}</span>
      </SwitchLocalePathLink>
    </div>
    <BlogToc v-if="post.body.toc" :toc="post.body.toc" />
  </div>
</template>

<script lang="ts" setup>
const { post, alternativeLocale } = defineProps<{
  post: BlogCollectionItem;
  alternativeLocale?: 'es' | 'en' | null;
}>();

const createdAt = computed(() => dayjs(post.date).format('LL'));
</script>
