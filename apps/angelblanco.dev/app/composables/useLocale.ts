export function useLocale() {
  const { locale } = useI18n();

  return {
    locale,
    alternativeLocale: computed<'es' | 'en'>(() => locale.value === 'es' ? 'en' : 'es'),
  };
}
