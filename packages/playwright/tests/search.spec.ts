import { expect, test } from '@playwright/test';
import {
  ensureTheme,
  getLocalizedTranslations,
  locales,
  localizedPath,
  themes,
} from './utils';

const translations = {
  en: {
    button: 'Search the blog',
    placeholder: 'Search posts…',
    result: 'Create your own ESLint config',
    noResults: 'No results for “kubernetes”',
  },
  es: {
    button: 'Buscar en el blog',
    placeholder: 'Buscar artículos…',
    result: 'Crea tu propia configuración de ESLint',
    noResults: 'Sin resultados para «kubernetes»',
  },
};

for (const locale of locales) {
  const t = getLocalizedTranslations(locale, translations);

  for (const theme of themes) {
    test(`it searches the blog with the keyboard on: ${locale.code} ${theme}`, async ({ page }) => {
      await page.goto(localizedPath(locale, '/'));
      await ensureTheme(page, theme);
      await expect(page.locator('#theme-switcher')).toBeVisible();

      const dialog = page.getByTestId('blog-search-dialog');
      const input = page.getByPlaceholder(t.placeholder);

      await page.keyboard.press('ControlOrMeta+k');
      await expect(dialog).toBeVisible();
      await expect(input).toBeFocused();

      await input.fill('kubernetes');
      await expect(dialog).toContainText(t.noResults);

      await input.fill('eslint');
      await expect(page.getByRole('option').first()).toContainText(t.result);
      await expect(page.getByRole('option').first()).toHaveAttribute('aria-selected', 'true');

      await page.keyboard.press('Enter');
      await expect(dialog).toBeHidden();
      await expect(page).toHaveURL(new RegExp(`${localizedPath(locale, '/blog/create-your-eslint-config')}`));
    });
  }

  test(`it opens and closes the search from the navbar on: ${locale.code}`, async ({ page }) => {
    await page.goto(localizedPath(locale, '/blog'));
    await expect(page.locator('#theme-switcher')).toBeVisible();

    await page.getByRole('button', { name: t.button }).click();

    const dialog = page.getByTestId('blog-search-dialog');
    await expect(dialog).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
  });
}
