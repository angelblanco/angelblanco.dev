<template>
  <span class="inline-flex items-center gap-1">
    <Icon name="tabler:clock" class="size-3.5" />
    {{ $t('blogReadingTime', { minutes }) }}
  </span>
</template>

<script lang="ts" setup>
defineProps<{
  minutes: number;
}>();
</script>
