<template>
  <div>
    <h1 class="mt-5 text-2xl font-bold tracking-tight text-pretty md:text-3xl lg:text-5xl">
      {{ post.title }}
    </h1>
    <div class="my-2 text-sm font-medium ">
      {{ createdAt }} - <NuxtLinkLocale to="/about" class="hover:text-primary">
        {{ $t('blogAuthoredBy') }}
      </NuxtLinkLocale>
    </div>

    <div v-if="alternativeLocale" class="mb-4 text-secondary">
      <SwitchLocalePathLink class="flex items-center gap-1 bg-secondary/10 p-1 text-xs font-bold dark:font-medium" :locale="alternativeLocale">
        <Icon name="i-heroicons:language" class="size-4" /> <span>{{ $t('blogAlternativeLink') }}</span>
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
