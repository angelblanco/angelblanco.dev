import type { Meta, StoryObj } from '@storybook-vue/nuxt';
import { expect, within } from 'storybook/test';
import { h } from 'vue';
import { articleBody, articleCodeBlocks, articleHeadingIds, articleScriptFilename } from '../../../.storybook/fixtures/article';
import UiContentWrapper from './UiContentWrapper.vue';

const meta = {
  title: 'UI/ContentWrapper',
  component: UiContentWrapper,
  render: args => ({
    setup: () => () => h(UiContentWrapper, args, { default: articleBody }),
  }),
} satisfies Meta<typeof UiContentWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const roots = canvasElement.querySelectorAll('.prose');

    await expect(roots).toHaveLength(1);
    const root = roots[0]!;
    await expect(root).not.toHaveClass('max-w-none');

    for (const id of articleHeadingIds)
      await expect(root.querySelector(`:is(h3, h4)#${id}`)).not.toBeNull();

    await expect(within(canvas.getByRole('table')).getAllByRole('columnheader')).toHaveLength(4);
    await expect(canvas.getAllByRole('list')).toHaveLength(1);
    await expect(root.querySelectorAll(':not(pre) > code').length).toBeGreaterThan(0);
    await expect(root.querySelector('strong')?.className).toMatch(/^strong-child-[123]$/);

    await expect(root.querySelectorAll('pre.shiki')).toHaveLength(articleCodeBlocks.length);
    await expect(root.querySelectorAll('pre.shiki .line')).toHaveLength(articleCodeBlocks.flat().length);
    await expect(canvas.getByText(articleScriptFilename)).toBeInTheDocument();
  },
};

export const FullWidth: Story = {
  render: args => ({
    setup: () => () => h(UiContentWrapper, { ...args, class: 'max-w-none' }, { default: articleBody }),
  }),
  play: async ({ canvasElement }) => {
    const root = canvasElement.querySelector('.prose');

    await expect(root).toHaveClass('prose', 'max-w-none');
    await expect(root?.querySelector('h3')).not.toBeNull();
  },
};

export const Dark: Story = {
  tags: ['!test', '!autodocs'],
  globals: { theme: 'dark' },
};
