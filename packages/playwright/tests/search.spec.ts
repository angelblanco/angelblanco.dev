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
    placeholder: 'Search posts, sections or #tags…',
    query: 'share across projects',
    result: 'Create your own ESLint config',
    noResults: 'No results for “kubernetes”',
    php: 'Install PHP 8.5 with apt on Ubuntu 26.04',
    cancel: 'Cancel',
  },
  es: {
    button: 'Buscar en el blog',
    placeholder: 'Busca artículos, secciones o #etiquetas…',
    query: 'compartela entre proyectos',
    result: 'Crea tu propia configuración de ESLint',
    noResults: 'Sin resultados para «kubernetes»',
    php: 'Instalar PHP 8.5 con apt en Ubuntu 26.04',
    cancel: 'Cancelar',
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
      await expect(dialog.getByTestId('blog-search-post').first()).toBeVisible();

      await input.fill('kubernetes');
      await expect(dialog).toContainText(t.noResults);

      await input.fill(t.query);
      await expect(page.getByRole('option').first()).toContainText(t.result);
      await expect(page.getByRole('option').first()).toHaveAttribute('aria-selected', 'true');

      await page.keyboard.press('Enter');
      await expect(dialog).toBeHidden();
      await expect(page).toHaveURL(new RegExp(`${localizedPath(locale, '/blog/create-your-eslint-config')}`));
    });
  }

  test(`it filters the search by tag on: ${locale.code}`, async ({ page }) => {
    await page.goto(localizedPath(locale, '/blog'));
    await expect(page.locator('#theme-switcher')).toBeVisible();
    await page.keyboard.press('ControlOrMeta+k');

    const dialog = page.getByTestId('blog-search-dialog');
    const input = page.getByPlaceholder(t.placeholder);
    const php = dialog.getByRole('button', { name: /^#php,/ });

    await php.click();
    await expect(php).toHaveAttribute('aria-pressed', 'true');
    await expect(dialog.getByTestId('blog-search-post')).toHaveCount(1);
    await expect(dialog.getByTestId('blog-search-post')).toContainText(t.php);

    await input.focus();
    await page.keyboard.press('Backspace');
    await expect(php).toHaveAttribute('aria-pressed', 'false');

    await input.fill('#ph');
    await expect(dialog.getByTestId('blog-search-tag-filter')).toHaveCount(1);
    await expect(dialog.getByTestId('blog-search-topic')).toHaveCount(1);
    await page.keyboard.press('Enter');
    await expect(dialog).toBeHidden();
    await expect(page).toHaveURL(new RegExp(`${localizedPath(locale, '/blog/tags/php')}`));
  });

  test(`it opens and closes the search from the navbar on: ${locale.code}`, async ({ page }) => {
    await page.goto(localizedPath(locale, '/blog'));
    await expect(page.locator('#theme-switcher')).toBeVisible();

    await page.getByRole('button', { name: t.button }).click();

    const dialog = page.getByTestId('blog-search-dialog');
    await expect(dialog).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
  });

  test(`it fits the mobile viewport on: ${locale.code}`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(localizedPath(locale, '/blog'));
    await expect(page.locator('#theme-switcher')).toBeVisible();

    await page.getByRole('button', { name: t.button }).click();

    const dialog = page.getByTestId('blog-search-dialog');
    const box = await dialog.locator('.modal-box').boundingBox();

    const width = await dialog.evaluate(element => element.clientWidth);

    expect(box?.width).toBe(width);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    await expect(dialog.getByTestId('blog-search-post').first()).toBeVisible();
  });

  test(`it starts a fresh search when reopened on mobile on: ${locale.code}`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(localizedPath(locale, '/blog'));
    await expect(page.locator('#theme-switcher')).toBeVisible();

    const button = page.getByRole('button', { name: t.button });
    const dialog = page.getByTestId('blog-search-dialog');
    const input = page.getByPlaceholder(t.placeholder);
    const cancel = dialog.getByRole('button', { name: t.cancel });
    const results = dialog.locator('.overflow-y-auto');

    await button.click();
    await input.fill('ubuntu');
    await expect(dialog.getByTestId('blog-search-post').first()).toBeVisible();
    await results.evaluate(element => element.scrollTo(0, element.scrollHeight));
    await cancel.click();
    await expect(dialog).toBeHidden();

    await button.click();
    await expect(input).toHaveValue('');
    await expect(cancel).toBeInViewport();
    expect(await results.evaluate(element => element.scrollTop)).toBe(0);

    await cancel.click();
    await expect(dialog).toBeHidden();
  });
}
