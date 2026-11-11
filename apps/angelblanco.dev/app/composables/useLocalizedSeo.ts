type MayBeTransKeyOrRef = string | Ref | ComputedRef;

export default function useLocalizedSeo({ title, description, cta = 'ogCtaDefault' }: {
  title: MayBeTransKeyOrRef;
  description: MayBeTransKeyOrRef;
  cta?: MayBeTransKeyOrRef;
}) {
  const { t, locale } = useI18n();
  const route = useRoute();

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

  useSchemaOrg([
    defineWebPage({
      description: () => transOrNot(description),
    }),
  ]);

  const alt = transOrNot(title);

  const ogImages = defineOgImage('PortfolioOgImage', {
    title: transOrNot(title),
    description: transOrNot(description),
    cta: transOrNot(cta),
    section: route.path.split('/').find(segment => segment && segment !== locale.value),
  }, [
    // Primary image for og:image and twitter:image (1200x600)
    {
      key: 'og',
      width: 1200,
      height: 600,
      alt,
    },
    // Additional square image for WhatsApp (800x800)
    {
      key: 'whatsapp',
      width: 800,
      height: 800,
      alt,
    },
  ]);

  return { ogImages };
}
