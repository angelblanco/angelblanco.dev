import type { BlogEnCollectionItem } from '@nuxt/content';

type BlogCollections = 'blog_es' | 'blog_en';

export type BlogCollectionItem = BlogEnCollectionItem;

const BLOG_POST_SUMMARY_FIELDS = [
  'id',
  'path',
  'title',
  'description',
  'date',
  'readingTime',
  'tags',
] as const;

export type BlogPostSummary = Pick<BlogCollectionItem, typeof BLOG_POST_SUMMARY_FIELDS[number]>;

export default function useBlog() {
  const { locale, alternativeLocale } = useLocale();

  const blogCollection = computed<BlogCollections>(() => `blog_${locale.value}`);
  const alternativeBlogCollection = computed<BlogCollections>(() => `blog_${alternativeLocale.value}`);

  function queryBlogCollection() {
    return queryCollection(blogCollection.value);
  }

  return {
    blogCollection,
    alternativeBlogCollection,
    queryBlogCollection,
    queryAlternativeBlogCollection() {
      return queryCollection(alternativeBlogCollection.value);
    },
    queryBlogPostSummaries() {
      return queryBlogCollection()
        .select(...BLOG_POST_SUMMARY_FIELDS)
        .order('date', 'DESC');
    },
  };
}
