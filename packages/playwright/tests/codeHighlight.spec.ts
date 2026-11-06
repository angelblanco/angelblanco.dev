import { expect, test } from '@playwright/test';
import { locales, localizedPath } from './utils';

for (const locale of locales) {
  test(`it highlights php without the opening tag on: ${locale.code}`, async ({ page }) => {
    await page.goto(localizedPath(locale, '/blog/apt-install-php-85-on-ubuntu-26'));

    const firstLine = page.locator('pre').filter({ hasText: '$slug' }).locator('.line').first();
    await expect(firstLine.locator('span')).toHaveCount(3);
    await expect(firstLine.locator('span').nth(1)).toHaveText('=');
  });
}
