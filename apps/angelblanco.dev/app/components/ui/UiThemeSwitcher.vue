<template>
  <ClientOnly>
    <label class="swap swap-rotate btn btn-ghost btn-square" @click="toggleTheme">
      <Icon
        name="heroicons:sun"
        class="fill-current"
        :class="[lightTheme ? 'swap-on' : 'swap-off', props.iconSize]"
      />
      <Icon
        name="heroicons:moon"
        class="fill-current"
        :class="[lightTheme ? 'swap-off' : 'swap-on', props.iconSize]"
      />
    </label>
  </ClientOnly>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    iconSize?: string;
  }>(),
  {
    iconSize: 'size-8',
  },
);

const colorMode = useColorMode();

function toggleTheme() {
  colorMode.preference = colorMode.value === 'light' ? 'dark' : 'light';
}

const lightTheme = computed(() => colorMode.value === 'light');
</script>
