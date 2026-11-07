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

const NAVBAR_A11Y_TRANS = {
  en: {
    navigation: 'Main navigation',
    github: 'Source code on GitHub',
    theme: 'Dark theme',
    language: 'Change language',
    menu: 'Menu',
  },
  es: {
    navigation: 'Navegación principal',
    github: 'Código fuente en GitHub',
    theme: 'Tema oscuro',
    language: 'Cambiar idioma',
    menu: 'Menú',
  },
};

for (const locale of locales) {
  test(`navbar controls are accessible with the keyboard in locale: ${locale.code}`, async ({ page }) => {
    await page.goto(locale.path);

    const trans = getLocalizedTranslations(locale, NAVBAR_A11Y_TRANS);
    const mustHaveToggle = (page.viewportSize()?.width || 0) < 767;

    await expect(page.getByRole('navigation', { name: trans.navigation })).toBeVisible();
    await expect(page.getByRole('link', { name: trans.github })).toHaveAttribute('rel', /noopener/);
    await expect(page.getByRole('button', { name: trans.theme })).toHaveAttribute('aria-pressed', /^(?:true|false)$/);

    const language = page.getByRole('button', { name: trans.language });
    await language.focus();
    await page.keyboard.press('Enter');
    await expect(language).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('#locale-switcher-menu')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(language).toHaveAttribute('aria-expanded', 'false');
    await expect(language).toBeFocused();

    if (!mustHaveToggle)
      return;

    const menu = page.getByRole('button', { name: trans.menu });
    await menu.focus();
    await page.keyboard.press('Enter');
    await expect(menu).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('#ui-nav-bar-menu')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('#ui-nav-bar-menu')).toBeHidden();
    await expect(menu).toBeFocused();
  });

  test(`navbar navigates correctly for locale: ${locale.code} with translated set`, async ({
    page,
  }) => {
    await page.goto(locale.path);

    const viewportSize = page.viewportSize();
    const mustHaveToggle = (viewportSize?.width || 0) < 767;
    const trans = getLocalizedTranslations(locale, NAVBAR_EXPECTED_TRANS);

    const getLink = (name: string) => {
      const parentLocator = mustHaveToggle
        ? page.locator('#ui-nav-bar-menu')
        : page.locator('nav');
      return parentLocator.getByRole('link', { name });
    };

    await ensureNavbarIsOpen(page, mustHaveToggle);
    await getLink(trans.blog).click();
    await page.waitForURL(localizedPath(locale, '/blog/'));

    await page.goto(locale.path);
    await ensureNavbarIsOpen(page, mustHaveToggle);
    await getLink(trans.projects).click();
    await page.waitForURL(localizedPath(locale, '/projects/'));

    await page.goto(locale.path);
    await ensureNavbarIsOpen(page, mustHaveToggle);
    await getLink(trans.about).click();
    await page.waitForURL(localizedPath(locale, '/about/'));
  });

  test(`navbar fits a 320px wide screen in locale: ${locale.code}`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 640 });
    await page.goto(locale.path);

    const trans = getLocalizedTranslations(locale, NAVBAR_A11Y_TRANS);
    const nav = page.getByRole('navigation', { name: trans.navigation });

    await expect(page.getByRole('button', { name: trans.menu })).toBeInViewport({ ratio: 1 });
    expect(await nav.evaluate(element => element.scrollWidth - element.clientWidth)).toBeLessThanOrEqual(0);
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

  await expect(page).toHaveURL('/es/');

  await page.locator('#locale-switcher').click();
  await page.locator('[data-lang="en"]').click();

  await expect(page).toHaveURL('/');
});
