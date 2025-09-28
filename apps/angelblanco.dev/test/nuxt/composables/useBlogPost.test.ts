import { describe, expect, it } from 'vitest';
import { mockI18n } from '../test-utils';

mockI18n();

describe('composables: useBlogPost', () => {
  it('should fetch a blog post and its alternative', async () => {
    const { setLocale } = useI18n();
    await setLocale('en');

    const { post, alternativePost, postPending, altPending } = useBlogPost('/blog/hello-v2');

    expect(postPending.value).toBe(false);
    expect(altPending.value).toBe(false);
    expect(post.value).toBeDefined();
    expect(post.value?.title).toBe('Hello v2!');
    expect(alternativePost.value).toBeDefined();
    expect(alternativePost.value?.title).toBe('¡Hola v2!');
  });
});
