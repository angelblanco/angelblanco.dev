import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { vi } from 'vitest';

const locale = { value: 'en' };

mockNuxtImport('useI18n', () => vi.fn(() => ({
  t: (key: string) => key,
  locale,
  setLocale(value: string) {
    locale.value = value;
  },
})));
