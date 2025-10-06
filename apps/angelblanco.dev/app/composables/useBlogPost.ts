import type { BlogEnCollectionItem } from '@nuxt/content';

export type BlogCollectionItem = BlogEnCollectionItem;

export default function useBlogPost(path: Ref<string>) {
  const { queryBlogCollection, queryAlternativeBlogCollection, blogCollection, alternativeBlogCollection } = useBlog();
  const { alternativeLocale, locale } = useLocale();

  // Main post
  const { data: post, pending: postPending, error: postError } = useAsyncData(
    `${locale.value}-main-${blogCollection.value}-${path.value}`,
    () => queryBlogCollection().path(path.value).first(),
  );

  // Alternative post
  const { data: alternativePost, pending: altPending, error: altError } = useAsyncData(
    `${locale.value}-alternative-${alternativeBlogCollection.value}-${path.value}`,
    () => queryAlternativeBlogCollection().path(path.value).first(),
  );

  return {
    post,
    alternativePost,
    postPending,
    postError,
    altPending,
    altError,
    alternativeLocale: computed(() => alternativePost.value ? alternativeLocale.value : null),
  };
}
