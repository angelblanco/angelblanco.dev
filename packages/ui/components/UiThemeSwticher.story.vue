<script setup>
import { ref } from 'vue'
import ThemeSwitcher from './UiThemeSwitcher.vue'

const lightTheme = ref(true)
</script>

<template>
  <Story>
    <ThemeSwitcher v-model:light-theme="lightTheme" />
  </Story>
</template>
