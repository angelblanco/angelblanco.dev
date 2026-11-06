import type { Meta, StoryObj } from '@storybook-vue/nuxt';
import { expect, userEvent, within } from 'storybook/test';
import { h } from 'vue';
import UiLocaleSwitcher from './UiLocaleSwitcher.vue';

const meta = {
  title: 'UI/LocaleSwitcher',
  component: UiLocaleSwitcher,
  argTypes: {
    iconSize: { control: 'text' },
  },
  decorators: [
    story => ({
      setup: () => () => h('div', { class: 'flex h-48 justify-center pt-4' }, h(story())),
    }),
  ],
} satisfies Meta<typeof UiLocaleSwitcher>;

export default meta;

type Story = StoryObj<typeof meta>;

function menu(canvasElement: HTMLElement) {
  return canvasElement.querySelector('#locale-switcher-menu');
}

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button');

    await expect(button).toHaveAttribute('id', 'locale-switcher');
    await expect(button).toHaveAttribute('type', 'button');
    await expect(button).toHaveAttribute('aria-label');
    await expect(button).toHaveAttribute('aria-expanded', 'false');
    await expect(button).toHaveAttribute('aria-controls', 'locale-switcher-menu');
    await expect(button.querySelector('.size-8')).not.toBeNull();
    await expect(menu(canvasElement)).toBeNull();

    await userEvent.click(button);
    await expect(menu(canvasElement)).not.toBeNull();
    await userEvent.keyboard('{Escape}');
    await expect(button).toHaveAttribute('aria-expanded', 'false');
    await expect(menu(canvasElement)).toBeNull();
    await expect(button).toHaveFocus();

    await userEvent.click(button);
    await expect(menu(canvasElement)).not.toBeNull();
    await userEvent.click(document.body);
    await expect(button).toHaveAttribute('aria-expanded', 'false');
    await expect(menu(canvasElement)).toBeNull();
  },
};

export const Open: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button');

    await userEvent.click(button);

    await expect(button).toHaveAttribute('aria-expanded', 'true');
    await expect(button).toHaveClass('text-primary-content', 'dark:text-primary');
    await expect(menu(canvasElement)).not.toBeNull();

    for (const locale of ['en', 'es']) {
      const link = canvasElement.querySelector(`[data-lang="${locale}"]`);

      await expect(link).toHaveAttribute('hreflang', locale);
      await expect(link).toHaveAttribute('lang', locale);
      await expect(link).toHaveAttribute('aria-label');
    }
  },
};

export const NavbarSize: Story = {
  args: { iconSize: 'size-5 lg:size-6' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button');
    const icon = button.querySelector('.size-5');

    await expect(icon).toHaveClass('size-5', 'lg:size-6');
    await expect(icon).not.toHaveClass('size-8');
  },
};

export const Dark: Story = {
  tags: ['!test', '!autodocs'],
  globals: { theme: 'dark' },
};
