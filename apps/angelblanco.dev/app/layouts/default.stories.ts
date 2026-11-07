import type { Meta, StoryObj } from '@storybook-vue/nuxt';
import { expect, within } from 'storybook/test';
import { h } from 'vue';
import UiPageNotFound from '../components/ui/UiPageNotFound.vue';
import DefaultLayout from './default.vue';

const meta = {
  title: 'Layouts/Default',
  component: DefaultLayout,
  parameters: { layout: 'fullscreen' },
  render: () => ({
    setup: () => () => h(DefaultLayout, null, {
      default: () => h(UiPageNotFound),
    }),
  }),
} satisfies Meta<typeof DefaultLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const header = canvas.getByRole('banner');
    const main = canvas.getByRole('main');
    const footer = canvas.getByRole('contentinfo');

    await expect(header.querySelector('nav#ui-nav-bar')).not.toBeNull();
    await expect(header.compareDocumentPosition(main) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    await expect(main.compareDocumentPosition(footer) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    await expect(main.querySelector('h1')).not.toBeNull();
    await expect(within(main).getByRole('link').getAttribute('href')?.startsWith('/')).toBe(true);
  },
};

export const Mobile: Story = {
  tags: ['!test', '!autodocs'],
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
};
