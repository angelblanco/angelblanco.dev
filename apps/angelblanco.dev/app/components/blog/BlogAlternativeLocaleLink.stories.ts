import type { Meta, StoryObj } from '@storybook-vue/nuxt';
import { expect, within } from 'storybook/test';
import { withNavigatorLanguage } from '../../../.storybook/fixtures/navigator';
import BlogAlternativeLocaleLink from './BlogAlternativeLocaleLink.vue';

const meta = {
  title: 'Blog/AlternativeLocaleLink',
  component: BlogAlternativeLocaleLink,
  args: { locale: 'es' },
} satisfies Meta<typeof BlogAlternativeLocaleLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SpanishBrowser: Story = {
  decorators: [
    withNavigatorLanguage('es-ES'),
  ],
  play: async ({ canvasElement }) => {
    const link = await within(canvasElement).findByRole('link');

    await expect(link).toHaveAttribute('hreflang', 'es');
    await expect(link).toHaveClass('bg-secondary/10');
  },
};

export const EnglishBrowser: Story = {
  decorators: [
    withNavigatorLanguage('en-US'),
  ],
  parameters: {
    docs: {
      description: { story: 'Renders nothing: the browser language is already the page language.' },
    },
  },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).queryByRole('link')).toBeNull();
  },
};
