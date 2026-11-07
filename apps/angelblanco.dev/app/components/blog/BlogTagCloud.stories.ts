import type { Meta, StoryObj } from '@storybook-vue/nuxt';
import { expect, within } from 'storybook/test';
import { blogTagCounts } from '../../../.storybook/fixtures/blog';
import BlogTagCloud from './BlogTagCloud.vue';

const meta = {
  title: 'Blog/TagCloud',
  component: BlogTagCloud,
  args: { tags: blogTagCounts },
} satisfies Meta<typeof BlogTagCloud>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const links = canvas.getAllByRole('link');

    await expect(canvas.getByRole('list')).toHaveAttribute('aria-label');
    await expect(canvas.getAllByRole('listitem')).toHaveLength(blogTagCounts.length);
    await expect(links).toHaveLength(blogTagCounts.length);
    for (const [index, { tag, count }] of blogTagCounts.entries()) {
      const link = links[index]!;

      await expect(link.getAttribute('href')).toMatch(new RegExp(`/blog/tags/${tag}/?$`));
      await expect(link.getAttribute('aria-label')).toMatch(new RegExp(`^#${tag}\\b`));
      await expect(link.querySelector('sup')).toHaveTextContent(String(count));
    }
  },
};

export const Spanish: Story = {
  tags: ['!test', '!autodocs'],
  globals: { locale: 'es' },
};
