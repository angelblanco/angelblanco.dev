import { describe, expect, it } from 'vitest';
import { mockI18n } from '../test-utils';

mockI18n();

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
