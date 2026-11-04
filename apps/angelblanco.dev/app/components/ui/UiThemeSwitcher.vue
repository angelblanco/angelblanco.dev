<template>
  <ClientOnly>
    <label id="theme-switcher" class="group swap size-10 swap-rotate cursor-pointer rounded-field transition-colors hover:bg-base-300" @click="toggleTheme">
      <Icon
        name="tabler:sun"
        :class="[lightTheme ? 'swap-on' : 'swap-off motion-safe:group-hover:rotate-12', iconSize]"
      />
      <Icon
        name="tabler:moon-stars"
        :class="[lightTheme ? 'swap-off motion-safe:group-hover:-rotate-12' : 'swap-on', iconSize]"
      />
    </label>
  </ClientOnly>
</template>

<script lang="ts" setup>
const { iconSize = 'size-8' } = defineProps<{
  iconSize?: string;
}>();

const colorMode = useColorMode();

function toggleTheme() {
  colorMode.preference = colorMode.value === 'light'
    ? 'dark'
    : 'light';
}

const lightTheme = computed(() => colorMode.value === 'light');
</script>
