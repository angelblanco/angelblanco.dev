import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { expect, test } from '@playwright/test';
import { ensureTheme, locales, localizedPath, themes } from './utils';

const feeds = [
  {
    format: 'rss',
    file: 'feed.xml',
    type: 'application/rss+xml',
    item: 'channel > item',
    link: 'link',
  },
  {
    format: 'atom',
    file: 'atom.xml',
    type: 'application/atom+xml',
    item: 'entry',
    link: 'link[href]',
  },
];

const contentDir = resolve(__dirname, '../../../apps/angelblanco.dev/content');

function postCount(localeCode: string) {
  const blogDir = localeCode === 'en'
    ? 'blog'
    : `${localeCode}/blog`;

  return readdirSync(resolve(contentDir, blogDir)).filter(file => file.endsWith('.md')).length;
}

for (const locale of locales) {
  for (const feed of feeds) {
    test(`it serves a valid ${feed.format} feed on: ${locale.code}`, async ({ page, request }) => {
      const response = await request.get(localizedPath(locale, feed.file));

      expect(response.ok()).toBe(true);
      expect(response.headers()['content-type']).toMatch(/xml/);

      await page.goto(localizedPath(locale, '/'));

      const links = await page.evaluate(({ xml, item, link }) => {
        const document = new DOMParser().parseFromString(xml, 'application/xml');

        if (document.querySelector('parsererror'))
          return null;

        return [
          ...document.querySelectorAll(item),
        ].map((node) => {
          const element = node.querySelector(link);

          return element?.getAttribute('href') ?? element?.textContent ?? '';
        });
      }, { xml: await response.text(), item: feed.item, link: feed.link });

      const blogUrl = `https://angelblanco.dev${localizedPath(locale, '/blog/')}`;

      expect(links).not.toBeNull();
      expect(links).toHaveLength(postCount(locale.code));

      for (const link of links!)
        expect(link).toMatch(new RegExp(`^${blogUrl}[\\w-]+/$`));
    });
  }

  for (const theme of themes) {
    test(`it advertises the feeds on: ${locale.code} ${theme}`, async ({ page }) => {
      await page.goto(localizedPath(locale, '/blog'));
      await ensureTheme(page, theme);

      for (const feed of feeds)
        await expect(page.locator(`head link[rel="alternate"][type="${feed.type}"]`)).toHaveAttribute('href', localizedPath(locale, feed.file));

      const footerLink = page.getByTestId('rss-feed');

      await expect(footerLink).toBeVisible();
      await expect(footerLink).toHaveAttribute('aria-label', /RSS/);
      await expect(footerLink).toHaveAttribute('href', localizedPath(locale, 'feed.xml'));
    });
  }
}
