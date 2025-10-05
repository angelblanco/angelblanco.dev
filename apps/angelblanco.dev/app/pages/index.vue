<template>
  <div class="min-h-screen-content">
    <HomeHero />
    <HomeBlog />
    <div class="mb-32" />
  </div>
</template>

<script lang="ts" setup>
useLocalizedSeo({
  title: 'nuxtSiteConfig.name',
  description: 'nuxtSiteConfig.description',
});
</script>
