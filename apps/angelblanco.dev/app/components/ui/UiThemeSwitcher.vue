<template>
  <ClientOnly>
    <label class="swap swap-rotate btn btn-ghost btn-square" @click="toggleTheme">
      <Icon
        name="heroicons:sun"
        class="fill-current"
        :class="[lightTheme ? 'swap-on' : 'swap-off', iconSize]"
      />
      <Icon
        name="heroicons:moon"
        class="fill-current"
        :class="[lightTheme ? 'swap-off' : 'swap-on', iconSize]"
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
  colorMode.preference = colorMode.value === 'light' ? 'dark' : 'light';
}

const lightTheme = computed(() => colorMode.value === 'light');
</script>
