import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import {
  ensureTheme,
  expectSeoIsConfigured,
  hideCanvas,
  locales,
  themes,
} from './utils';

function canvasFrame(page: Page) {
  return page.locator('[data-testid="hero-vortex"] canvas').evaluate((canvas: HTMLCanvasElement) => canvas.toDataURL());
}

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

    test(`it animates the hero vortex on: ${locale.code} ${theme}`, async ({ page }) => {
      await page.goto(locale.path);
      await ensureTheme(page, theme);

      const vortex = page.getByTestId('hero-vortex');
      await expect(vortex).toHaveAttribute('data-state', 'running');
      await expect(vortex).toHaveCSS('opacity', '1');

      const frame = await canvasFrame(page);
      await expect.poll(() => canvasFrame(page)).not.toBe(frame);
    });

    test(`it draws a static hero vortex with reduced motion on: ${locale.code} ${theme}`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(locale.path);
      await ensureTheme(page, theme);

      const vortex = page.getByTestId('hero-vortex');
      await expect(vortex).toHaveAttribute('data-state', 'static');

      const frame = await canvasFrame(page);
      await page.waitForTimeout(500);
      expect(await canvasFrame(page)).toBe(frame);
    });
  }

  test(`hero photo stays inside the card on a 320px wide screen in locale: ${locale.code}`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 640 });
    await page.goto(locale.path);

    const spill = await page.getByRole('img', { name: 'Me', exact: true }).evaluate((image) => {
      const card = image.closest('a')!.parentElement!;
      const border = Number.parseFloat(getComputedStyle(card).borderRightWidth);
      const cardBox = card.getBoundingClientRect();
      const imageBox = image.getBoundingClientRect();

      return Math.max(imageBox.right - (cardBox.right - border), (cardBox.left + border) - imageBox.left);
    });

    expect(spill).toBeLessThanOrEqual(0);
  });
}
