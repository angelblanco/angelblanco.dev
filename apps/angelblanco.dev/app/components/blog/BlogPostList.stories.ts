import type { Meta, StoryObj } from '@storybook-vue/nuxt';
import type { BlogPostSummary } from '~/composables/useBlog';
import { expect } from 'storybook/test';
import { realBlogPostSummaries } from '../../../.storybook/fixtures/blog';
import BlogPostCard from './BlogPostCard.vue';
import BlogPostList from './BlogPostList.vue';

const postWithoutDescription: BlogPostSummary = { ...realBlogPostSummaries[2]!, description: '' };

const meta = {
  title: 'Blog/PostList',
  component: BlogPostList,
  subcomponents: { BlogPostCard },
  args: { posts: realBlogPostSummaries },
} satisfies Meta<typeof BlogPostList>;

export default meta;

type Story = StoryObj<typeof meta>;

async function expectCard(article: Element, post: BlogPostSummary) {
  const link = article.querySelector('h2 a');
  const tagLinks = article.querySelectorAll(':scope ul a');

  await expect(link).toHaveAttribute('href', expect.stringContaining(post.path));
  await expect(link?.textContent?.trim()).toBe(post.title);
  await expect(link).toHaveClass('after:absolute');
  await expect(article.querySelector(`time[datetime="${post.date}T00:00:00.000Z"]`)).not.toBeNull();
  await expect(article.querySelector('.i-tabler\\:clock')).not.toBeNull();
  await expect(tagLinks).toHaveLength(post.tags.length);
  for (const [index, tag] of post.tags.entries())
    await expect(tagLinks[index]).toHaveAttribute('href', expect.stringContaining(`/blog/tags/${tag}`));
}

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const articles = canvasElement.querySelectorAll('article');

    await expect(articles).toHaveLength(realBlogPostSummaries.length);
    for (const [index, post] of realBlogPostSummaries.entries()) {
      const article = articles[index]!;

      await expectCard(article, post);
      await expect(article.querySelector('p')?.textContent?.trim()).toBe(post.description);
    }
  },
};

export const WithoutDescription: Story = {
  args: {
    posts: [postWithoutDescription],
  },
  play: async ({ canvasElement }) => {
    const articles = canvasElement.querySelectorAll('article');

    await expect(articles).toHaveLength(1);
    await expectCard(articles[0]!, postWithoutDescription);
    await expect(articles[0]!.querySelector('p')).toBeNull();
  },
};

export const Mobile: Story = {
  tags: ['!test', '!autodocs'],
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
};

export const Spanish: Story = {
  tags: ['!test', '!autodocs'],
  globals: { locale: 'es' },
};
