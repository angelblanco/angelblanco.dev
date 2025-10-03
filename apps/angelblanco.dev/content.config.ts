import { defineCollection, defineContentConfig, z } from '@nuxt/content';
import { asSchemaOrgCollection } from 'nuxt-schema-org/content';

export function blogSchema() {
  return z.object({
    post_id: z.number(),
    title: z.string().min(10),
    tags: z.array(z.string()).min(1),
    date: z.string().date(),
    share_tweet: z.string().optional(),
    image: z.string().optional(),
    toc: z.boolean().optional(),
  });
}

function defineBlogCollection(source: string) {
  return defineCollection(
    asSchemaOrgCollection({
      type: 'page',
      source,
      schema: blogSchema(),
    }),
  );
}

export default defineContentConfig({
  collections: {
    blog_es: defineBlogCollection('es/blog/*.md'),
    blog_en: defineBlogCollection('blog/*.md'),
  },
});
