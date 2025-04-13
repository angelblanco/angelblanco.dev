<script setup>
import useHistoireTheme from '../histoire/useHistoireTheme';
import ThemeSwitcher from './UiThemeSwitcher.vue';

const { toggleTheme, isLightThemeSelected } = useHistoireTheme();
</script>

<template>
  <Story :meta="{ wrapper: true }">
    <ThemeSwitcher :light-theme="isLightThemeSelected" @update:light-theme="toggleTheme()" />
  </Story>
</template>
