import type { Meta, StoryObj } from '@storybook-vue/nuxt';
import { expect, within } from 'storybook/test';
import { h } from 'vue';
import { realBlogPostSummaries } from '../../../.storybook/fixtures/blog';
import BlogDate from './BlogDate.vue';
import BlogPostMeta from './BlogPostMeta.vue';
import BlogReadingTime from './BlogReadingTime.vue';

const post = realBlogPostSummaries[0]!;
const datetime = `${post.date}T00:00:00.000Z`;

function getSeparators(canvasElement: HTMLElement): HTMLElement[] {
  return [
    ...canvasElement.querySelectorAll<HTMLElement>('span[aria-hidden="true"]'),
  ]
    .filter(span => span.textContent?.trim() === '·');
}

const meta = {
  title: 'Blog/PostMeta',
  component: BlogPostMeta,
  subcomponents: { BlogDate, BlogReadingTime },
  args: { post },
} satisfies Meta<typeof BlogPostMeta>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const times = canvasElement.querySelectorAll('time');

    await expect(times).toHaveLength(1);
    await expect(times[0]).toHaveAttribute('datetime', datetime);
    await expect(canvasElement.querySelector('.i-tabler\\:clock')).not.toBeNull();
    await expect(getSeparators(canvasElement)).toHaveLength(1);
  },
};

export const WithoutReadingTime: Story = {
  args: {
    post: { date: post.date },
  },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector('time')).toHaveAttribute('datetime', datetime);
    await expect(canvasElement.querySelector('.i-tabler\\:clock')).toBeNull();
    await expect(getSeparators(canvasElement)).toHaveLength(0);
  },
};

export const WithSlot: Story = {
  render: args => ({
    setup: () => () => h(BlogPostMeta, args, {
      default: () => [
        h('span', { 'aria-hidden': 'true' }, '·'),
        h('a', { href: '/about', class: 'hover:text-primary' }, 'Ángel Blanco'),
      ],
    }),
  }),
  play: async ({ canvasElement }) => {
    const time = canvasElement.querySelector('time');
    const link = within(canvasElement).getByRole('link', { name: 'Ángel Blanco' });

    await expect(time).not.toBeNull();
    await expect(link).toHaveAttribute('href', '/about');
    await expect(time!.compareDocumentPosition(link) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    await expect(getSeparators(canvasElement)).toHaveLength(2);
  },
};

export const Spanish: Story = {
  tags: ['!test', '!autodocs'],
  globals: { locale: 'es' },
};
