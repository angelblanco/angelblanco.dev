import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ref } from 'vue';
import { HomeBlog, HomeBlogList } from '#components';
import { homeBlogPosts } from '../../../.storybook/fixtures/blog';

const { asyncData } = vi.hoisted(() => ({
  asyncData: new Map<string, unknown>(),
}));

mockNuxtImport('useAsyncData', () => (key: string) => Promise.resolve({
  data: ref(asyncData.get(key)),
}));

const [latestPost, ...otherPosts] = homeBlogPosts;

describe('components: HomeBlog', () => {
  beforeEach(() => {
    asyncData.clear();
  });

  it('should pass the queried posts to HomeBlogList', async () => {
    asyncData.set('/_latest', latestPost);
    asyncData.set('/_other', otherPosts);

    const wrapper = await mountSuspended(HomeBlog);
    const list = wrapper.findComponent(HomeBlogList);

    expect(list.props('latestPost')).toEqual(latestPost);
    expect(list.props('otherPosts')).toEqual(otherPosts);
  });

  it('should fall back to no posts when the queries return nothing', async () => {
    const wrapper = await mountSuspended(HomeBlog);
    const list = wrapper.findComponent(HomeBlogList);

    expect(list.props('latestPost')).toBeNull();
    expect(list.props('otherPosts')).toEqual([]);
  });
});
