<template>
  <nav class="navbar bg-base-100 shadow-sm">
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
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';

type Locale = 'es' | 'en';

const locale = defineModel<Locale>('locale', { required: true });

const localeOptions = [
  { value: 'es', label: 'ES' },
  { value: 'en', label: 'EN' },
];

const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const closeMenu = () => {
  isOpen.value = false;
};
</script>
