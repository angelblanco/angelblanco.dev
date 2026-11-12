import type { Meta, StoryObj } from '@storybook-vue/nuxt';
import { expect, waitFor, within } from 'storybook/test';
import { h } from 'vue';
import { articleBody, articleHeadingIds } from '../../../.storybook/fixtures/article';
import { emptyTocFixture, postFixture, realBlogPostSummaries, tocFixture } from '../../../.storybook/fixtures/blog';
import { withNavigatorLanguage } from '../../../.storybook/fixtures/navigator';
import UiContentWrapper from '../ui/UiContentWrapper.vue';
import BlogAlternativeLocaleLink from './BlogAlternativeLocaleLink.vue';
import BlogHeader from './BlogHeader.vue';
import BlogPostMeta from './BlogPostMeta.vue';
import BlogTags from './BlogTags.vue';
import BlogToc from './BlogToc.vue';

const eslintPost = realBlogPostSummaries[2]!;

const tocIds = tocFixture.links.flatMap(link => [
  link,
  ...(link.children ?? []),
]).map(({ id }) => id);

const meta = {
  title: 'Blog/Header',
  component: BlogHeader,
  subcomponents: {
    BlogAlternativeLocaleLink,
    BlogPostMeta,
    BlogTags,
    BlogToc,
  },
  args: { post: postFixture, alternativeLocale: 'es' },
  decorators: [
    withNavigatorLanguage('es-ES'),
  ],
} satisfies Meta<typeof BlogHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole('heading', { level: 1 }).textContent?.trim()).toBe(postFixture.title);
    await expect(canvasElement.querySelector('a[href*="/about"]')).not.toBeNull();
    await waitFor(() => expect(canvasElement.querySelectorAll('.text-secondary a')).toHaveLength(1));
    await expect(canvasElement.querySelector('.text-secondary a')).toHaveClass('bg-secondary/10', 'dark:font-medium');
    await expect(canvasElement.querySelectorAll('button[aria-expanded]')).toHaveLength(1);
    await expect(canvasElement.querySelector('time')).toHaveAttribute('datetime', `${postFixture.date}T00:00:00.000Z`);
    await expect(canvasElement.querySelector('.i-tabler\\:clock')).not.toBeNull();

    const tagLinks = within(canvas.getByRole('list')).getAllByRole('link');

    await expect(tagLinks).toHaveLength(postFixture.tags.length);
    for (const [index, tag] of postFixture.tags.entries()) {
      await expect(tagLinks[index]).toHaveAttribute('href', expect.stringMatching(new RegExp(`/blog/tags/${tag}/?$`)));
    }
  },
};

export const WithoutAlternativeLocale: Story = {
  args: { alternativeLocale: null },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector('a[href*="/about"]')).not.toBeNull();
    await expect(canvasElement.querySelector('.text-secondary')).toBeNull();
  },
};

export const EnglishBrowser: Story = {
  decorators: [
    withNavigatorLanguage('en-US'),
  ],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('heading', { level: 1 })).toBeInTheDocument();
    await expect(canvasElement.querySelector('.text-secondary')).toBeNull();
  },
};

export const EmptyToc: Story = {
  args: {
    post: {
      ...postFixture,
      body: { ...postFixture.body, toc: emptyTocFixture },
    },
  },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('heading', { level: 1 })).toBeInTheDocument();
    await expect(canvasElement.querySelector('button[aria-expanded]')).toBeNull();
  },
};

export const LongTitle: Story = {
  args: {
    post: {
      ...postFixture,
      title: eslintPost.title,
      date: eslintPost.date,
      readingTime: eslintPost.readingTime,
      tags: eslintPost.tags,
    },
  },
  play: async ({ canvasElement }) => {
    const heading = within(canvasElement).getByRole('heading', { level: 1 });

    await expect(heading.textContent?.trim()).toBe(eslintPost.title);
  },
};

const renderArticle: Story['render'] = args => ({
  setup: () => () => h('div', { class: 'mx-auto max-w-post p-4' }, [
    h(BlogHeader, args),
    h(UiContentWrapper, { class: 'max-w-none' }, { default: articleBody }),
  ]),
});

export const Article: Story = {
  parameters: { layout: 'fullscreen' },
  render: renderArticle,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole('heading', { level: 1 })).toBeInTheDocument();
    await expect(canvas.getByRole('table')).toBeInTheDocument();
    await expect(canvasElement.querySelector('.prose')).toHaveClass('max-w-none');
    await expect(canvasElement.querySelectorAll('.prose pre.shiki').length).toBeGreaterThan(0);
    for (const id of articleHeadingIds) {
      await expect(tocIds).toContain(id);
      await expect(canvasElement.querySelector(`.prose #${id}`)).not.toBeNull();
    }
  },
};

export const Dark: Story = {
  tags: ['!test', '!autodocs'],
  globals: { theme: 'dark' },
};

export const Spanish: Story = {
  tags: ['!test', '!autodocs'],
  args: {
    post: { ...postFixture, title: 'Instalar PHP 8.5 con apt en Ubuntu 26.04' },
    alternativeLocale: 'en',
  },
  globals: { locale: 'es' },
};

export const Mobile: Story = {
  tags: ['!test', '!autodocs'],
  parameters: { layout: 'fullscreen' },
  render: renderArticle,
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
};
