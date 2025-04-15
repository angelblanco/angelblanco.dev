<template>
  <div class="hero bg-base-200 min-h-screen">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">
          {{ props.title }}
        </h1>
        <p class="py-6">
          {{ props.description }}
        </p>

        <div class="flex gap-2 justify-center">
          <slot name="callToAction" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  description: string;
}>();
</script>
