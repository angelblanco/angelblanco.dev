import type { Meta, StoryObj } from '@storybook-vue/nuxt';
import { expect, within } from 'storybook/test';
import HomeHeroCard from './HomeHeroCard.vue';

const meta = {
  title: 'Home/HeroCard',
  component: HomeHeroCard,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof HomeHeroCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const links = canvas.getAllByRole('link');

    await expect(canvas.getByRole('heading', { level: 1 })).toBeInTheDocument();
    await expect(links).toHaveLength(2);
    for (const link of links)
      await expect(link).toHaveAttribute('href', expect.stringContaining('/about'));

    await expect(links[1]).toHaveAttribute('aria-label');
    await expect(canvas.getByRole('img')).toHaveAttribute('src', expect.stringContaining('ablanco'));
  },
};

export const Spanish: Story = {
  tags: ['!test', '!autodocs'],
  globals: { locale: 'es' },
};

export const Mobile: Story = {
  tags: ['!test', '!autodocs'],
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
};
