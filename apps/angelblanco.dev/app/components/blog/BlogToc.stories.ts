import type { Meta, StoryObj } from '@storybook-vue/nuxt';
import { expect, userEvent, within } from 'storybook/test';
import { emptyTocFixture, flatTocFixture, tocFixture } from '../../../.storybook/fixtures/blog';
import BlogToc from './BlogToc.vue';
import BlogTocLink from './BlogTocLink.vue';

const nestedTocLinks = tocFixture.links.flatMap(link => link.children ?? []);
const tocLinkCount = tocFixture.links.length + nestedTocLinks.length;

function getToggle(canvasElement: HTMLElement): HTMLElement {
  const toggle = canvasElement.querySelector<HTMLElement>('.cursor-pointer > div');
  if (!toggle)
    throw new Error('BlogToc toggle not found');
  return toggle;
}

const meta = {
  title: 'Blog/Toc',
  component: BlogToc,
  subcomponents: { BlogTocLink },
  args: { toc: tocFixture },
} satisfies Meta<typeof BlogToc>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = getToggle(canvasElement);

    await expect(canvas.queryAllByRole('link')).toHaveLength(0);
    await expect(canvasElement.querySelector('.cursor-pointer')).not.toHaveClass('pb-4');

    await userEvent.click(toggle);
    await expect(await canvas.findAllByRole('link')).toHaveLength(tocLinkCount);

    await userEvent.click(toggle);
    await expect(canvas.queryAllByRole('link')).toHaveLength(0);
  },
};

export const Expanded: Story = {
  parameters: {
    docs: {
      description: { story: 'Expanded by its play function; click the header to expand it on this page.' },
    },
  },
  play: async ({ canvasElement }) => {
    await userEvent.click(getToggle(canvasElement));
    const links = await within(canvasElement).findAllByRole('link');
    const nestedLinks = canvasElement.querySelectorAll('.pl-4 a');

    await expect(canvasElement.querySelector('.cursor-pointer')).toHaveClass('pb-4');
    await expect(links).toHaveLength(tocLinkCount);
    await expect(links[0]).toHaveAttribute('href', `#${tocFixture.links[0]!.id}`);
    await expect(links[0]).toHaveClass('font-semibold');
    await expect(links[0]!.parentElement).not.toHaveClass('mt-2');
    await expect(links[1]!.parentElement).toHaveClass('mt-2');
    await expect(nestedLinks).toHaveLength(nestedTocLinks.length);
    await expect(nestedLinks[0]).toHaveAttribute('href', `#${nestedTocLinks[0]!.id}`);
    await expect(nestedLinks[0]).not.toHaveClass('font-semibold');
  },
};

export const Flat: Story = {
  args: { toc: flatTocFixture },
  parameters: {
    docs: {
      description: { story: 'A toc without nested headings. Click the header to expand it.' },
    },
  },
  play: async ({ canvasElement }) => {
    await userEvent.click(getToggle(canvasElement));
    const links = await within(canvasElement).findAllByRole('link');

    await expect(links).toHaveLength(flatTocFixture.links.length);
    for (const link of links) {
      await expect(link.getAttribute('href')).toMatch(/^#/);
      await expect(link).toHaveClass('font-semibold');
    }
    await expect(canvasElement.querySelector('.pl-4')).toBeNull();
  },
};

export const Empty: Story = {
  args: { toc: emptyTocFixture },
  parameters: {
    docs: {
      description: { story: 'Renders nothing when the post has no headings.' },
    },
  },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector('a')).toBeNull();
    await expect(canvasElement.querySelector('.cursor-pointer')).toBeNull();
  },
};

export const Dark: Story = {
  tags: ['!test', '!autodocs'],
  globals: { theme: 'dark' },
};
