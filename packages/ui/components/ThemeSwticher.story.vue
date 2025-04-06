<script setup>
import ThemeSwitcher from "./ThemeSwitcher.vue";
import { ref } from "vue";

const lightTheme = ref(true);
</script>

<template>
  <Story>
    <ThemeSwitcher v-model:light-theme="lightTheme" />
  </Story>
</template>
