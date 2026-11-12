import type { Meta, StoryObj } from '@storybook-vue/nuxt';
import { expect, within } from 'storybook/test';
import AboutBriefResume from './AboutBriefResume.vue';

const meta = {
  title: 'About/BriefResume',
  component: AboutBriefResume,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof AboutBriefResume>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const links = await canvas.findAllByRole('link');
    const hrefs = links.map(link => link.getAttribute('href') ?? '');

    await expect(canvasElement.querySelector('img[alt="Ángel Blanco"]')?.getAttribute('src')).toContain('ablanco_2025_profile.webp');
    await expect(hrefs.some(href => href.startsWith('https://github.com/angelblanco'))).toBe(true);
    await expect(hrefs.some(href => href.startsWith('https://www.linkedin.com/in/angelblanco-dev'))).toBe(true);
    await expect(canvasElement.querySelector('.md-bold-styled')).not.toBeNull();
  },
};

export const Mobile: Story = {
  tags: ['!test', '!autodocs'],
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
};
