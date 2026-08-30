type MayBeTransKeyOrRef = string | Ref | ComputedRef;

export default function useLocalizedSeo({ title, description }: {
  title: MayBeTransKeyOrRef;
  description: MayBeTransKeyOrRef;
}) {
  const { t } = useI18n();

  function transOrNot(translation: MayBeTransKeyOrRef): string {
    if (typeof translation === 'string') {
      return t(translation);
    }

    return translation.value || '';
  }

  useHead({
    title: () => transOrNot(title),
  });

  useSeoMeta({
    description: () => transOrNot(description),
  });

  defineOgImage('PortfolioOgImage', {
    title: transOrNot(title),
    description: transOrNot(description),
  }, [
    // Primary image for og:image and twitter:image (1200x600)
    { key: 'og', width: 1200, height: 600 },
    // Additional square image for WhatsApp (800x800)
    { key: 'whatsapp', width: 800, height: 800 },
  ]);
}
