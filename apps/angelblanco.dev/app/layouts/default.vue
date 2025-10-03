<template>
  <div>
    <UiNavBar />
    <slot />
    <UiFooter />
  </div>
</template>

<script lang="ts" setup>
defineOgImageComponent('PortfolioOgImage');
</script>
