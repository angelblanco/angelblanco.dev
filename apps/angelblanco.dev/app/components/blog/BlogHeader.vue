<template>
  <div>
    <h1 class="tracking-tight font-bold text-5xl mt-5 text-pretty">
      {{ props.post.title }}
    </h1>
    <div class="mb-10 mt-2 text-sm">
      {{ createdAt }} - {{ $t('blogAuthoredBy') }}
    </div>

    <div v-if="props.alternativeLocale">
      <SwitchLocalePathLink :locale="props.alternativeLocale">
        {{ $t('blogAlternativeLink') }} <Icon name="i-heroicons:language" class="size-5" />
      </SwitchLocalePathLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { BlogCollectionItem } from '@nuxt/content';

const props = defineProps<{
  post: BlogCollectionItem;
  alternativeLocale?: 'es' | 'en' | null;
}>();

const createdAt = computed(() => dayjs(props.post.date).format('LL'));
</script>
