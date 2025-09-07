type BlogCollections = 'blog_es' | 'blog_en';

export default function useBlog() {
  const { locale, alternativeLocale } = useLocale();

  const blogCollection = computed<BlogCollections>(() => `blog_${locale.value}`);
  const alternativeBlogCollection = computed<BlogCollections>(() => `blog_${alternativeLocale.value}`);

  return {
    blogCollection,
    alternativeBlogCollection,
    queryBlogCollection() {
      return queryCollection(blogCollection.value);
    },
    queryAlternativeBlogCollection() {
      return queryCollection(alternativeBlogCollection.value);
    },
  };
}
