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

  return `${trimEnd(locale.path, '/')}/${trimStart(path, '/')}`;
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

async function expectMetaProperty(page: Page, property: string) {
  const locator = page.locator(`meta[property='${property}']`);
  await expect(locator).toHaveAttribute('content', /.+/);
}

async function expectMetaName(page: Page, name: string) {
  const locator = page.locator(`meta[name='${name}']`);
  await expect(locator).toHaveAttribute('content', /.+/);
}

export async function expectSeoIsConfigured(page: Page) {
  await expect(page).toHaveTitle(/.+/);
  await expectMetaName(page, 'description');
  await expectMetaProperty(page, 'og:title');
  await expectMetaProperty(page, 'og:description');
  await expectMetaProperty(page, 'og:image');
  await expectMetaProperty(page, 'og:url');
  await expectMetaName(page, 'twitter:card');
  await expectMetaName(page, 'twitter:image');
}

export const siteUrl = 'https://angelblanco.dev';

export function absoluteUrl(locale: Locale, path?: string) {
  return `${siteUrl}${trimEnd(localizedPath(locale, path), '/')}/`;
}

export async function readJsonLd(page: Page): Promise<Record<string, any>[]> {
  const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();

  return scripts.flatMap(script => JSON.parse(script)['@graph'] ?? []);
}

export function findSchemaNode(graph: Record<string, any>[], type: string) {
  return graph.find(node => [node['@type']].flat().includes(type));
}

export async function expectLocalizedHeadLinks(page: Page, locale: Locale, path: string) {
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', absoluteUrl(locale, path));
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', absoluteUrl(locale, path));

  for (const [hreflang, code] of [
    ['x-default', 'en'],
    ['en-US', 'en'],
    ['es-ES', 'es'],
  ] as const) {
    const href = absoluteUrl(locales.find(l => l.code === code)!, path);
    await expect(page.locator(`link[rel="alternate"][hreflang="${hreflang}"]`)).toHaveAttribute('href', href);
  }
}

export async function ensureNavbarIsOpen(page: Page, isMobile: boolean, ensureOpen: boolean = true) {
  if (!isMobile)
    return;

  const navBar = page.locator('#ui-nav-bar');

  await expect(navBar).toBeVisible();

  const isOpen = await navBar.getAttribute('data-is-open') === 'true';

  const mobileMenu = page.locator('#ui-nav-bar-menu');

  if ((!isOpen && ensureOpen) || (isOpen && !ensureOpen)) {
    await page.locator('#ui-navbar-toggle').click();
  }

  if (ensureOpen) {
    expect(mobileMenu).toBeVisible();
  }
  else {
    expect(mobileMenu).toBeHidden();
  }
}

export function getLocalizedTranslations<Translations>(locale: Locale, translationsRecord: Record<LocaleCode, Translations>): Translations {
  return translationsRecord[locale.code];
}
