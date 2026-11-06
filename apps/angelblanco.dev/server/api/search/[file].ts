import { queryCollectionSearchSections } from '@nuxt/content/nitro';

const collections = {
  'en.json': 'blog_en',
  'es.json': 'blog_es',
} as const;

export default defineEventHandler(async (event) => {
  const file = getRouterParam(event, 'file') as keyof typeof collections;
  const collection = collections[file];

  if (!collection)
    throw createError({ statusCode: 404 });

  return queryCollectionSearchSections(event, collection, {
    ignoredTags: ['pre'],
  });
});
