import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import { ensureTheme, locales, localizedPath, themes } from './utils';

const POST_PATH = '/blog/apt-install-node-26-on-ubuntu-26';

type ViewTransitionWindow = Window & { viewTransitions: number };

async function countViewTransitions(page: Page) {
  await page.addInitScript(() => {
    const win = window as unknown as ViewTransitionWindow;
    win.viewTransitions = 0;

    const start = document.startViewTransition?.bind(document);
    if (!start)
      return;

    document.startViewTransition = ((callback?: ViewTransitionUpdateCallback) => {
      win.viewTransitions++;
      return start(callback);
    }) as Document['startViewTransition'];
  });
}

async function navigateToPost(page: Page, locale: (typeof locales)[number]) {
  await page.goto(localizedPath(locale, '/blog'));
  await expect(page.locator('#theme-switcher')).toBeVisible();

  return async () => {
    await page.locator(`a[href*="${POST_PATH}"]`).first().click();
    await expect(page).toHaveURL(new RegExp(POST_PATH));
    await expect(page.locator('h1')).toBeVisible();

    return page.evaluate(() => (window as unknown as ViewTransitionWindow).viewTransitions);
  };
}

for (const locale of locales) {
  for (const theme of themes) {
    test(`it cross-fades the page when navigating on: ${locale.code} ${theme}`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await countViewTransitions(page);
      const navigate = await navigateToPost(page, locale);
      await ensureTheme(page, theme);

      const supported = await page.evaluate(() => 'startViewTransition' in document);
      test.skip(!supported, 'View Transitions API is not supported by this browser');

      const transitionsBefore = await page.evaluate(() => (window as unknown as ViewTransitionWindow).viewTransitions);
      expect(await navigate()).toBeGreaterThan(transitionsBefore);
    });
  }

  test(`it navigates without a transition when motion is reduced on: ${locale.code}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await countViewTransitions(page);
    const navigate = await navigateToPost(page, locale);

    expect(await navigate()).toBe(0);
  });
}
