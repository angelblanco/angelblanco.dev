import type { Meta, StoryObj } from '@storybook-vue/nuxt';
import { expect } from 'storybook/test';
import { h } from 'vue';
import AboutBriefBackground from './AboutBriefBackground.vue';

const aboutBriefSquares: [number, number][] = [
  [4, 4],
  [5, 1],
  [8, 2],
  [5, 3],
  [5, 5],
  [10, 10],
  [12, 15],
  [15, 10],
  [10, 15],
];

const meta = {
  title: 'About/BriefBackground',
  component: AboutBriefBackground,
  decorators: [
    story => ({
      setup: () => () => h('div', { class: 'relative h-96 w-full overflow-hidden' }, h(story())),
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: 'The pattern id is hardcoded to `grid-pattern`, so every instance on a page fills with the first pattern rendered. Stories that change the pattern itself are hidden from this docs page; open them on their own.',
      },
    },
  },
} satisfies Meta<typeof AboutBriefBackground>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const svg = canvasElement.querySelector('svg')!;
    const pattern = svg.querySelector('pattern#grid-pattern')!;

    await expect(svg).toHaveAttribute('aria-hidden', 'true');
    await expect(svg).toHaveClass('pointer-events-none', 'absolute', 'inset-0');
    await expect(pattern).toHaveAttribute('width', '40');
    await expect(pattern).toHaveAttribute('height', '40');
    await expect(pattern).toHaveAttribute('x', '-1');
    await expect(pattern.querySelector('path')).toHaveAttribute('d', 'M.5 40V.5H40');
    await expect(pattern.querySelector('path')).toHaveAttribute('stroke-dasharray', '0');
    await expect(svg.querySelector(':scope > rect')).toHaveAttribute('fill', 'url(#grid-pattern)');
    await expect(svg.querySelector(':scope > svg')).toBeNull();
  },
};

export const WithSquares: Story = {
  args: {
    squares: aboutBriefSquares,
    className: 'z-0 skew-y-12 [mask-image:radial-gradient(400px_circle_at_center,white,transparent)]',
  },
  play: async ({ canvasElement }) => {
    const svg = canvasElement.querySelector('svg')!;
    const squares = svg.querySelectorAll(':scope > svg > rect');

    await expect(svg).toHaveClass('skew-y-12', 'pointer-events-none');
    await expect(squares).toHaveLength(aboutBriefSquares.length);
    await expect(squares[0]).toHaveAttribute('x', '161');
    await expect(squares[0]).toHaveAttribute('width', '39');
  },
};

export const LargeDashedCells: Story = {
  tags: ['!autodocs'],
  args: {
    width: 80,
    height: 80,
    strokeDasharray: '4 2',
    squares: aboutBriefSquares,
  },
  play: async ({ canvasElement }) => {
    const pattern = canvasElement.querySelector('pattern#grid-pattern')!;

    await expect(pattern).toHaveAttribute('width', '80');
    await expect(pattern.querySelector('path')).toHaveAttribute('d', 'M.5 80V.5H80');
    await expect(pattern.querySelector('path')).toHaveAttribute('stroke-dasharray', '4 2');
    await expect(canvasElement.querySelector('svg > svg > rect')).toHaveAttribute('width', '79');
  },
};
