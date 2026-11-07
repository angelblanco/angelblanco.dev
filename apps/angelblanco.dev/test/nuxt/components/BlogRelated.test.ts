import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { BlogRelated } from '#components';

function summary(slug: string, date: string, tags: [string, ...string[]]) {
  return {
    id: slug,
    path: `/blog/${slug}`,
    title: slug,
    description: '',
    date,
    readingTime: 3,
    tags,
  };
}

const post = summary('current', '2026-01-01', ['nuxt', 'vue']);

describe('components: BlogRelated', () => {
  it('lists the posts that share tags with the current one', async () => {
    const wrapper = await mountSuspended(BlogRelated, {
      props: {
        post,
        posts: [
          post,
          summary('one-tag', '2026-03-01', ['vue']),
          summary('two-tags', '2025-01-01', ['nuxt', 'vue']),
          summary('unrelated', '2026-02-01', ['php']),
        ],
      },
    });

    expect(wrapper.findAll('h3 a').map(link => link.attributes('href'))).toEqual(['/blog/two-tags/', '/blog/one-tag/']);
    expect(wrapper.get('ul').classes()).toContain('sm:grid-cols-2');
  });

  it('renders nothing without related posts', async () => {
    const wrapper = await mountSuspended(BlogRelated, {
      props: {
        post,
        posts: [
          summary('unrelated', '2026-02-01', ['php']),
        ],
      },
    });

    expect(wrapper.find('#blog-related').exists()).toBe(false);
  });
});
