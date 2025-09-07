import type { BlogEnCollectionItem } from '@nuxt/content';

export type BlogCollectionItem = BlogEnCollectionItem;

export default function useBlogPost(path: string) {
  const { queryBlogCollection, queryAlternativeBlogCollection, blogCollection, alternativeBlogCollection } = useBlog();
  const { alternativeLocale } = useLocale();

  const post = ref<BlogCollectionItem>();
  const alternativePost = ref<BlogCollectionItem>();

  async function loadPost() {
    const { data: dataPost } = await useAsyncData(`${blogCollection}${path}`, () => queryBlogCollection().path(path).first());
    post.value = dataPost.value ?? undefined;

    const { data: dataAlternativePost } = await useAsyncData(alternativeBlogCollection + path, () => queryAlternativeBlogCollection().path(path).first());
    alternativePost.value = dataAlternativePost.value ?? undefined;
  }

  return {
    loadPost,
    post,
    alternativePost,
    alternativeLocale: computed(() => alternativePost ? alternativeLocale.value : null),
  };
}
