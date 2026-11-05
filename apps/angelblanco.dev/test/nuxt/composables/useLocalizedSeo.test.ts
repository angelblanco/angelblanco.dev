import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const defineOgImage = vi.fn();
vi.stubGlobal('defineOgImage', defineOgImage);

const route = vi.hoisted(() => ({ path: '/' }));
mockNuxtImport('useRoute', () => () => route);

function ogImageProps() {
  return defineOgImage.mock.lastCall?.[1];
}

describe('composables: useLocalizedSeo', () => {
  beforeEach(() => {
    defineOgImage.mockClear();
  });

  afterEach(() => {
    route.path = '/';
    useI18n().setLocale('en');
  });

  it('should define the og and whatsapp images', () => {
    useLocalizedSeo({ title: 'Blog', description: 'BlogDescription' });

    expect(defineOgImage).toHaveBeenCalledWith(
      'PortfolioOgImage',
      expect.objectContaining({ title: 'Blog', description: 'BlogDescription' }),
      [
        { key: 'og', width: 1200, height: 600 },
        {
          key: 'whatsapp',
          width: 800,
          height: 800,
          props: { square: true },
        },
      ],
    );
  });

  it('should pass the default cta key to t', () => {
    useLocalizedSeo({ title: 'Blog', description: 'BlogDescription' });

    expect(ogImageProps().cta).toBe('ogCtaDefault');
  });

  it('should pass a custom cta key to t', () => {
    useLocalizedSeo({ title: 'Blog', description: 'BlogDescription', cta: 'ogCtaArticle' });

    expect(ogImageProps().cta).toBe('ogCtaArticle');
  });

  it('should read refs as they are', () => {
    useLocalizedSeo({
      title: ref('My post'),
      description: computed(() => 'About my post'),
      cta: ref('Custom'),
    });

    expect(ogImageProps()).toMatchObject({ title: 'My post', description: 'About my post', cta: 'Custom' });
  });

  it('should not add a section on the home page', () => {
    useLocalizedSeo({ title: 'Blog', description: 'BlogDescription' });

    expect(ogImageProps().section).toBeUndefined();
  });

  it.each<['en' | 'es', string, string | undefined]>([
    ['en', '/blog/my-post', 'blog'],
    ['en', '/projects', 'projects'],
    ['en', '/about/', 'about'],
    ['es', '/es', undefined],
    ['es', '/es/', undefined],
    ['es', '/es/blog/my-post', 'blog'],
    ['es', '/es/projects', 'projects'],
  ])('should use the first non-locale segment as section (%s %s)', (locale, path, section) => {
    useI18n().setLocale(locale);
    route.path = path;

    useLocalizedSeo({ title: 'Blog', description: 'BlogDescription' });

    expect(ogImageProps().section).toBe(section);
  });
});
