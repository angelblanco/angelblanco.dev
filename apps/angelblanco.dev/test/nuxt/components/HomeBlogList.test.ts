import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { HomeBlogList } from '#components';
import { homeBlogPosts } from '../../../.storybook/fixtures/blog';

const [latestPost, ...otherPosts] = homeBlogPosts;

describe('components: HomeBlogList', () => {
  it('should link the latest post and show its tags', async () => {
    const wrapper = await mountSuspended(HomeBlogList, {
      props: { latestPost: latestPost!, otherPosts },
    });
    const link = wrapper.findAll('a')[0]!;

    expect(link.attributes('href')).toBe(`${latestPost!.path}/`);
    expect(link.text()).toContain(latestPost!.title);
    for (const tag of latestPost!.tags)
      expect(link.text()).toContain(`#${tag}`);
  });

  it('should render one link per other post', async () => {
    const wrapper = await mountSuspended(HomeBlogList, {
      props: { latestPost: latestPost!, otherPosts },
    });
    const hrefs = wrapper.findAll('.divide-y a').map(link => link.attributes('href'));

    expect(hrefs).toEqual(otherPosts.map(post => `${post.path}/`));
    expect(wrapper.text()).toContain('Other entries');
  });

  it('should not render the other posts list when there are none', async () => {
    const wrapper = await mountSuspended(HomeBlogList, {
      props: { latestPost: latestPost!, otherPosts: [] },
    });

    expect(wrapper.find('.divide-y').exists()).toBe(false);
    expect(wrapper.text()).not.toContain('Other entries');
    expect(wrapper.findAll('a')).toHaveLength(2);
  });

  it('should only render the show more link without posts', async () => {
    const wrapper = await mountSuspended(HomeBlogList, {
      props: { latestPost: null, otherPosts: [] },
    });
    const links = wrapper.findAll('a');

    expect(links).toHaveLength(1);
    expect(links[0]!.attributes('href')).toBe('/blog/');
    expect(links[0]!.text()).toBe('Show more');
  });
});
