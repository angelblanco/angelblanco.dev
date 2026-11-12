import { mountSuspended } from '@nuxt/test-utils/runtime';
import { afterEach, describe, expect, it } from 'vitest';
import { defineComponent, h } from 'vue';

describe('composables: useLocale', () => {
  it('with locale en', async () => {
    const { setLocale } = useI18n();
    await setLocale('en');

    const { locale, alternativeLocale } = useLocale();
    expect(locale.value).toBe('en');
    expect(alternativeLocale.value).toBe('es');
  });

  it('with locale es', async () => {
    const { setLocale } = useI18n();
    await setLocale('es');
    const { locale, alternativeLocale } = useLocale();
    expect(locale.value).toBe('es');
    expect(alternativeLocale.value).toBe('en');
  });
});

const Probe = defineComponent({
  setup() {
    const { isAlternativeLocaleNavigatorLanguage } = useLocale();
    return () => h('span', String(isAlternativeLocaleNavigatorLanguage.value));
  },
});

describe('composables: useLocale isAlternativeLocaleNavigatorLanguage', () => {
  afterEach(() => {
    Reflect.deleteProperty(navigator, 'language');
  });

  it.each([
    ['en', 'es-ES', 'true'],
    ['en', 'es', 'true'],
    ['en', 'en-US', 'false'],
    ['en', 'fr-FR', 'false'],
    ['es', 'en-GB', 'true'],
    ['es', 'es-ES', 'false'],
  ] as const)('on locale %s with navigator %s is %s', async (locale, language, expected) => {
    await useI18n().setLocale(locale);
    Object.defineProperty(navigator, 'language', {
      configurable: true,
      get: () => language,
    });

    const wrapper = await mountSuspended(Probe);

    expect(wrapper.text()).toBe(expected);
  });
});
