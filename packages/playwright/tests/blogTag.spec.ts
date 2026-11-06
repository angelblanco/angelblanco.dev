import { expect, test } from '@playwright/test';
import {
  ensureTheme,
  expectSeoIsConfigured,
  getLocalizedTranslations,
  locales,
  localizedPath,
  themes,
} from './utils';

const translations = {
  en: {
    title: 'Posts tagged #nodejs',
    related: 'Related posts',
    readingTime: /\d+ min read/,
    topics: 'Topics',
    allTopics: 'All topics',
    count: '3 articles',
  },
  es: {
    title: 'Artículos sobre #nodejs',
    related: 'Artículos relacionados',
    readingTime: /\d+ min de lectura/,
    topics: 'Temas',
    allTopics: 'Todos los temas',
    count: '3 artículos',
  },
};

for (const locale of locales) {
  const t = getLocalizedTranslations(locale, translations);

  for (const theme of themes) {
    test(`it renders the blog tag page properly on: ${locale.code} ${theme}`, async ({ page }) => {
      await page.goto(localizedPath(locale, '/blog/tags/nodejs'));

      await ensureTheme(page, theme);
      await expect(page).toHaveTitle(new RegExp(t.title));
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(t.title);
      await expect(page.locator('article')).toHaveCount(2);

      await expect(page).toHaveScreenshot(`blog-tag-nodejs-${locale.code}-${theme}.png`, {
        fullPage: true,
      });

      await expectSeoIsConfigured(page);
    });

    test(`it renders the blog topics page properly on: ${locale.code} ${theme}`, async ({ page }) => {
      await page.goto(localizedPath(locale, '/blog/tags'));

      await ensureTheme(page, theme);
      await expect(page).toHaveTitle(new RegExp(t.topics));
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(t.topics);
      await expect(page.locator('ol > li').first()).toHaveText(new RegExp(`#bash\\s*${t.count}`));

      await expect(page).toHaveScreenshot(`blog-topics-${locale.code}-${theme}.png`, {
        fullPage: true,
      });

      await expectSeoIsConfigured(page);
    });
  }

  test(`it navigates from the blog to a topic through the topics page on: ${locale.code}`, async ({ page }) => {
    await page.goto(localizedPath(locale, '/blog'));

    await page.getByRole('link', { name: t.allTopics }).click();
    await expect(page).toHaveURL(new RegExp(`${localizedPath(locale, '/blog/tags')}/?$`));
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(t.topics);

    await page.getByRole('link', { name: /#nodejs/ }).click();
    await expect(page).toHaveURL(new RegExp(`${localizedPath(locale, '/blog/tags/nodejs')}/?$`));
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(t.title);
  });

  test(`it links a post to its tags and related posts on: ${locale.code}`, async ({ page }) => {
    await page.goto(localizedPath(locale, '/blog/install-node-24-on-ubuntu-24'));

    await expect(page.getByText(t.readingTime).first()).toBeVisible();

    const related = page.locator('#blog-related');
    await expect(related.getByRole('heading', { level: 2 })).toHaveText(t.related);
    await expect(related.getByRole('listitem')).not.toHaveCount(0);
    await expect(related.getByRole('listitem').first()).toContainText('Node.js 26');

    await page.getByRole('link', { name: '#nodejs' }).first().click();
    await expect(page).toHaveURL(new RegExp(`${localizedPath(locale, '/blog/tags/nodejs')}/?$`));
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(t.title);
  });
}
