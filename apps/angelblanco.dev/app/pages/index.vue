<template>
  <HomeHero />
  <HomeBlog />
  <div class="mb-32" />
</template>

<script lang="ts" setup>
useLocalizedSeo({
  title: 'nuxtSiteConfig.name',
  description: 'nuxtSiteConfig.description',
});
</script>
