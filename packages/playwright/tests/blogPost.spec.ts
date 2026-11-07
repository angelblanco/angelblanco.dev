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
    alternativeLink: 'También puedes ver este artículo en castellano',
    alternativePath: /^\/es\/blog\/hello\/?$/,
  },
  es: {
    alternativeLink: 'You can also check this article in English.',
    alternativePath: /^\/blog\/hello\/?$/,
  },
};

for (const locale of locales) {
  const t = getLocalizedTranslations(locale, translations);

  test(`it links to the blog post in the other language on: ${locale.code}`, async ({ page }) => {
    await page.goto(localizedPath(locale, '/blog/hello'));

    const link = page.getByRole('link', { name: t.alternativeLink });
    await expect(link).toHaveAttribute('href', t.alternativePath);

    await link.click();
    await expect(page).toHaveURL(url => t.alternativePath.test(url.pathname));
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  for (const theme of themes) {
    test(`it renders blog post page properly on: ${locale.code} ${theme}`, async ({ page }) => {
      await page.goto(localizedPath(locale, '/blog/hello'));

      await ensureTheme(page, theme);
      await expect(page).toHaveTitle(/Ángel Blanco/);
      await expectSeoIsConfigured(page);

      await expect(page).toHaveScreenshot(`blog-post-hello-${locale.code}-${theme}.png`, {
        fullPage: true,
      });
    });
  }
}
