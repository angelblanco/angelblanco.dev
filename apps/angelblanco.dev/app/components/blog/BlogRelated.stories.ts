import type { Meta, StoryObj } from '@storybook-vue/nuxt';
import type { BlogPostSummary } from '~/composables/useBlog';
import { expect, within } from 'storybook/test';
import { relatedPosts, relatedPostsGridClass } from '~/utils/relatedPosts';
import { homeBlogPosts, realBlogPostSummaries } from '../../../.storybook/fixtures/blog';
import BlogRelated from './BlogRelated.vue';

const [phpPost, , eslintPost] = realBlogPostSummaries;

async function expectRelated(canvasElement: HTMLElement, related: BlogPostSummary[]) {
  const canvas = within(canvasElement);
  const section = canvasElement.querySelector('section#blog-related');
  const items = canvas.getAllByRole('listitem');

  await expect(section).toHaveAttribute('aria-labelledby', 'blog-related-title');
  await expect(canvasElement.querySelector('h2#blog-related-title')).not.toBeNull();
  await expect(items).toHaveLength(related.length);
  for (const [index, post] of related.entries()) {
    const link = items[index]!.querySelector('h3 a');

    await expect(link).toHaveAttribute('href', expect.stringContaining(post.path));
    await expect(link).toHaveTextContent(post.title);
    await expect(items[index]!.querySelector('time')).not.toBeNull();
  }

  const list = canvas.getByRole('list');
  const gridClass = relatedPostsGridClass(related.length);

  for (const columns of ['sm:grid-cols-2', 'sm:grid-cols-3']) {
    if (columns === gridClass)
      await expect(list).toHaveClass(columns);
    else
      await expect(list).not.toHaveClass(columns);
  }
}

const meta = {
  title: 'Blog/Related',
  component: BlogRelated,
  args: { post: phpPost!, posts: realBlogPostSummaries },
} satisfies Meta<typeof BlogRelated>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    await expectRelated(canvasElement, relatedPosts(phpPost!, realBlogPostSummaries));
  },
};

export const Single: Story = {
  args: { post: eslintPost! },
  play: async ({ canvasElement }) => {
    await expectRelated(canvasElement, relatedPosts(eslintPost!, realBlogPostSummaries));
  },
};

export const ThreeColumns: Story = {
  args: { posts: homeBlogPosts },
  parameters: {
    docs: {
      description: { story: 'No real post shares tags with three others, so this story adds cloned posts to reach the three column grid.' },
    },
  },
  play: async ({ canvasElement }) => {
    await expectRelated(canvasElement, relatedPosts(phpPost!, homeBlogPosts));
  },
};

export const Mobile: Story = {
  tags: ['!test', '!autodocs'],
  args: { posts: homeBlogPosts },
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
};

export const Spanish: Story = {
  tags: ['!test', '!autodocs'],
  globals: { locale: 'es' },
};
