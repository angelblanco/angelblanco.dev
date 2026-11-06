import type { Meta, StoryObj } from '@storybook-vue/nuxt';
import { expect, within } from 'storybook/test';
import UiPageNotFound from './UiPageNotFound.vue';

const meta = {
  title: 'UI/PageNotFound',
  component: UiPageNotFound,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof UiPageNotFound>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByRole('heading', { level: 1 });
    const link = canvas.getByRole('link');

    await expect(heading).toHaveClass('gradient-text');
    await expect(link).toHaveClass('btn');
    await expect(link.getAttribute('href')?.startsWith('/')).toBe(true);
  },
};

export const Mobile: Story = {
  tags: ['!test', '!autodocs'],
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
};
