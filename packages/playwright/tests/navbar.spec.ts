import { expect, test } from '@playwright/test';
import { ensureNavbarIsOpen, ensureTheme, expectTheme, getLocalizedTranslations, locales, localizedPath } from './utils';

const NAVBAR_EXPECTED_TRANS = {
  en: {
    blog: 'Blog',
    projects: 'Projects',
    about: 'Me',
  },
  es: {
    blog: 'Blog',
    projects: 'Proyectos',
    about: 'Sobre mí',
  },
};

for (const locale of locales) {
  test(`navbar navigates correctly for locale: ${locale.code} with translated set`, async ({
    page,
  }) => {
    await page.goto(locale.path);

    const viewportSize = page.viewportSize();
    const mustHaveToggle = (viewportSize?.width || 0) < 767;
    const trans = getLocalizedTranslations(locale, NAVBAR_EXPECTED_TRANS);

    const getLink = (name: string) => {
      const parentLocator = mustHaveToggle ? page.locator('#ui-nav-bar-menu') : page.locator('nav');
      return parentLocator.getByRole('link', { name });
    };

    await ensureNavbarIsOpen(page, mustHaveToggle);
    await getLink(trans.blog).click();
    await page.waitForURL(localizedPath(locale, '/blog'));

    await page.goto(locale.path);
    await ensureNavbarIsOpen(page, mustHaveToggle);
    await getLink(trans.projects).click();
    await page.waitForURL(localizedPath(locale, '/projects'));

    await page.goto(locale.path);
    await ensureNavbarIsOpen(page, mustHaveToggle);
    await getLink(trans.about).click();
    await page.waitForURL(localizedPath(locale, '/about'));
  });

  test(`theme switcher works in locale: ${locale.code}`, async ({ page }) => {
    await page.goto(locale.path);
    await ensureTheme(page, 'light');

    await page.locator('#theme-switcher').click();
    await expectTheme(page, 'dark');

    await page.locator('#theme-switcher').click();
    await expectTheme(page, 'light');
  });
}

test('locale switcher works', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL('/');

  await page.locator('#locale-switcher').click();
  await page.locator('[data-lang="es"]').click();

  await expect(page).toHaveURL('/es');

  await page.locator('#locale-switcher').click();
  await page.locator('[data-lang="en"]').click();

  await expect(page).toHaveURL('/');
});
