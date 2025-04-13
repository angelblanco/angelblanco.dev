<template>
  <div>
    Tag: {{ tag }}
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { tag } = route.params;
</script>
