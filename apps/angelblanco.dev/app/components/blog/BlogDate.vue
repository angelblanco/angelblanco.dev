<template>
  <NuxtTime :datetime="date" :locale="localeProperties.language" date-style="long" time-zone="UTC" />
</template>

<script lang="ts" setup>
defineProps<{
  date: string;
}>();

const { localeProperties } = useI18n();
</script>
