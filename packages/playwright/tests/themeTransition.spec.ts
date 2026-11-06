import { expect, test } from '@playwright/test';
import { ensureTheme, expectTheme, locales, localizedPath, themes } from './utils';

for (const locale of locales) {
  for (const theme of themes) {
    const nextTheme = theme === 'light'
      ? 'dark'
      : 'light';

    test(`it reveals the new theme from the switcher on: ${locale.code} ${theme}`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await page.goto(localizedPath(locale, '/blog'));
      await expect(page.locator('#theme-switcher')).toBeVisible();
      await ensureTheme(page, theme);
      await expect(page.locator('html')).not.toHaveClass(/theme-transition/);

      await page.locator('#theme-switcher').click();

      await expectTheme(page, nextTheme);
      await expect(page.locator('html')).not.toHaveClass(/theme-transition/);
    });
  }

  test(`it switches the theme without a transition when motion is reduced on: ${locale.code}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(localizedPath(locale, '/blog'));
    await expect(page.locator('#theme-switcher')).toBeVisible();
    await ensureTheme(page, 'light');

    await page.evaluate(() => {
      const observer = new MutationObserver(() => {
        if (document.documentElement.classList.contains('theme-transition'))
          (window as unknown as { themeTransitioned: boolean }).themeTransitioned = true;
      });
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      });
    });
    await page.locator('#theme-switcher').click();

    await expectTheme(page, 'dark');
    expect(await page.evaluate(() => (window as unknown as { themeTransitioned?: boolean }).themeTransitioned)).toBeUndefined();
  });
}
