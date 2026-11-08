const FONTS = ['switzer', 'geist', 'inter'] as const;
type Font = typeof FONTS[number];

const isFont = (value: unknown): value is Font => FONTS.includes(value as Font);

export default defineNuxtPlugin(() => {
  const route = useRoute();
  const cookie = useCookie<Font>('font', {
    default: () => 'switzer',
    maxAge: 60 * 60 * 24 * 30,
  });

  const font = computed<Font>(() => {
    const fromQuery = route.query.font;
    return isFont(fromQuery)
      ? fromQuery
      : isFont(cookie.value)
        ? cookie.value
        : 'switzer';
  });

  watch(font, value => (cookie.value = value), { immediate: true });

  useHead({
    htmlAttrs: { 'data-font': font },
  });
});
