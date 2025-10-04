import { expect, test } from '@playwright/test';

test('has title and seo attrs', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Ángel Blanco/);
});
