import { expect, test } from '@playwright/test';
import {
  ensureTheme,
  expectSeoIsConfigured,
  locales,
  localizedPath,
  themes,
} from './utils';

for (const locale of locales) {
  for (const theme of themes) {
    test(`it renders about page properly on: ${locale.code} ${theme}`, async ({ page }) => {
      await page.goto(localizedPath(locale, '/about'));

      await ensureTheme(page, theme);
      await expect(page).toHaveTitle(/Ángel Blanco/);
      await expectSeoIsConfigured(page);

      await expect(page).toHaveScreenshot(`about-${locale.code}-${theme}.png`, {
        fullPage: true,
      });
    });
  }
}
