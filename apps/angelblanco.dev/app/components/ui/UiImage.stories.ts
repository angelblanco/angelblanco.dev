import type { Meta, StoryObj } from '@storybook-vue/nuxt';
import { expect, within } from 'storybook/test';
import UiImage from './UiImage.vue';

const meta = {
  title: 'UI/Image',
  component: UiImage,
  args: {
    src: '/ablanco.webp',
    alt: 'Me',
    width: 256,
    height: 256,
    class: 'size-64',
  },
} satisfies Meta<typeof UiImage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const image = within(canvasElement).getByRole('img');

    await expect(image).toHaveAttribute('width', '256');
    await expect(image).toHaveAttribute('height', '256');
    await expect(image.getAttribute('src')).toContain('ablanco.webp');
    await expect(image.style.backgroundImage).toMatch(/s_16x16\/ablanco\.webp/);
  },
};

export const Landscape: Story = {
  args: { width: 320, height: 160, class: 'w-80 object-cover' },
  play: async ({ canvasElement }) => {
    const image = within(canvasElement).getByRole('img');

    await expect(image.style.backgroundImage).toMatch(/s_16x8\//);
  },
};
