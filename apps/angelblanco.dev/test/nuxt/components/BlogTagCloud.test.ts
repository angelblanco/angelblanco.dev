import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { BlogTagCloud } from '#components';

describe('components: BlogTagCloud', () => {
  it('links every tag to its tag page and shows its number of posts', async () => {
    const wrapper = await mountSuspended(BlogTagCloud, {
      props: {
        tags: [
          { tag: 'nuxt', count: 3 },
          { tag: 'vue', count: 1 },
        ],
      },
    });
    const links = wrapper.findAll('a');

    expect(links.map(link => link.text())).toEqual(['#nuxt3', '#vue1']);
    expect(links.map(link => link.attributes('href'))).toEqual(['/blog/tags/nuxt/', '/blog/tags/vue/']);
    expect(links.map(link => link.attributes('aria-label'))).toEqual(['#nuxt, 3 articles', '#vue, 1 article']);
  });
});
