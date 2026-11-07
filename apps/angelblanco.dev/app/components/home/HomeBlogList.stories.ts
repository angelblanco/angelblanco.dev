import type { Meta, StoryObj } from '@storybook-vue/nuxt';
import type { BlogPostSummary } from '~/composables/useBlog';
import { expect, within } from 'storybook/test';
import { homeBlogPosts, realBlogPostSummaries } from '../../../.storybook/fixtures/blog';
import HomeBlogList from './HomeBlogList.vue';

const [latestPost, ...otherPosts] = realBlogPostSummaries;

const allOtherPosts = homeBlogPosts.slice(1);

const meta = {
  title: 'Home/BlogList',
  component: HomeBlogList,
  args: { latestPost, otherPosts },
} satisfies Meta<typeof HomeBlogList>;

export default meta;

type Story = StoryObj<typeof meta>;

async function expectPostLink(link: HTMLElement | undefined, post: BlogPostSummary) {
  await expect(link).toHaveAttribute('href', expect.stringContaining(post.path));
  await expect(link!.querySelector('time')).toHaveAttribute('datetime', `${post.date}T00:00:00.000Z`);
  await expect(link!.querySelector('.i-tabler\\:clock')).not.toBeNull();
}

async function expectLinks(canvasElement: HTMLElement, posts: BlogPostSummary[]) {
  const links = within(canvasElement).getAllByRole('link');

  await expect(links).toHaveLength(posts.length + 2);
  await expectPostLink(links[0], latestPost!);
  for (const tag of latestPost!.tags)
    await expect(links[0]).toHaveTextContent(`#${tag}`);
  for (const [index, post] of posts.entries())
    await expectPostLink(links[index + 1], post);
  await expect(links.at(-1)).toHaveAttribute('href', expect.stringMatching(/\/blog\/?$/));
  await expect(links.at(-1)).toHaveClass('text-primary-content', 'dark:text-primary');
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

export const Spanish: Story = {
  tags: ['!test', '!autodocs'],
  globals: { locale: 'es' },
};

export const Mobile: Story = {
  tags: ['!test', '!autodocs'],
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
};
