import { describe, expect, it } from 'vitest';

describe('composables: useFeeds', () => {
  const { setLocale } = useI18n();

  it('should point to the english rss feed', () => {
    setLocale('en');

    expect(useFeeds().rssPath.value).toBe('/feed.xml');
  });

  it('should point to the spanish rss feed', () => {
    setLocale('es');

    expect(useFeeds().rssPath.value).toBe('/es/feed.xml');

    setLocale('en');
  });
});
