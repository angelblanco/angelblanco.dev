import { defineCollection, defineContentConfig, z } from '@nuxt/content';

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: z.object({
        title: z.string().min(10),
        intro: z.string().min(50).max(200),
        share_tweet: z.string(),
        description: z.string(),
        tags: z.array(z.string()).min(1),
        image: z.string(),
        date: z.string().date(),
      }),
    }),
  },
});
