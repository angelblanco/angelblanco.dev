<template>
  <Story>
    <NavBar v-model:locale="locale" />
  </Story>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NavBar from './UiNavBar.vue';

const locale = ref<'es' | 'en'>('es');
</script>
