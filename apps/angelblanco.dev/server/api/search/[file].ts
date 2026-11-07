import { queryCollection, queryCollectionSearchSections } from '@nuxt/content/nitro';

const collections = {
  'en.json': 'blog_en',
  'es.json': 'blog_es',
} as const;

export default defineEventHandler(async (event): Promise<BlogSearchData> => {
  const file = getRouterParam(event, 'file') as keyof typeof collections;
  const collection = collections[file];

  if (!collection)
    throw createError({ statusCode: 404 });

  const [posts, sections] = await Promise.all([
    queryCollection(event, collection)
      .select('path', 'title', 'description', 'tags', 'date', 'readingTime')
      .order('date', 'DESC')
      .all(),
    queryCollectionSearchSections(event, collection, {
      ignoredTags: ['pre'],
    }),
  ]);

  const intros = new Map(sections.filter(section => !section.id.includes('#')).map(section => [section.id, section.content]));

  return {
    posts: posts.map(post => ({
      path: post.path,
      title: post.title,
      description: post.description,
      tags: post.tags,
      date: post.date,
      readingTime: Number(post.readingTime) || undefined,
      content: intros.get(post.path) ?? '',
    })),
    sections: sections
      .filter(section => section.id.includes('#'))
      .map(({ id, title, titles, content, level }) => ({
        id,
        postPath: id.split('#')[0]!,
        title,
        titles,
        content,
        level,
      })),
  };
});
