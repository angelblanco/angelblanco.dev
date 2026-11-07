import type { Meta, StoryObj } from '@storybook-vue/nuxt';
import { expect, waitFor, within } from 'storybook/test';
import HomeHero from './HomeHero.vue';

const meta = {
  title: 'Home/Hero',
  component: HomeHero,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof HomeHero>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const vortex = canvas.getByTestId('hero-vortex');

    await waitFor(() => expect(vortex).toHaveAttribute('data-state', expect.stringMatching(/^(?:static|running|paused)$/)));
    await expect(vortex.querySelector('canvas')).toHaveAttribute('aria-hidden', 'true');
    await expect(canvas.getByRole('heading', { level: 1 })).toBeInTheDocument();
    await expect(canvas.getAllByRole('link')).toHaveLength(2);
  },
};

export const Dark: Story = {
  tags: ['!test', '!autodocs'],
  globals: { theme: 'dark' },
};

export const Mobile: Story = {
  tags: ['!test', '!autodocs'],
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
};
