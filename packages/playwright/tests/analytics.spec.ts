import { expect, test } from '@playwright/test';
import { ensureTheme, locales, localizedPath, themes } from './utils';

const TRACKER_HOSTS = /cloudflareinsights\.com|googletagmanager\.com|google-analytics\.com/;

for (const locale of locales) {
  for (const theme of themes) {
    test(`it does not load analytics without a token on: ${locale.code} ${theme}`, async ({ page }) => {
      const trackerRequests: string[] = [];
      page.on('request', (request) => {
        if (TRACKER_HOSTS.test(request.url()))
          trackerRequests.push(request.url());
      });

      await page.goto(localizedPath(locale, '/blog'));
      await ensureTheme(page, theme);
      await page.waitForLoadState('networkidle');

      await expect(page.locator('script[data-cf-beacon]')).toHaveCount(0);
      await expect(page.locator('script[src*="googletagmanager"]')).toHaveCount(0);
      expect(trackerRequests).toEqual([]);
    });
  }
}
