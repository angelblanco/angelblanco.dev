<template>
  <ClientOnly>
    <button
      id="theme-switcher"
      type="button"
      class="group swap size-10 swap-rotate cursor-pointer rounded-field transition-colors hover:bg-base-300 focus-visible:outline-2 focus-visible:outline-primary"
      :aria-label="t('a11yDarkTheme')"
      :aria-pressed="!lightTheme"
      @click="toggleTheme"
    >
      <Icon
        name="tabler:sun"
        :class="[lightTheme ? 'swap-on' : 'swap-off', iconSize]"
      />
      <Icon
        name="tabler:moon-stars"
        :class="[lightTheme ? 'swap-off' : 'swap-on', iconSize]"
      />
    </button>
  </ClientOnly>
</template>

<script lang="ts" setup>
const { iconSize = 'size-8' } = defineProps<{
  iconSize?: string;
}>();

const { t } = useI18n();
const colorMode = useColorMode();
const { toggleTheme } = useThemeTransition();

const lightTheme = computed(() => colorMode.value === 'light');
</script>
