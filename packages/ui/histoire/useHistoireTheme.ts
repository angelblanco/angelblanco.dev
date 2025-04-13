import { useStorage } from '@vueuse/core';
import { isDark, toggleDark } from 'histoire/client';
import { computed, ref } from 'vue';

export default function useHistoireTheme() {
  const lightTheme = 'light';
  const darkTheme = 'dark';

  const availableThemes = ref([lightTheme, darkTheme]);

  const theme = useStorage<string>('histoire:theme', availableThemes.value[0]);

  function verifyTheme() {
    if (!availableThemes.value.includes(theme.value)) {
      theme.value = availableThemes.value[0];
    }
  }

  function syncTheme() {
    if (isDark()) {
      theme.value = darkTheme;
    }
    else {
      theme.value = lightTheme;
    }
  }

  function setTheme(newTheme: string) {
    if (availableThemes.value.includes(newTheme)) {
      theme.value = newTheme;

      if (newTheme === darkTheme) {
        toggleDark(true);
      }
      else {
        toggleDark(false);
      }
    }
  }

  const isLightThemeSelected = computed(() => theme.value === lightTheme);
  const isDarkThemeSelected = computed(() => theme.value === darkTheme);

  function toggleTheme() {
    if (isLightThemeSelected.value) {
      setTheme(darkTheme);
    }
    else {
      setTheme(lightTheme);
    }
  }

  return {
    theme,
    availableThemes,
    syncTheme,
    verifyTheme,
    lightTheme,
    darkTheme,
    setTheme,
    isLightThemeSelected,
    isDarkThemeSelected,
    toggleTheme,
  };
}
