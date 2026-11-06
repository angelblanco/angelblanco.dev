import type { FeedFormat, FeedLocale } from '../../shared/utils/feeds';
import { queryCollection } from '@nuxt/content/server';
import { feedMimeTypes } from '../../shared/utils/feeds';
import { buildBlogFeed } from './feed';

export function defineBlogFeedHandler(locale: FeedLocale, format: FeedFormat) {
  return defineEventHandler(async (event) => {
    const posts = await queryCollection(event, locale === 'es'
      ? 'blog_es'
      : 'blog_en').all();
    const feed = buildBlogFeed({ locale, siteUrl: getSiteConfig(event).url, posts });

    setResponseHeader(event, 'content-type', `${feedMimeTypes[format]}; charset=utf-8`);

    return format === 'rss'
      ? feed.rss2()
      : feed.atom1();
  });
}
