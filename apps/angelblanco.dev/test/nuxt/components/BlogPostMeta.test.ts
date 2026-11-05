import { mountSuspended } from '@nuxt/test-utils/runtime';
import { afterEach, describe, expect, it } from 'vitest';
import { BlogPostMeta } from '#components';

describe('components: BlogPostMeta', () => {
  afterEach(async () => {
    await useI18n().setLocale('en');
  });

  it('renders the date with <time> in the current locale and UTC', async () => {
    const wrapper = await mountSuspended(BlogPostMeta, {
      props: {
        post: { date: '2025-09-27', readingTime: 4 },
      },
    });
    const time = wrapper.get('time');

    expect(time.attributes('datetime')).toBe('2025-09-27T00:00:00.000Z');
    expect(time.text()).toBe('September 27, 2025');
  });

  it('formats the date in spanish', async () => {
    await useI18n().setLocale('es');
    const wrapper = await mountSuspended(BlogPostMeta, {
      props: {
        post: { date: '2025-09-27', readingTime: 4 },
      },
    });

    expect(wrapper.get('time').text()).toBe('27 de septiembre de 2025');
  });

  it('renders the reading time only when available', async () => {
    const withReadingTime = await mountSuspended(BlogPostMeta, {
      props: {
        post: { date: '2025-09-27', readingTime: 4 },
      },
    });
    const withoutReadingTime = await mountSuspended(BlogPostMeta, {
      props: {
        post: { date: '2025-09-27' },
      },
    });

    expect(withReadingTime.text()).toContain('blogReadingTime');
    expect(withReadingTime.find('.i-tabler\\:clock').exists()).toBe(true);
    expect(withoutReadingTime.text()).not.toContain('blogReadingTime');
  });
});
