import type { Meta, StoryObj } from '@storybook-vue/nuxt';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import UiThemeSwitcher from './UiThemeSwitcher.vue';

const meta = {
  title: 'UI/ThemeSwitcher',
  component: UiThemeSwitcher,
  argTypes: {
    iconSize: { control: 'text' },
  },
} satisfies Meta<typeof UiThemeSwitcher>;

export default meta;

type Story = StoryObj<typeof meta>;

function icons(button: HTMLElement) {
  return Array.from(button.querySelectorAll('.swap-on, .swap-off'));
}

async function expectSwap(button: HTMLElement, pressed: string) {
  const [sun, moon] = icons(button);

  await expect(button).toHaveAttribute('aria-pressed', pressed);
  await expect(sun).toHaveClass(pressed === 'false'
    ? 'swap-on'
    : 'swap-off');
  await expect(moon).toHaveClass(pressed === 'false'
    ? 'swap-off'
    : 'swap-on');
}

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button');
    const pressed = button.getAttribute('aria-pressed') ?? '';
    const toggled = pressed === 'true'
      ? 'false'
      : 'true';

    await expect(button).toHaveAttribute('id', 'theme-switcher');
    await expect(button).toHaveAttribute('type', 'button');
    await expect(button).toHaveAttribute('aria-label');
    await expect(icons(button)).toHaveLength(2);
    for (const icon of icons(button))
      await expect(icon).toHaveClass('size-8');

    await expectSwap(button, pressed);
    await userEvent.click(button);
    await waitFor(() => expectSwap(button, toggled));
    await userEvent.click(button);
    await waitFor(() => expectSwap(button, pressed));
  },
};

export const NavbarSize: Story = {
  args: { iconSize: 'size-5 lg:size-6' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button');

    await expect(icons(button)).toHaveLength(2);
    for (const icon of icons(button)) {
      await expect(icon).toHaveClass('size-5', 'lg:size-6');
      await expect(icon).not.toHaveClass('size-8');
    }
  },
};

export const Dark: Story = {
  tags: ['!test', '!autodocs'],
  globals: { theme: 'dark' },
};
