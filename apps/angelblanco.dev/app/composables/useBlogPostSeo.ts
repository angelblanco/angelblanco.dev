import type { BlogCollectionItem } from './useBlog';

type LocaleCode = 'en' | 'es';

export function withoutTrailingSlash(path: string): string {
  return path.replace(/\/+$/, '') || '/';
}

export function postSlug(path: string): string {
  return withoutTrailingSlash(path).split('/').pop() ?? '';
}

export function toIsoDateTime(date: string): string {
  return /^\d{4}-\d{2}-\d{2}$/.test(date)
    ? `${date}T00:00:00Z`
    : date;
}

export default function useBlogPostSeo(post: BlogCollectionItem, translatedLocales: LocaleCode[], ogImages: string[] = []) {
  const { t } = useI18n();
  const setI18nParams = useSetI18nParams();
  const localePath = useLocalePath();
  const authorUrl = withSiteUrl(localePath('/about'), { absolute: true });

  const slug = postSlug(post.path);
  const datePublished = toIsoDateTime(post.date);
  const dateModified = toIsoDateTime(post.updatedAt ?? post.date);
  const images = (post.image
    ? [post.image]
    : ogImages).map(image => withSiteUrl(image, { absolute: true }).value);

  setI18nParams(Object.fromEntries(translatedLocales.map(code => [
    code,
    { slug },
  ])));

  useSeoMeta({
    ogType: 'article',
    articlePublishedTime: datePublished,
    articleModifiedTime: dateModified,
    articleAuthor: () => [authorUrl.value],
    articleTag: post.tags,
    ...(post.readingTime
      ? {
          twitterLabel1: t('blogReadingTimeLabel'),
          twitterData1: t('blogReadingTime', { minutes: post.readingTime }),
        }
      : {}),
  });

  useSchemaOrg([
    defineArticle({
      '@type': 'BlogPosting',
      'headline': post.title,
      'description': post.description,
      datePublished,
      dateModified,
      'keywords': post.tags,
      ...(post.wordCount
        ? {
            wordCount: Number(post.wordCount),
          }
        : {}),
      ...(post.readingTime
        ? { timeRequired: `PT${Number(post.readingTime)}M` }
        : {}),
      ...(images.length
        ? { image: images }
        : {}),
    }),
  ]);
}
