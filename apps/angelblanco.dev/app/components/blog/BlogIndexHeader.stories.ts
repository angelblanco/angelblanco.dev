import type { Meta, StoryObj } from '@storybook-vue/nuxt';
import { expect, within } from 'storybook/test';
import { h } from 'vue';
import { useI18n } from '#imports';
import { blogTagCounts } from '../../../.storybook/fixtures/blog';
import BlogBackLink from './BlogBackLink.vue';
import BlogIndexHeader from './BlogIndexHeader.vue';
import BlogTagCloud from './BlogTagCloud.vue';

const allTopicsHref = /\/blog\/tags\/?$/;

const meta = {
  title: 'Blog/IndexHeader',
  component: BlogIndexHeader,
  subcomponents: { BlogTagCloud, BlogBackLink },
} satisfies Meta<typeof BlogIndexHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

function getAllTopicsLink(canvasElement: HTMLElement): HTMLAnchorElement | undefined {
  return Array.from(canvasElement.querySelectorAll('a')).find(link => allTopicsHref.test(link.getAttribute('href') ?? ''));
}

export const Default: Story = {
  args: { tags: blogTagCounts },
  play: async ({ canvasElement }) => {
    const cloud = within(canvasElement).getByRole('list');
    const cloudLinks = within(cloud).getAllByRole('link');
    const allTopicsLink = getAllTopicsLink(canvasElement);

    await expect(canvasElement.querySelectorAll('h1')).toHaveLength(1);
    await expect(cloud).toHaveAttribute('aria-label');
    await expect(within(cloud).getAllByRole('listitem')).toHaveLength(blogTagCounts.length);
    await expect(cloudLinks).toHaveLength(blogTagCounts.length);
    await expect(cloudLinks[0]).toHaveAttribute('href', expect.stringContaining(`/blog/tags/${blogTagCounts[0]!.tag}`));
    await expect(allTopicsLink).toBeDefined();
    await expect(allTopicsLink!.querySelector('.i-tabler\\:arrow-right')).not.toBeNull();
    await expect(allTopicsLink).toHaveClass('text-primary-content', 'dark:text-primary');
  },
};

export const WithoutTags: Story = {
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).queryByRole('list')).toBeNull();
    await expect(getAllTopicsLink(canvasElement)).toBeUndefined();
    await expect(canvasElement.querySelectorAll('h1')).toHaveLength(1);
    await expect(canvasElement.querySelector('h1 + p')).not.toBeNull();
  },
};

export const Topics: Story = {
  parameters: {
    docs: {
      description: { story: 'The header of the topics index page, with `BlogBackLink` in the `back` slot and its own title and description.' },
    },
  },
  render: () => ({
    setup: () => {
      const { t } = useI18n();

      return () => h(BlogIndexHeader, null, {
        back: () => h(BlogBackLink, { to: '/blog' }, {
          default: () => t('blogAllPosts'),
        }),
        title: () => t('blogTopics'),
        description: () => t('blogTopicsDescription'),
      });
    },
  }),
  play: async ({ canvasElement }) => {
    const links = within(canvasElement).getAllByRole('link');
    const heading = canvasElement.querySelector('h1');

    await expect(links).toHaveLength(1);
    await expect(links[0]).toHaveAttribute('href', expect.stringMatching(/\/blog\/?$/));
    await expect(links[0]!.querySelector('.i-tabler\\:arrow-left')).not.toBeNull();
    await expect(heading?.textContent?.trim()).toBeTruthy();
    await expect(within(canvasElement).queryByRole('list')).toBeNull();
  },
};

export const Spanish: Story = {
  tags: ['!test', '!autodocs'],
  args: { tags: blogTagCounts },
  globals: { locale: 'es' },
};
