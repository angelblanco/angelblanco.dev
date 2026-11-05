<template>
  <AboutBrief class="slide-enter" />
  <AboutTech class="slide-enter [--enter-stage:3]" />
</template>

<script lang="ts" setup>
useLocalizedSeo({
  title: 'About',
  description: 'AboutDescription',
  cta: 'ogCtaAbout',
});
</script>
