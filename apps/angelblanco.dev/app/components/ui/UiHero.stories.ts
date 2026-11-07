import type { Meta, StoryObj } from '@storybook-vue/nuxt';
import { expect, within } from 'storybook/test';
import { h } from 'vue';
import UiHero from './UiHero.vue';

function callToAction() {
  return [
    h('a', { href: '/blog', class: 'btn btn-primary' }, 'Blog'),
    h('a', { href: '/about', class: 'btn btn-neutral' }, 'About Me'),
  ];
}

const meta = {
  title: 'UI/Hero',
  component: UiHero,
  parameters: { layout: 'fullscreen' },
  args: {
    title: 'Hello.',
    description: 'Personal full-stack engineering blog',
  },
  render: args => ({
    setup: () => () => h(UiHero, args, { callToAction }),
  }),
} satisfies Meta<typeof UiHero>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const links = canvas.getAllByRole('link');

    await expect(canvas.getByRole('heading', { level: 1 })).toHaveClass('text-5xl');
    await expect(links).toHaveLength(2);
    await expect(links[0]).toHaveClass('btn-primary');
    await expect(links[0]!.getAttribute('href')).toContain('/blog');
    await expect(links[1]).toHaveClass('btn-neutral');
    await expect(links[1]!.getAttribute('href')).toContain('/about');
  },
};

export const WithoutCallToAction: Story = {
  render: args => ({
    setup: () => () => h(UiHero, args),
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole('heading', { level: 1 })).toBeInTheDocument();
    await expect(canvas.queryAllByRole('link')).toHaveLength(0);
  },
};

export const LongContent: Story = {
  args: {
    title: 'VP of Engineering - Full Stack Architect',
    description: 'Here you can find a selection of projects I\'ve worked on throughout my career.',
  },
  play: async ({ canvasElement }) => {
    const heading = within(canvasElement).getByRole('heading', { level: 1 });

    await expect(heading.closest('.max-w-md')).not.toBeNull();
  },
};

export const Mobile: Story = {
  tags: ['!test', '!autodocs'],
  args: LongContent.args,
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
};
