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
  en: { title: 'Posts tagged #nodejs', related: 'Related posts', readingTime: /\d+ min read/ },
  es: { title: 'Artículos sobre #nodejs', related: 'Artículos relacionados', readingTime: /\d+ min de lectura/ },
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
  }

  test(`it links a post to its tags and related posts on: ${locale.code}`, async ({ page }) => {
    await page.goto(localizedPath(locale, '/blog/install-node-24-on-ubuntu-24'));

    await expect(page.getByText(t.readingTime).first()).toBeVisible();

    const related = page.locator('#blog-related');
    await expect(related.getByRole('heading', { level: 2 })).toHaveText(t.related);
    await expect(related.locator('article')).not.toHaveCount(0);
    await expect(related.locator('article').first()).toContainText('Node.js 26');

    await page.getByRole('link', { name: '#nodejs' }).first().click();
    await expect(page).toHaveURL(new RegExp(`${localizedPath(locale, '/blog/tags/nodejs')}/?$`));
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(t.title);
  });
}
