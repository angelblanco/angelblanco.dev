import { expect, test } from '@playwright/test';
import {
  ensureTheme,
  expectSeoIsConfigured,
  hideCanvas,
  locales,
  themes,
} from './utils';

for (const locale of locales) {
  for (const theme of themes) {
    test(`it renders properly on: ${locale.code} ${theme}`, async ({ page }) => {
      await page.goto(locale.path);

      await ensureTheme(page, theme);
      await expect(page).toHaveTitle(/Ángel Blanco/);
      await expectSeoIsConfigured(page);

      // Hides canvas animation on home
      await hideCanvas(page);

      await expect(page).toHaveScreenshot(`home-${locale.code}-${theme}.png`, {
        fullPage: true,
      });
    });
  }
}
