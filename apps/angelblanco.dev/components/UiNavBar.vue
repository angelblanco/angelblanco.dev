<template>
  <div class="sticky top-0 z-30">
    <nav class="navbar bg-base-100 border-b border-base-300 h-">
      <div class="max-w-ui mx-auto gap-2 flex-1 flex items-center">
        <div class="flex-1 flex gap-2">
          <button class="btn">
            O
          </button>
          <a class="btn btn-ghost text-xl font-mono">angelblanco.dev</a>
        </div>

        <div class="flex justify-center">
          <div role="tablist" class="tabs tabs-box max-md:tabs-sm">
            <a v-for="option in localeOptions" :key="option.value" role="tab" class="tab" :class="{ 'tab-active': locale === option.value }" @click="locale = option.value">{{ option.label }}</a>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
type Locale = 'es' | 'en';

const locale = defineModel<Locale>('locale', { required: true });

const localeOptions = [
  { value: 'es', label: 'ES' },
  { value: 'en', label: 'EN' },
];
</script>
