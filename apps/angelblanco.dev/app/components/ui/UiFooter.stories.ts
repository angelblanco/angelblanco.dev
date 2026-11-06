import type { Meta, StoryObj } from '@storybook-vue/nuxt';
import { expect, within } from 'storybook/test';
import UiFooter from './UiFooter.vue';

const meta = {
  title: 'UI/Footer',
  component: UiFooter,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof UiFooter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const footer = canvas.getByRole('contentinfo');
    const links = Array.from(footer.querySelectorAll('a.btn-square'));

    await expect(links).toHaveLength(4);
    for (const link of links)
      await expect(link).toHaveAttribute('aria-label');

    await expect(canvas.getByTestId('rss-feed')).toBeInTheDocument();
    await expect(canvas.getByTestId('content-license').getAttribute('rel')).toContain('license');
  },
};

export const Dark: Story = {
  tags: ['!test', '!autodocs'],
  globals: { theme: 'dark' },
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
