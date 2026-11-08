<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import '@angelblanco/fonts';
import '@fontsource-variable/geist';

useFeeds().useFeedLinks();
</script>
