export type FeedLocale = 'en' | 'es';

export type FeedFormat = 'rss' | 'atom';

export const feedLocales: FeedLocale[] = ['en', 'es'];

export const feedFormats: FeedFormat[] = ['rss', 'atom'];

export const feedMimeTypes: Record<FeedFormat, string> = {
  rss: 'application/rss+xml',
  atom: 'application/atom+xml',
};

const feedFiles: Record<FeedFormat, string> = {
  rss: 'feed.xml',
  atom: 'atom.xml',
};

export function feedPath(locale: FeedLocale, format: FeedFormat): string {
  return locale === 'en'
    ? `/${feedFiles[format]}`
    : `/${locale}/${feedFiles[format]}`;
}

export function feedRoutes(): string[] {
  return feedLocales.flatMap(locale => feedFormats.map(format => feedPath(locale, format)));
}
