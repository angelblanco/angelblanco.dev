import type { Meta, StoryObj } from '@storybook-vue/nuxt';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { THEME_TRANSITION_CLASS } from '../../composables/useThemeTransition';
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

async function toggleAndSettle(button: HTMLElement, pressed: string) {
  await userEvent.click(button);
  await waitFor(async () => {
    await expectSwap(button, pressed);
    await expect(document.documentElement).not.toHaveClass(THEME_TRANSITION_CLASS);
  });
}

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The circular reveal from the button plays only in browsers with View Transitions and without `prefers-reduced-motion`; elsewhere the theme switches at once. On this page the toggle changes the theme of the whole docs page.',
      },
    },
  },
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
    await toggleAndSettle(button, toggled);
    await toggleAndSettle(button, pressed);
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
