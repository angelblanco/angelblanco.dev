import type { Meta, StoryObj } from '@storybook-vue/nuxt';
import { expect, fireEvent, waitFor, within } from 'storybook/test';
import { h, ref, watch } from 'vue';
import { searchSections } from '~/utils/searchSections';
import { searchSectionsFixture } from '../../../.storybook/fixtures/search';
import BlogSearchDialog from './BlogSearchDialog.vue';

function getDialog(canvasElement: HTMLElement): HTMLDialogElement {
  const dialog = canvasElement.querySelector<HTMLDialogElement>('[data-testid="blog-search-dialog"]');
  if (!dialog)
    throw new Error('BlogSearchDialog dialog not found');
  return dialog;
}

function getLiveRegion(canvasElement: HTMLElement): HTMLElement {
  const region = canvasElement.querySelector<HTMLElement>('[aria-live="polite"]');
  if (!region)
    throw new Error('BlogSearchDialog live region not found');
  return region;
}

async function expectOpen(canvasElement: HTMLElement) {
  await waitFor(() => expect(getDialog(canvasElement).open).toBe(true));
}

async function expectNoResults(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  const input = canvas.getByRole('combobox');

  await expect(canvas.queryAllByRole('option')).toHaveLength(0);
  await expect(canvasElement.querySelector('#blog-search-results')).not.toBeVisible();
  await expect(input).toHaveAttribute('aria-expanded', 'false');
  await expect(input).not.toHaveAttribute('aria-activedescendant');
}

const meta = {
  title: 'Blog/SearchDialog',
  component: BlogSearchDialog,
  args: {
    open: true,
    sections: searchSectionsFixture,
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
      story: { inline: false, height: '480px' },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const term = 'composer';
    const expected = searchSections(searchSectionsFixture, term);

    await expectOpen(canvasElement);
    await expectNoResults(canvasElement);

    const input = canvas.getByRole('combobox');
    await fireEvent.input(input, {
      target: { value: term },
    });

    const options = await canvas.findAllByRole('option');
    await expect(expected.length).toBeGreaterThan(1);
    await expect(options).toHaveLength(expected.length);
    await expect(options[0]).toHaveAttribute('id', 'blog-search-result-0');
    await expect(options[0]).toHaveAttribute('aria-selected', 'true');
    await expect(input).toHaveAttribute('aria-expanded', 'true');
    await expect(input).toHaveAttribute('aria-activedescendant', 'blog-search-result-0');

    await fireEvent.keyDown(input, { key: 'ArrowDown' });
    await waitFor(() => expect(options[1]).toHaveAttribute('aria-selected', 'true'));
    await expect(options[0]).toHaveAttribute('aria-selected', 'false');
    await expect(input).toHaveAttribute('aria-activedescendant', 'blog-search-result-1');

    await fireEvent.keyDown(input, { key: 'ArrowUp' });
    await waitFor(() => expect(options[0]).toHaveAttribute('aria-selected', 'true'));

    const last = expected.length - 1;
    await fireEvent.keyDown(input, { key: 'ArrowUp' });
    await waitFor(() => expect(options[last]).toHaveAttribute('aria-selected', 'true'));
    await expect(input).toHaveAttribute('aria-activedescendant', `blog-search-result-${last}`);
    await expect(getDialog(canvasElement).open).toBe(true);
  },
};

export const NoResults: Story = {
  parameters: {
    docs: {
      description: { story: 'Its play function searches for a term that no post contains. Type one in the canvas to see the empty message.' },
    },
  },
  play: async ({ canvasElement }) => {
    const term = 'kubernetes';

    await expectOpen(canvasElement);
    await expect(searchSections(searchSectionsFixture, term)).toHaveLength(0);
    await fireEvent.input(within(canvasElement).getByRole('combobox'), {
      target: { value: term },
    });

    await waitFor(() => expect(getLiveRegion(canvasElement).querySelector('p')).not.toBeNull());
    await expectNoResults(canvasElement);
  },
};

export const Loading: Story = {
  args: { status: 'pending', sections: [] },
  play: async ({ canvasElement }) => {
    await expectOpen(canvasElement);
    await expect(getLiveRegion(canvasElement).querySelector('p')).not.toBeNull();
    await expectNoResults(canvasElement);
  },
};

export const LoadError: Story = {
  name: 'Error',
  args: { status: 'error' },
  play: async ({ canvasElement }) => {
    await expectOpen(canvasElement);
    await expect(getLiveRegion(canvasElement).querySelector('p.text-error')).not.toBeNull();
    await expectNoResults(canvasElement);
  },
};

export const Mobile: Story = {
  tags: ['!test', '!autodocs'],
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
};
