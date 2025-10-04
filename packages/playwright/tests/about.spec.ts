import { expect, test } from '@playwright/test';

const locales = [
  {
    code: 'en',
    path: '/about',
    title: 'About Me | Ángel Blanco',
    heading: 'Engeineer Manager - Full Stack Architect',
    techStackText: 'My tech stack preferences',
  },
  {
    code: 'es',
    path: '/es/about',
    title: 'Sobre mí | Ángel Blanco',
    heading: 'Engeineer Manager - Full Stack Architect',
    techStackText: 'Mis preferencias tecnológicas',
  },
];

for (const locale of locales) {
  test.describe(`About Page - Locale: ${locale.code}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(locale.path);
    });

    test('has correct title and heading', async ({ page }) => {
      await expect(page).toHaveTitle(new RegExp(locale.title));
      await expect(page.getByText(locale.techStackText)).toBeVisible();
    });

    test('has tech stack section', async ({ page }) => {
      await expect(page.getByText(locale.techStackText)).toBeVisible();
    });
  });
}
