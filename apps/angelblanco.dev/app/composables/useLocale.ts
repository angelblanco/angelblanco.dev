import { useMounted, useNavigatorLanguage } from '@vueuse/core';

export function useLocale() {
  const { locale } = useI18n();
  const alternativeLocale = computed<'es' | 'en'>(() => locale.value === 'es'
    ? 'en'
    : 'es');

  const isMounted = useMounted();
  const { language } = useNavigatorLanguage();

  const isAlternativeLocaleNavigatorLanguage = computed(() =>
    isMounted.value && language.value?.toLowerCase().split('-')[0] === alternativeLocale.value,
  );

  return {
    locale,
    alternativeLocale,
    isAlternativeLocaleNavigatorLanguage,
  };
}
