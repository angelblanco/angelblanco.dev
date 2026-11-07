import type { Meta, StoryObj } from '@storybook-vue/nuxt';
import { expect, within } from 'storybook/test';
import { h } from 'vue';
import { useI18n } from '#imports';
import { aboutBriefBackgroundClass, aboutBriefSquares } from './AboutBrief.vue';
import AboutBriefBackground from './AboutBriefBackground.vue';
import AboutBriefResume from './AboutBriefResume.server.vue';

const meta = {
  title: 'About/Brief',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Mirrors the markup of `AboutBrief.vue`, which renders `AboutBriefResume` as a server island, with the same squares and background class.',
      },
    },
  },
  render: () => ({
    setup: () => {
      const { locale } = useI18n();

      return () => h('div', { class: 'relative w-full overflow-hidden' }, [
        h(AboutBriefBackground, { squares: aboutBriefSquares, className: aboutBriefBackgroundClass }),
        h('div', { class: 'relative z-1' }, [
          h(AboutBriefResume, { locale: locale.value }),
        ]),
      ]);
    },
  }),
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const links = await canvas.findAllByRole('link');
    const container = canvasElement.querySelector('.overflow-hidden')!;
    const background = container.querySelector(':scope > svg')!;
    const content = container.querySelector(':scope > .z-1')!;

    await expect(background).toHaveAttribute('aria-hidden', 'true');
    await expect(background).toHaveClass('z-0', 'skew-y-12');
    await expect(background.compareDocumentPosition(content) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    await expect(content).toHaveClass('relative');
    await expect(content.querySelector('.md-bold-styled')).not.toBeNull();
    await expect(links.every(link => content.contains(link))).toBe(true);
    await expect(links.some(link => link.getAttribute('href')?.startsWith('https://github.com/angelblanco'))).toBe(true);
  },
};
