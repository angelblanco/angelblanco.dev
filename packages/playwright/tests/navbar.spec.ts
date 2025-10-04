import { expect, test } from '@playwright/test';
import { ensureTheme, expectTheme, locales } from './utils';

for (const locale of locales) {
  // TODO:
  // test(`navbar navigates correctly for locale: ${locale.code} with translated set`, async ({
  //   page,
  //   isMobile,
  // }) => {
  //   await page.goto(locale.path);

  //   const blogLinkName = 'Blog';
  //   const projectsLinkName = locale.code === 'es' ? 'Proyectos' : 'Projects';
  //   const aboutLinkName = locale.code === 'es' ? 'Sobre mí' : 'Me';

  //   const blogPath = locale.code === 'es' ? '/es/blog' : '/blog';
  //   const projectsPath = locale.code === 'es' ? '/es/projects' : '/projects';
  //   const aboutPath = locale.code === 'es' ? '/es/about' : '/about';

  //   const getLink = (name: string) => {
  //     if (isMobile)
  //       return page.locator('.fixed.inset-0').getByRole('link', { name, exact: true });

  //     return page.locator('nav').getByRole('link', { name, exact: true });
  //   };

  //   async function openMobileMenu() {
  //     if (isMobile) {
  //       const menuButton = page.getByRole('button', {
  //         name: /open|close/i,
  //       });
  //       if (await menuButton.isVisible())
  //         await menuButton.click();
  //     }
  //   }

  //   await openMobileMenu();
  //   await getLink(blogLinkName).click();
  //   await page.waitForURL(new RegExp(`.*${blogPath}`));

  //   await page.goto(locale.path);
  //   await openMobileMenu();
  //   await getLink(projectsLinkName).click();
  //   await page.waitForURL(new RegExp(`.*${projectsPath}`));

  //   await page.goto(locale.path);
  //   await openMobileMenu();
  //   await getLink(aboutLinkName).click();
  //   await page.waitForURL(new RegExp(`.*${aboutPath}`));
  // });

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
