<template>
  <div class="hero bg-base-100 min-h-lvh">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">
          {{ title }}
        </h1>
        <p class="py-6">
          {{ description }}
        </p>

        <div class="flex gap-2 justify-center">
          <slot name="callToAction" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { title, description } = defineProps<{
  title: string;
  description: string;
}>();
</script>
