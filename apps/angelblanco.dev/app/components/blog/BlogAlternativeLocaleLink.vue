<template>
  <div v-if="isAlternativeLocaleNavigatorLanguage" class="mb-4 text-secondary">
    <NuxtLink
      :to="$switchLocalePath(locale)"
      :hreflang="locale"
      class="flex items-center gap-1 bg-secondary/10 p-1 text-xs font-bold dark:font-medium"
    >
      <Icon name="tabler:language" class="size-4" /> <span>{{ $t('blogAlternativeLink') }}</span>
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  locale: 'es' | 'en';
}>();

const { isAlternativeLocaleNavigatorLanguage } = useLocale();
</script>
