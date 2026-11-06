<template>
  <NuxtLinkLocale :to="to" class="mb-6 inline-flex items-center gap-1 font-mono text-sm text-base-content/70 transition-colors hover:text-primary">
    <Icon name="tabler:arrow-left" class="size-4" />
    <slot />
  </NuxtLinkLocale>
</template>

<script lang="ts" setup>
defineProps<{
  to: string;
}>();
</script>
