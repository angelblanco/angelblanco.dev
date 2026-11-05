import { defineCollection, defineContentConfig } from '@nuxt/content';
import { defineSchemaOrgSchema } from '@nuxtjs/seo/content';
import { z } from 'zod';

export function blogSchema() {
  return z.object({
    title: z.string().min(10),
    tags: z.array(z.string()).min(1),
    date: z.iso.date(),
    updatedAt: z.iso.date().optional(),
    image: z.string().optional(),
    toc: z.boolean().optional(),
    readingTime: z.number().int().positive().optional(),
    schemaOrg: defineSchemaOrgSchema(),
  });
}

function defineBlogCollection(source: string) {
  return defineCollection(
    {
      type: 'page',
      source,
      schema: blogSchema(),
    },
  );
}

export default defineContentConfig({
  collections: {
    blog_es: defineBlogCollection('es/blog/*.md'),
    blog_en: defineBlogCollection('blog/*.md'),
  },
});
