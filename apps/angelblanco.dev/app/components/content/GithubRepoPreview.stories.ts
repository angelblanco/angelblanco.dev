import type { Meta, StoryObj } from '@storybook-vue/nuxt';
import { expect, within } from 'storybook/test';
import { h } from 'vue';
import GithubRepoPreview from './GithubRepoPreview.vue';

const repo = 'angelblanco/eslint-config';
const description = 'Ángel Blanco\'s ESLint configuration, built on @antfu/eslint-config for Vue + TypeScript projects.';

const meta = {
  title: 'Content/GithubRepoPreview',
  component: GithubRepoPreview,
  args: { repo, description },
} satisfies Meta<typeof GithubRepoPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link');

    await expect(link).toHaveAttribute('href', `https://github.com/${repo}`);
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link.getAttribute('rel')).toContain('noopener');
    await expect(canvas.getByText('eslint-config')).toBeInTheDocument();
    await expect(canvas.getByText(description)).toBeInTheDocument();
    await expect(canvas.getByText(`github.com/${repo}`)).toBeInTheDocument();
  },
};

export const WithoutDescription: Story = {
  args: { description: undefined },
  play: async ({ canvasElement }) => {
    const link = within(canvasElement).getByRole('link');

    await expect(link).toHaveAttribute('href', `https://github.com/${repo}`);
    await expect(link.querySelector('.text-sm')).toBeNull();
  },
};

export const LongContent: Story = {
  args: {
    repo: 'angelblanco/angelblanco.dev',
    description: 'This is my personal webpage and portfolio that you can use as a boilerplate for a fully functional Nuxt turborepo deployed to Github Pages with Github Actions and fully open sourced.',
  },
  decorators: [
    story => ({
      setup: () => () => h('div', { class: 'max-w-xs' }, h(story())),
    }),
  ],
  play: async ({ canvasElement }) => {
    const link = within(canvasElement).getByRole('link');

    await expect(link).toHaveAttribute('href', 'https://github.com/angelblanco/angelblanco.dev');
    await expect(link.closest('.max-w-xs')).not.toBeNull();
    await expect(link.querySelector('.min-w-0')).not.toBeNull();
  },
};

export const InsideProse: Story = {
  decorators: [
    story => ({
      setup: () => () => h('div', { class: 'prose' }, h(story())),
    }),
  ],
  play: async ({ canvasElement }) => {
    const link = within(canvasElement).getByRole('link');

    await expect(link.closest('.prose')).not.toBeNull();
    await expect(link).toHaveClass('no-underline');
  },
};
