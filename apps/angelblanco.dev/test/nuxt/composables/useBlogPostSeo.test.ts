import type { EffectScope } from 'vue';
import type { BlogCollectionItem } from '~/composables/useBlog';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { setI18nParams, useSchemaOrgMock } = vi.hoisted(() => ({
  setI18nParams: vi.fn(),
  useSchemaOrgMock: vi.fn(),
}));

mockNuxtImport('useSetI18nParams', () => () => setI18nParams);
mockNuxtImport('useSchemaOrg', () => useSchemaOrgMock);

function makePost(overrides: Partial<BlogCollectionItem> = {}): BlogCollectionItem {
  return {
    path: '/es/blog/install-node',
    title: 'Instalar Node.js con apt',
    description: 'Instala Node.js con apt',
    tags: ['nodejs', 'ubuntu'],
    date: '2025-10-12',
    ...overrides,
  } as BlogCollectionItem;
}

function metaProperties(): Record<string, string[]> {
  const properties: Record<string, string[]> = {};

  for (const meta of document.head.querySelectorAll<HTMLMetaElement>('meta[property]'))
    (properties[meta.getAttribute('property')!] ??= []).push(meta.content);

  return properties;
}

let scope: EffectScope | undefined;

function setup(post: BlogCollectionItem, locales: ('en' | 'es')[], ogImages: string[] = []) {
  scope = effectScope();
  scope.run(() => useBlogPostSeo(post, locales, ogImages));
}

function metaNames(): Record<string, string> {
  return Object.fromEntries([
    ...document.head.querySelectorAll<HTMLMetaElement>('meta[name]'),
  ]
    .map(meta => [meta.name, meta.content]));
}

function article() {
  return useSchemaOrgMock.mock.lastCall![0][0];
}

describe('composables: useBlogPostSeo', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    scope?.stop();
  });

  it.each([
    ['/blog/hello', 'hello'],
    ['/es/blog/hello/', 'hello'],
    ['/blog/0001.hello', '0001.hello'],
  ])('should read the slug of %s', (path, slug) => {
    expect(postSlug(path)).toBe(slug);
  });

  it.each([
    ['/blog/hello/', '/blog/hello'],
    ['/blog/hello', '/blog/hello'],
    ['/', '/'],
  ])('should remove the trailing slash of %s', (path, expected) => {
    expect(withoutTrailingSlash(path)).toBe(expected);
  });

  it.each([
    ['2025-10-12', '2025-10-12T00:00:00Z'],
    ['2025-10-12T08:30:00+02:00', '2025-10-12T08:30:00+02:00'],
  ])('should turn %s into an ISO date time', (date, expected) => {
    expect(toIsoDateTime(date)).toBe(expected);
  });

  it('should only set the i18n params of the translated locales', () => {
    setup(makePost(), ['es']);

    expect(setI18nParams).toHaveBeenCalledWith({
      es: { slug: 'install-node' },
    });
  });

  it('should set the i18n params of every translation', () => {
    setup(makePost(), ['es', 'en']);

    expect(setI18nParams).toHaveBeenCalledWith({
      es: { slug: 'install-node' },
      en: { slug: 'install-node' },
    });
  });

  it('should mark the page as an article', async () => {
    setup(makePost(), ['es']);

    await vi.waitFor(() => expect(metaProperties()).toMatchObject({
      'og:type': ['article'],
      'article:published_time': ['2025-10-12T00:00:00Z'],
      'article:modified_time': ['2025-10-12T00:00:00Z'],
      'article:tag': ['nodejs', 'ubuntu'],
      'article:author': [
        expect.stringMatching(/\/about\/?$/),
      ],
    }));
  });

  it('should use updatedAt as modified time', async () => {
    setup(makePost({ updatedAt: '2026-11-05' }), ['es']);

    await vi.waitFor(() => expect(metaProperties()).toMatchObject({
      'article:published_time': ['2025-10-12T00:00:00Z'],
      'article:modified_time': ['2026-11-05T00:00:00Z'],
    }));
  });

  it('should add the reading time as a twitter label', async () => {
    setup(makePost({ readingTime: 4 }), ['es']);

    await vi.waitFor(() => expect(metaNames()).toMatchObject({
      'twitter:label1': 'blogReadingTimeLabel',
      'twitter:data1': 'blogReadingTime',
    }));
  });

  it('should define a BlogPosting', () => {
    setup(makePost({ updatedAt: '2026-11-05' }), ['es']);

    expect(article()).toMatchObject({
      '@type': 'BlogPosting',
      'headline': 'Instalar Node.js con apt',
      'description': 'Instala Node.js con apt',
      'datePublished': '2025-10-12T00:00:00Z',
      'dateModified': '2026-11-05T00:00:00Z',
      'keywords': ['nodejs', 'ubuntu'],
    });
    expect(article()).not.toHaveProperty('image');
    expect(article()).not.toHaveProperty('wordCount');
    expect(article()).not.toHaveProperty('timeRequired');
  });

  it('should add the word count and the time required as numbers', () => {
    setup(makePost({ wordCount: '812', readingTime: '5' } as unknown as Partial<BlogCollectionItem>), ['es']);

    expect(article()).toMatchObject({ wordCount: 812, timeRequired: 'PT5M' });
  });

  it('should use every og image as BlogPosting image', () => {
    setup(makePost(), ['es'], ['/_og/s/og.png', '/_og/s/whatsapp.png']);

    expect(article()).toMatchObject({
      image: ['https://angelblanco.dev/_og/s/og.png', 'https://angelblanco.dev/_og/s/whatsapp.png'],
    });
  });

  it('should prefer the post image over the og images', () => {
    setup(makePost({ image: '/images/post.png' }), ['es'], ['/_og/s/og.png']);

    expect(article()).toMatchObject({
      image: ['https://angelblanco.dev/images/post.png'],
    });
  });
});
