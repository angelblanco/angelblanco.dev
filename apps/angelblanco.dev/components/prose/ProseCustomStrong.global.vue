<template>
  <strong :class="strongClass">
    <slot />
  </strong>
</template>

<script lang="ts" setup>
import proseStrongCounter from './proseStrongCounter';

const counter = proseStrongCounter();

const strongClass = `strong-child-${counter}`;
</script>
