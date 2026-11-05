const feedTitleKeys: Record<FeedFormat, string> = {
  rss: 'feedRss',
  atom: 'feedAtom',
};

export default function useFeeds() {
  const { t, locale } = useI18n();
  const feedLocale = computed(() => locale.value as FeedLocale);

  return {
    rssPath: computed(() => feedPath(feedLocale.value, 'rss')),
    useFeedLinks() {
      useHead({
        link: () => feedFormats.map(format => ({
          rel: 'alternate',
          type: feedMimeTypes[format],
          title: t(feedTitleKeys[format]),
          href: feedPath(feedLocale.value, format),
        })),
      });
    },
  };
}
