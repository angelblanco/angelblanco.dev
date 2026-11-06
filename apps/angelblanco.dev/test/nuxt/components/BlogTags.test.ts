import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { BlogTags } from '#components';

describe('components: BlogTags', () => {
  it('links every tag to its tag page', async () => {
    const wrapper = await mountSuspended(BlogTags, {
      props: {
        tags: ['nuxt', 'vue'],
      },
    });
    const links = wrapper.findAll('a');

    expect(links.map(link => link.text())).toEqual(['#nuxt', '#vue']);
    expect(links.map(link => link.attributes('href'))).toEqual(['/blog/tags/nuxt/', '/blog/tags/vue/']);
  });
});
