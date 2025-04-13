<script lang="ts" setup>
import { MoonIcon, SunIcon } from '@heroicons/vue/24/outline';

const lightTheme = defineModel<boolean>('lightTheme', { required: true });
</script>

<template>
  <label class="swap swap-rotate" @click="lightTheme = !lightTheme">
    <SunIcon
      class="h-10 w-10 fill-current"
      :class="lightTheme ? 'swap-on' : 'swap-off'"
    />
    <MoonIcon
      class="h-10 w-10 fill-current"
      :class="lightTheme ? 'swap-off' : 'swap-on'"
    />
  </label>
</template>
