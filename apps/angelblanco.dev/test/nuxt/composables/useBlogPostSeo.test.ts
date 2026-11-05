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

function setup(post: BlogCollectionItem, locales: ('en' | 'es')[]) {
  scope = effectScope();
  scope.run(() => useBlogPostSeo(post, locales));
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
      'article:published_time': ['2025-10-12'],
      'article:modified_time': ['2025-10-12'],
      'article:tag': ['nodejs', 'ubuntu'],
      'article:author': [
        expect.stringMatching(/\/about\/?$/),
      ],
    }));
  });

  it('should use updatedAt as modified time', async () => {
    setup(makePost({ updatedAt: '2026-11-05' }), ['es']);

    await vi.waitFor(() => expect(metaProperties()).toMatchObject({
      'article:published_time': ['2025-10-12'],
      'article:modified_time': ['2026-11-05'],
    }));
  });

  it('should define a BlogPosting', () => {
    setup(makePost({ updatedAt: '2026-11-05' }), ['es']);

    expect(article()).toMatchObject({
      '@type': 'BlogPosting',
      'headline': 'Instalar Node.js con apt',
      'description': 'Instala Node.js con apt',
      'datePublished': '2025-10-12',
      'dateModified': '2026-11-05',
      'keywords': ['nodejs', 'ubuntu'],
    });
    expect(article()).not.toHaveProperty('image');
  });

  it('should add the post image when there is one', () => {
    setup(makePost({ image: '/images/post.png' }), ['es']);

    expect(article()).toMatchObject({ image: '/images/post.png' });
  });
});
