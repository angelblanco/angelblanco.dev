import { useI18n } from '#i18n';

export default async function useBlogPost(slug: string) {
  const { locale } = useI18n();

  const { data: esContent } = await useAsyncData(() => queryCollection('blog').path(`/blog/es/${slug}`).first());
  const { data: enContent } = await useAsyncData(() => queryCollection('blog').path(`/blog/en/${slug}`).first());

  let postContent = enContent;
  let isCurrentLocale = locale.value === 'en';
  let hasAlterntiveVersion = isCurrentLocale && esContent;
  if (locale.value === 'es' || !enContent) {
    postContent = esContent;
    isCurrentLocale = locale.value === 'es';
    hasAlterntiveVersion = isCurrentLocale && enContent;
  }

  return {
    postContent,
    isCurrentLocale,
    hasAlterntiveVersion,
  };
}
