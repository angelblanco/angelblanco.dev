import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { vi } from 'vitest';

export function mockI18n() {
  const { useI18n } = vi.hoisted(() => {
    const locale = { value: 'en' };

    return {
      useI18n: vi.fn(() => {
        return {
          t: (s: string) => s,
          locale,
          setLocale(value: string) {
            locale.value = value;
          },
        };
      }),
    };
  });

  mockNuxtImport('useI18n', () => {
    return useI18n;
  });
}
