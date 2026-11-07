import type { Meta, StoryObj } from '@storybook-vue/nuxt';
import { expect, within } from 'storybook/test';
import { realBlogPostSummaries } from '../../../.storybook/fixtures/blog';
import BlogTags from './BlogTags.vue';

const tags = realBlogPostSummaries[0]!.tags;

const meta = {
  title: 'Blog/Tags',
  component: BlogTags,
  args: { tags },
} satisfies Meta<typeof BlogTags>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const list = canvas.getByRole('list');
    const links = canvas.getAllByRole('link');

    await expect(list).toHaveAttribute('aria-label');
    await expect(canvas.getAllByRole('listitem')).toHaveLength(tags.length);
    await expect(links).toHaveLength(tags.length);
    for (const [index, tag] of tags.entries()) {
      await expect(links[index]).toHaveTextContent(`#${tag}`);
      await expect(links[index]!.getAttribute('href')).toMatch(new RegExp(`/blog/tags/${tag}/?$`));
      await expect(links[index]).toHaveClass('z-10');
    }
  },
};

export const Spanish: Story = {
  tags: ['!test', '!autodocs'],
  globals: { locale: 'es' },
};
