<template>
  <span>
    <template v-for="(part, index) in parts" :key="index">
      <mark v-if="part.match" class="rounded-[0.2em] bg-primary/20 text-current dark:bg-primary/25">{{ part.text }}</mark>
      <span v-else>{{ part.text }}</span>
    </template>
  </span>
</template>

<script lang="ts" setup>
const { text, terms } = defineProps<{
  text: string;
  terms: string[];
}>();

const parts = computed(() => highlightParts(text, terms));
</script>
