import type { BlogCollectionItem } from './useBlog';

type LocaleCode = 'en' | 'es';

export function withoutTrailingSlash(path: string): string {
  return path.replace(/\/+$/, '') || '/';
}

export function postSlug(path: string): string {
  return withoutTrailingSlash(path).split('/').pop() ?? '';
}

export default function useBlogPostSeo(post: BlogCollectionItem, translatedLocales: LocaleCode[]) {
  const setI18nParams = useSetI18nParams();
  const localePath = useLocalePath();
  const authorUrl = withSiteUrl(localePath('/about'), { absolute: true });

  const slug = postSlug(post.path);
  const dateModified = post.updatedAt ?? post.date;

  setI18nParams(Object.fromEntries(translatedLocales.map(code => [
    code,
    { slug },
  ])));

  useSeoMeta({
    ogType: 'article',
    articlePublishedTime: post.date,
    articleModifiedTime: dateModified,
    articleAuthor: () => [authorUrl.value],
    articleTag: post.tags,
  });

  useSchemaOrg([
    defineArticle({
      '@type': 'BlogPosting',
      'headline': post.title,
      'description': post.description,
      'datePublished': post.date,
      dateModified,
      'keywords': post.tags,
      ...(post.image
        ? { image: post.image }
        : {}),
    }),
  ]);
}
