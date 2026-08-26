<template>
  <div>
    <UiNavBar />
    <slot />
    <UiFooter />
  </div>
</template>

<script lang="ts" setup>
defineOgImage('PortfolioOgImage');
</script>
