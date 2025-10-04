import { expect, test } from '@playwright/test';

const locales = [
  { code: 'en', path: '/', title: 'Ángel Blanco' },
  { code: 'es', path: '/es', title: 'Ángel Blanco' },
];

for (const locale of locales) {
  test(`has correct title for locale: ${locale.code}`, async ({ page }) => {
    await page.goto(locale.path);

    await expect(page).toHaveTitle(new RegExp(locale.title));

    // Hides canvas animation on home
    await page.addStyleTag({
      content: `canvas { display: none !important; }`,
    });
    await expect(page.locator('canvas')).toHaveCSS('display', 'none');

    await expect(page).toHaveScreenshot(`home-${locale.code}.png`, {
      fullPage: true,
    });
  });
}
