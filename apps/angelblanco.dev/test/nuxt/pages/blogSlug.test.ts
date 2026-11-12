import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { BlogHeader } from '#components';
import { postFixture } from '../../../.storybook/fixtures/blog';

const { posts, queriedPaths } = vi.hoisted(() => ({
  posts: new Map<string, unknown>(),
  queriedPaths: [] as Array<[string, string]>,
}));

mockNuxtImport('queryCollection', () => (collection: string) => {
  let path = '';
  const query = {
    select: () => query,
    order: () => query,
    where: () => query,
    path(value: string) {
      path = value.replace(/\/$/, '');
      queriedPaths.push([collection, value]);
      return query;
    },
    first: async () => posts.get(`${collection}:${path}`) ?? null,
    all: async () => [],
  };
  return query;
});

mockNuxtImport('useLocalizedSeo', () => () => {});

async function mountPost(route: string) {
  const { default: BlogSlugPage } = await import('~/pages/blog/[slug].vue');
  return mountSuspended(BlogSlugPage, { route });
}

describe('pages: blog/[slug]', () => {
  afterEach(async () => {
    posts.clear();
    queriedPaths.length = 0;
    clearNuxtData();
    Reflect.deleteProperty(navigator, 'language');
    await useI18n().setLocale('en');
  });

  it('should query the spanish collection with the spanish path of an english post', async () => {
    posts.set('blog_en:/blog/hello', { ...postFixture, path: '/blog/hello' });
    posts.set('blog_es:/es/blog/hello', { ...postFixture, path: '/es/blog/hello' });
    Object.defineProperty(navigator, 'language', {
      configurable: true,
      get: () => 'es-ES',
    });

    const wrapper = await mountPost('/blog/hello/');

    expect(queriedPaths).toContainEqual([
      'blog_es',
      expect.stringMatching(/^\/es\/blog\/hello\/?$/),
    ]);
    expect(wrapper.findComponent(BlogHeader).props('alternativeLocale')).toBe('es');
    expect(wrapper.get('a[hreflang="es"]').attributes('href')).toBe('/es/blog/hello/');
  });

  it('should query the english collection with the english path of a spanish post', async () => {
    await useI18n().setLocale('es');
    posts.set('blog_es:/es/blog/hello', { ...postFixture, path: '/es/blog/hello' });
    posts.set('blog_en:/blog/hello', { ...postFixture, path: '/blog/hello' });

    const wrapper = await mountPost('/es/blog/hello/');

    expect(queriedPaths).toContainEqual([
      'blog_en',
      expect.stringMatching(/^\/blog\/hello\/?$/),
    ]);
    expect(wrapper.findComponent(BlogHeader).props('alternativeLocale')).toBe('en');
  });

  it('should not link to a translation that does not exist', async () => {
    posts.set('blog_en:/blog/hello', { ...postFixture, path: '/blog/hello' });

    const wrapper = await mountPost('/blog/hello/');

    expect(wrapper.findComponent(BlogHeader).props('alternativeLocale')).toBeNull();
  });
});
