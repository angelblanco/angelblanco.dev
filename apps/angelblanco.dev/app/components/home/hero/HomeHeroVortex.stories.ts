import type { Meta, StoryObj } from '@storybook-vue/nuxt';
import { expect, waitFor, within } from 'storybook/test';
import { h } from 'vue';
import HomeHeroVortex from './HomeHeroVortex.vue';

const meta = {
  title: 'Home/HeroVortex',
  component: HomeHeroVortex,
  args: {
    rangeSpeed: 0.3,
    rangeY: 600,
    particleCount: 1500,
  },
  argTypes: {
    particleCount: {
      control: {
        type: 'range',
        min: 100,
        max: 3000,
        step: 100,
      },
    },
    rangeY: {
      control: {
        type: 'range',
        min: 0,
        max: 1000,
        step: 10,
      },
    },
    baseHue: {
      control: {
        type: 'range',
        min: 0,
        max: 360,
        step: 1,
      },
    },
    rangeSpeed: {
      control: {
        type: 'range',
        min: 0,
        max: 5,
        step: 0.1,
      },
    },
    baseRadius: {
      control: {
        type: 'range',
        min: 0,
        max: 5,
        step: 0.1,
      },
    },
    rangeRadius: {
      control: {
        type: 'range',
        min: 0,
        max: 5,
        step: 0.1,
      },
    },
  },
  decorators: [
    story => ({
      setup: () => () => h('div', { class: 'relative h-125 w-full' }, h(story())),
    }),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Animated particle background of the home hero. It pauses when offscreen or in a hidden tab, and with `prefers-reduced-motion: reduce` it draws one static frame (`data-state="static"`). Emulate reduced motion in your browser devtools to check it.',
      },
    },
  },
} satisfies Meta<typeof HomeHeroVortex>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const vortex = within(canvasElement).getByTestId('hero-vortex');

    await waitFor(() => expect(vortex).toHaveAttribute('data-state', expect.stringMatching(/^(?:static|running|paused)$/)));
    await expect(vortex.querySelector('canvas')).toHaveAttribute('aria-hidden', 'true');
  },
};

export const WithSlotContent: Story = {
  args: { class: 'flex size-full items-center justify-center' },
  render: args => ({
    setup: () => () => h(HomeHeroVortex, args, {
      default: () => h('h1', { class: 'text-4xl font-bold' }, 'Ángel Blanco'),
    }),
  }),
  play: async ({ canvasElement }) => {
    const heading = within(canvasElement).getByRole('heading', { level: 1 });

    await expect(heading.parentElement).toHaveClass('relative', 'z-10', 'flex');
    await expect(heading.closest('[data-testid="hero-vortex"]')).toBeNull();
  },
};

export const Dark: Story = {
  tags: ['!test', '!autodocs'],
  globals: { theme: 'dark' },
};
