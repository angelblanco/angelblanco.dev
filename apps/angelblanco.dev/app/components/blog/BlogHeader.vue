<template>
  <div>
    <h1 class="tracking-tight font-bold text-5xl mt-5 text-pretty">
      {{ props.post.title }}
    </h1>
    <div class="mb-2 mt-2 text-sm font-medium ">
      {{ createdAt }} - <NuxtLinkLocale to="/about" class="hover:text-primary">
        {{ $t('blogAuthoredBy') }}
      </NuxtLinkLocale>
    </div>

    <div v-if="props.alternativeLocale" class="mb-4 text-secondary">
      <SwitchLocalePathLink class="flex gap-1 items-center font-bold dark:font-medium text-xs bg-secondary/10 p-1" :locale="props.alternativeLocale">
        <Icon name="i-heroicons:language" class="size-4" /> <span>{{ $t('blogAlternativeLink') }}</span>
      </SwitchLocalePathLink>
    </div>
    <BlogToc v-if="props.post.body.toc" :toc="props.post.body.toc" />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  post: BlogCollectionItem;
  alternativeLocale?: 'es' | 'en' | null;
}>();

const createdAt = computed(() => dayjs(props.post.date).format('LL'));
</script>
