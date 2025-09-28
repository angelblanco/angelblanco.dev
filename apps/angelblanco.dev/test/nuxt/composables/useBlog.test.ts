import { describe, expect, it } from 'vitest';
import { mockI18n } from '../test-utils';

mockI18n();

describe('composables: useBlog', async () => {
  const { setLocale } = useI18n();
  const { locale } = useLocale();

  it('should return the correct blog collection name for english', async () => {
    await setLocale('en');
    const { blogCollection, alternativeBlogCollection } = useBlog();

    expect(blogCollection.value).toBe('blog_en');
    expect(alternativeBlogCollection.value).toBe('blog_es');
  });

  it('should return the correct blog collection name for spanish', async () => {
    await setLocale('es');
    expect(locale.value).toBe('es');
    expect(useLocale().locale.value).toBe('es');
    const { blogCollection, alternativeBlogCollection } = useBlog();

    expect(blogCollection.value).toBe('blog_es');
    expect(alternativeBlogCollection.value).toBe('blog_en');
  });
});
