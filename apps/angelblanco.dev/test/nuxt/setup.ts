import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { vi } from 'vitest';
import { computed, ref } from 'vue';

const locale = ref('en');
const localeProperties = computed(() => ({
  code: locale.value,
  language: locale.value === 'es'
    ? 'es-ES'
    : 'en-US',
}));

mockNuxtImport('useI18n', () => vi.fn(() => ({
  t: (key: string) => key,
  locale,
  localeProperties,
  setLocale(value: string) {
    locale.value = value;
  },
})));
