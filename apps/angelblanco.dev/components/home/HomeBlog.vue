<template>
  <div class="ml-10 mr-5">
    <div class="max-w-ui mx-auto mb-15 lg:hover:scale-105 transition relative cursor-pointer">
      <div class="absolute shadow-lg top-2 right-2 -bottom-2 -left-2 bg-primary z-2" />
      <div class="absolute shadow-lg top-4 right-4 -bottom-4 -left-4 bg-secondary z-1" />
      <div class="absolute shadow-lg top-6 right-6 -bottom-6 -left-6 bg-info z-0" />
      <div class="relative shadow-lg z-10 bg-base-200 p-4 border border-base-300 flex items-center hover:shadow  cursor:pointer">
        <div class="flex-1">
          <div class="text-lg font-bold">
            La mejor configuración de eslint para 2025
          </div>
          <div class="text-xs text-base-content/70">
            29 Abril 2025 17:30
          </div>

          <div class="font-mono text-xs font-medium mt-2">
            #vue #typescript #js
          </div>
        </div>
        <Icon name="heroicons:chevron-right" class="size-6 flex-none" />
      </div>
    </div>
  </div>

  <div class="max-w-ui mx-auto font-medium tracking-wide text-sm text-base-content/80  mb-2">
    Otras entradas...
  </div>

  <div class="max-w-ui mx-auto lg:border border-base-300 divide-y divide-base-300 mb-16">
    <div v-for="article in articles" :key="article" class="p-3 flex gap-4 items-center">
      <div class="flex-1">
        <div class="font-bold text-sm">
          {{ article }}
        </div>
        <div class="text-xs text-base-content/70">
          29 Abril 2025 17:30
        </div>
      </div>
      <Icon name="heroicons:chevron-right" class="size-4 flex-none" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const articles = [
  'Laravel testing avanzado',
  'Manejo de fechas en Typescript explicado',
  'Scripting Aider',
  'PHPUnit vs Pest',
  'Vue 3 - Composition API',
];
</script>
