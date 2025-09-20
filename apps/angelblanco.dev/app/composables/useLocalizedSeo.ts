export default function useLocalizedSeo({ title, description }: {
  title: string;
  description: string;
}) {
  const { t } = useI18n();

  useHead({
    title: () => t(title),
  });

  useSeoMeta({
    description: () => t(description),
  });
}
