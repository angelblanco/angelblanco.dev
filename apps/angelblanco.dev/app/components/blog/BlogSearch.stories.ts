import type { Meta, StoryObj } from '@storybook-vue/nuxt';
import { expect, waitFor, within } from 'storybook/test';
import BlogSearch from './BlogSearch.vue';

const meta = {
  title: 'Blog/Search',
  component: BlogSearch,
  argTypes: {
    iconSize: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component: 'Search trigger button. It opens with a click or Ctrl/⌘ K and lazily loads the search dialog, which fetches the search index from the server; Storybook runs no server, so opening it here shows the load error state. The dialog with results is shown in Blog/SearchDialog.',
      },
    },
  },
} satisfies Meta<typeof BlogSearch>;

export default meta;

type Story = StoryObj<typeof meta>;

async function findButton(canvasElement: HTMLElement) {
  return within(canvasElement).findByTestId('blog-search-button');
}

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const button = await findButton(canvasElement);

    await expect(button.tagName).toBe('BUTTON');
    await expect(button).toHaveAttribute('type', 'button');
    await expect(button).toHaveAttribute('aria-haspopup', 'dialog');
    await expect(button).toHaveAttribute('aria-keyshortcuts', 'Meta+K Control+K');
    await expect(button).toHaveAttribute('aria-label');
    await waitFor(() => expect(button.getAttribute('title')).toMatch(/\((Ctrl|⌘) K\)$/));
    await expect(button.querySelector('.size-5')).not.toBeNull();
    await expect(canvasElement.querySelector('dialog')).toBeNull();
  },
};

export const NavbarSize: Story = {
  args: { iconSize: 'size-5 lg:size-6' },
  parameters: {
    docs: {
      description: {
        story: 'The icon size used by the navbar: `size-5`, growing to `size-6` from the `lg` breakpoint, so it only differs from Default on wide canvases.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const button = await findButton(canvasElement);
    const icon = button.querySelector('.size-5');

    await expect(icon).not.toBeNull();
    await expect(icon).toHaveClass('size-5', 'lg:size-6');
    await expect(canvasElement.querySelector('dialog')).toBeNull();
  },
};
