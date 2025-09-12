import type { BlogEnCollectionItem } from '@nuxt/content';

export type BlogCollectionItem = BlogEnCollectionItem;

export default function useBlogPost(path: string) {
  const { queryBlogCollection, queryAlternativeBlogCollection, blogCollection, alternativeBlogCollection } = useBlog();
  const { alternativeLocale } = useLocale();

  // Main post
  const { data: post, pending: postPending, error: postError } = useAsyncData(
    `${blogCollection}-${path}`,
    () => queryBlogCollection().path(path).first(),
  );

  // Alternative post
  const { data: alternativePost, pending: altPending, error: altError } = useAsyncData(
    `${alternativeBlogCollection}-${path}`,
    () => queryAlternativeBlogCollection().path(path).first(),
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
