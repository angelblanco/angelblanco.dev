import { defineCollection, defineContentConfig } from '@nuxt/content';
import { defineSchemaOrgSchema, defineSitemapSchema } from '@nuxtjs/seo/content';
import { z } from 'zod';

export function blogSchema(name: string) {
  return z.object({
    title: z.string().min(10),
    tags: z.array(z.string()).min(1),
    date: z.iso.date(),
    updatedAt: z.iso.date().optional(),
    image: z.string().optional(),
    toc: z.boolean().optional(),
    readingTime: z.number().int().positive().optional(),
    wordCount: z.number().int().positive().optional(),
    schemaOrg: defineSchemaOrgSchema(),
    sitemap: defineSitemapSchema({
      z,
      name,
      onUrl(url, entry) {
        url.lastmod = (entry.updatedAt ?? entry.date) as string;
      },
    }),
  });
}

function defineBlogCollection(name: string, source: string) {
  return defineCollection(
    {
      type: 'page',
      source,
      schema: blogSchema(name),
    },
  );
}

export default defineContentConfig({
  collections: {
    blog_es: defineBlogCollection('blog_es', 'es/blog/*.md'),
    blog_en: defineBlogCollection('blog_en', 'blog/*.md'),
  },
});
