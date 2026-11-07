import type { Meta, StoryObj } from '@storybook-vue/nuxt';
import { expect, fireEvent, waitFor, within } from 'storybook/test';
import { h, ref, watch } from 'vue';
import { searchFixture } from '../../../.storybook/fixtures/search';
import BlogSearchDialog from './BlogSearchDialog.vue';

function getDialog(canvasElement: HTMLElement): HTMLDialogElement {
  const dialog = canvasElement.querySelector<HTMLDialogElement>('[data-testid="blog-search-dialog"]');
  if (!dialog)
    throw new Error('BlogSearchDialog dialog not found');
  return dialog;
}

async function expectOpen(canvasElement: HTMLElement) {
  await waitFor(() => expect(getDialog(canvasElement).open).toBe(true));
}

async function expectNoOptions(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  const input = canvas.getByRole('combobox');

  await expect(canvas.queryAllByRole('option')).toHaveLength(0);
  await expect(input).toHaveAttribute('aria-expanded', 'false');
  await expect(input).not.toHaveAttribute('aria-activedescendant');
}

async function search(canvasElement: HTMLElement, value: string) {
  await fireEvent.input(within(canvasElement).getByRole('combobox'), {
    target: { value },
  });
}

const meta = {
  title: 'Blog/SearchDialog',
  component: BlogSearchDialog,
  args: {
    open: true,
    data: searchFixture,
    status: 'success',
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['idle', 'pending', 'success', 'error'],
    },
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: false, height: '640px' },
    },
  },
  render: args => ({
    setup() {
      const open = ref(args.open);

      watch(() => args.open, (value) => {
        open.value = value;
      });

      return () => h(BlogSearchDialog, {
        ...args,
        'open': open.value,
        'onUpdate:open': (value: boolean) => {
          open.value = value;
        },
      });
    },
  }),
} satisfies Meta<typeof BlogSearchDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: { story: 'With an empty query it lists the recent posts. Its play function searches for `composer`: the post that matches comes first, with its matching sections below it.' },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');

    await expectOpen(canvasElement);
    await waitFor(() => expect(canvas.getAllByTestId('blog-search-post')).toHaveLength(5));

    await search(canvasElement, 'composer');

    await waitFor(() => expect(canvas.getAllByTestId('blog-search-post')).toHaveLength(1));
    const options = canvas.getAllByRole('option');

    await expect(options[0]).toHaveTextContent('Install PHP 8.5 with apt on Ubuntu 26.04');
    await expect(canvas.getAllByTestId('blog-search-section').length).toBeGreaterThan(0);
    await expect(options[0]).toHaveAttribute('aria-selected', 'true');
    await expect(input).toHaveAttribute('aria-activedescendant', 'blog-search-option-0');
    await expect(canvasElement.querySelector('mark')).not.toBeNull();

    await fireEvent.keyDown(input, { key: 'ArrowDown' });
    await waitFor(() => expect(options[1]).toHaveAttribute('aria-selected', 'true'));
    await expect(input).toHaveAttribute('aria-activedescendant', 'blog-search-option-1');

    await fireEvent.keyDown(input, { key: 'ArrowUp' });
    await fireEvent.keyDown(input, { key: 'ArrowUp' });
    await waitFor(() => expect(options.at(-1)).toHaveAttribute('aria-selected', 'true'));
    await expect(getDialog(canvasElement).open).toBe(true);
  },
};

export const TagFilter: Story = {
  parameters: {
    docs: {
      description: { story: 'The chips under the input filter the results by any of the selected tags. Backspace in the empty input removes the last one.' },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const php = await canvas.findByRole('button', { name: /^#php,/ });

    await fireEvent.click(php);
    await waitFor(() => expect(php).toHaveAttribute('aria-pressed', 'true'));
    await waitFor(() => expect(canvas.getAllByTestId('blog-search-post')).toHaveLength(1));
    await expect(canvas.getByTestId('blog-search-active-tag')).toHaveTextContent('#php');

    await fireEvent.keyDown(canvas.getByRole('combobox'), { key: 'Backspace' });
    await waitFor(() => expect(php).toHaveAttribute('aria-pressed', 'false'));
    await expect(canvas.queryByTestId('blog-search-active-tag')).toBeNull();
  },
};

export const Topics: Story = {
  parameters: {
    docs: {
      description: { story: 'A query that starts with `#` only lists topics, and also narrows the tag chips. Picking a topic opens its page.' },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expectOpen(canvasElement);
    await search(canvasElement, '#ub');

    await waitFor(() => expect(canvas.getAllByTestId('blog-search-topic')).toHaveLength(1));
    await expect(canvas.getByTestId('blog-search-topic')).toHaveTextContent('#ubuntu');
    await expect(canvas.queryAllByTestId('blog-search-post')).toHaveLength(0);
    await expect(canvas.getAllByTestId('blog-search-tag-filter')).toHaveLength(1);
  },
};

export const NoResults: Story = {
  parameters: {
    docs: {
      description: { story: 'Its play function searches for a term that no post contains. Type one in the canvas to see the empty message.' },
    },
  },
  play: async ({ canvasElement }) => {
    await expectOpen(canvasElement);
    await search(canvasElement, 'kubernetes');

    await waitFor(() => expect(within(canvasElement).getByTestId('blog-search-empty')).toBeVisible());
    await expectNoOptions(canvasElement);
  },
};

export const Loading: Story = {
  args: { status: 'pending', data: undefined },
  play: async ({ canvasElement }) => {
    await expectOpen(canvasElement);
    await expect(canvasElement.querySelector('.loading')).not.toBeNull();
    await expectNoOptions(canvasElement);
  },
};

export const LoadError: Story = {
  name: 'Error',
  args: { status: 'error', data: undefined },
  play: async ({ canvasElement }) => {
    await expectOpen(canvasElement);
    await expect(canvasElement.querySelector('p.text-error')).not.toBeNull();
    await expectNoOptions(canvasElement);
  },
};

export const Mobile: Story = {
  tags: ['!test', '!autodocs'],
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
};
