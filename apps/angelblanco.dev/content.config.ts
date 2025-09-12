import { defineCollection, defineContentConfig, z } from '@nuxt/content';

export function blogSchema() {
  return z.object({
    title: z.string().min(10),
    share_tweet: z.string(),
    tags: z.array(z.string()).min(1),
    image: z.string(),
    date: z.string().date(),
    post_id: z.number(),
    toc: z.boolean(),
  });
}

function defineBlogCollection(source: string) {
  return defineCollection({
    type: 'page',
    source,
    schema: blogSchema(),
  });
}

export default defineContentConfig({
  collections: {
    blog_es: defineBlogCollection('es/blog/*.md'),
    blog_en: defineBlogCollection('blog/*.md'),
  },
});
