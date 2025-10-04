import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import trimEnd from 'lodash/trimEnd';
import trimStart from 'lodash/trimStart';

export type Theme = 'light' | 'dark';
export type LocaleCode = 'es' | 'en';

export interface Locale {
  code: LocaleCode;
  path: string;
}

export const locales: Locale[] = [
  { code: 'en', path: '/' },
  { code: 'es', path: '/es' },
];

export const themes: Theme[] = ['light', 'dark'];

export function localizedPath(locale: Locale, path?: string) {
  if (!path || path === '/' || path === '') {
    return locale.path;
  }

  return `${trimEnd(locale.path)}/${trimStart(path, '/')}`;
}

export async function expectTheme(page: Page, theme: Theme) {
  await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
}

// Ensures a theme is set
export async function ensureTheme(page: Page, theme: 'light' | 'dark') {
  const currentTheme = await page.locator('html').getAttribute('data-theme');
  if (currentTheme !== theme)
    await page.locator('#theme-switcher').click();

  await expectTheme(page, theme);
}

// Hides canvas to prevent animations
export async function hideCanvas(page: Page) {
  await page.addStyleTag({
    content: `canvas { display: none !important; }`,
  });
  await expect(page.locator('canvas')).toHaveCSS('display', 'none');
}
