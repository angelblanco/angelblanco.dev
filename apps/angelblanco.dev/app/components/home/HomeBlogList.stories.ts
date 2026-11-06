import type { Meta, StoryObj } from '@storybook-vue/nuxt';
import { expect, within } from 'storybook/test';
import { homeBlogPosts, realHomeBlogPosts } from '../../../.storybook/fixtures/blog';
import HomeBlogList from './HomeBlogList.vue';

const [latestPost, ...otherPosts] = realHomeBlogPosts;

const allOtherPosts = homeBlogPosts.slice(1);

const meta = {
  title: 'Home/BlogList',
  component: HomeBlogList,
  args: { latestPost, otherPosts },
} satisfies Meta<typeof HomeBlogList>;

export default meta;

type Story = StoryObj<typeof meta>;

async function expectLinks(canvasElement: HTMLElement, posts: typeof otherPosts) {
  const links = within(canvasElement).getAllByRole('link');

  await expect(links).toHaveLength(posts.length + 2);
  await expect(links[0]).toHaveAttribute('href', expect.stringContaining(latestPost!.path));
  for (const [index, post] of posts.entries())
    await expect(links[index + 1]).toHaveAttribute('href', expect.stringContaining(post.path));
  await expect(links.at(-1)).toHaveAttribute('href', expect.stringMatching(/\/blog\/?$/));
}

export const Default: Story = {
  play: async ({ canvasElement }) => {
    await expectLinks(canvasElement, otherPosts);
  },
};

export const Full: Story = {
  args: { otherPosts: allOtherPosts },
  play: async ({ canvasElement }) => {
    await expectLinks(canvasElement, allOtherPosts);
  },
};

export const OnlyLatest: Story = {
  args: { otherPosts: [] },
  play: async ({ canvasElement }) => {
    const links = within(canvasElement).getAllByRole('link');

    await expect(links).toHaveLength(2);
    await expect(canvasElement.querySelector('.divide-y')).toBeNull();
  },
};

export const Empty: Story = {
  args: { latestPost: null, otherPosts: [] },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getAllByRole('link')).toHaveLength(1);
  },
};

export const Mobile: Story = {
  tags: ['!test', '!autodocs'],
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
};
