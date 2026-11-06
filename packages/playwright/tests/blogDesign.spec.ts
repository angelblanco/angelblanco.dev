import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import { ensureTheme, getLocalizedTranslations, locales, localizedPath, themes } from './utils';

const POST_PATH = '/blog/apt-install-node-26-on-ubuntu-26';

const COPY_TRANS = {
  en: { label: 'Copy code', copied: 'Code copied to the clipboard' },
  es: { label: 'Copiar código', copied: 'Código copiado al portapapeles' },
};

async function recordClipboard(page: Page) {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: async (text: string) => {
          (window as unknown as { copiedText: string }).copiedText = text;
        },
      },
    });
  });
}

for (const locale of locales) {
  for (const theme of themes) {
    test(`it renders accessible code blocks on: ${locale.code} ${theme}`, async ({ page, isMobile }) => {
      const trans = getLocalizedTranslations(locale, COPY_TRANS);
      await recordClipboard(page);
      await page.goto(localizedPath(locale, POST_PATH));
      await expect(page.locator('#theme-switcher')).toBeVisible();
      await ensureTheme(page, theme);

      const blocks = page.locator('[data-code-block]');
      await expect(blocks.first()).toBeVisible();
      await expect(page.locator('[data-testid="code-copy"]')).toHaveCount(await blocks.count());

      await expect(blocks.filter({ hasText: 'ubuntu-install-node-26.sh' }).locator('.i-vscode-icons\\:file-type-shell')).toBeVisible();

      const block = blocks.first();
      const copy = block.getByRole('button', { name: trans.label });

      if (isMobile) {
        await expect(copy).toHaveCSS('opacity', '1');
      }
      else {
        await expect(copy).toHaveCSS('opacity', '0');
        await copy.focus();
        await expect(copy).toHaveCSS('opacity', '1');
      }

      await copy.click();
      await expect(block.getByRole('status')).toHaveText(trans.copied);
      expect(await page.evaluate(() => (window as unknown as { copiedText: string }).copiedText))
        .toBe('curl -fsSL https://angelblanco.dev/scripts/ubuntu-install-node-26.sh | bash\n');

      await page.mouse.move(0, 0);
      await expect(page.locator('[data-code-block]').nth(1)).toHaveScreenshot(`code-block-${locale.code}-${theme}.png`);
    });

    test(`it tracks the reading progress on: ${locale.code} ${theme}`, async ({ page }) => {
      await page.goto(localizedPath(locale, POST_PATH));
      await ensureTheme(page, theme);

      const progress = page.getByTestId('reading-progress');
      await expect(progress).toBeAttached();

      if (await page.evaluate(() => CSS.supports('animation-timeline: scroll()'))) {
        await expect.poll(async () => {
          await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
          return progress.evaluate(el => new DOMMatrix(getComputedStyle(el).transform).a);
        }).toBeGreaterThan(0.95);
      }
      else {
        await expect(progress).toBeHidden();
      }
    });
  }

  test(`it highlights php without the opening tag on: ${locale.code}`, async ({ page }) => {
    await page.goto(localizedPath(locale, '/blog/apt-install-php-85-on-ubuntu-26'));

    const firstLine = page.locator('[data-code-block]').filter({ hasText: '$slug' }).locator('.line').first();
    await expect(firstLine.locator('span')).toHaveCount(3);
    await expect(firstLine.locator('span').nth(1)).toHaveText('=');
  });

  test(`it only slides content in when motion is allowed on: ${locale.code}`, async ({ page }) => {
    const firstParagraph = page.locator('.prose .slide-enter-content > p').first();

    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto(localizedPath(locale, POST_PATH));
    await expect(firstParagraph).toHaveCSS('animation-name', 'slide-enter');

    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect(firstParagraph).toHaveCSS('animation-name', 'none');
  });
}
