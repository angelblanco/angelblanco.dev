import type { Meta, StoryObj } from '@storybook-vue/nuxt';
import type { Line } from '../../../.storybook/fixtures/shiki';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { h } from 'vue';
import { shikiClass, toCode, toVNode } from '../../../.storybook/fixtures/shiki';
import ProsePre from './ProsePre.vue';

const aptLines: Line[] = [
  [
    ['blue', 'sudo'],
    ['text', ' '],
    ['green', 'apt'],
    ['text', ' '],
    ['green', 'update'],
  ],
  [
    ['blue', 'sudo'],
    ['text', ' '],
    ['green', 'apt'],
    ['text', ' '],
    ['green', 'install'],
    ['text', ' '],
    ['green', '-y'],
    ['text', ' '],
    ['green', 'ca-certificates'],
    ['text', ' '],
    ['green', 'curl'],
    ['text', ' '],
    ['green', 'gnupg'],
  ],
];

const scriptLines: Line[] = [
  [
    ['overlay2', '# This script installs Node.js and several package managers.'],
  ],
  [
    ['overlay2', '# Run it as your non-root user: it asks for elevated permissions'],
  ],
  [
    ['overlay2', '# with sudo when needed.'],
  ],
  [
    ['overlay2', '#'],
  ],
  [],
  [
    ['red', 'set'],
    ['text', ' '],
    ['green', '-e'],
  ],
  [],
  [
    ['overlay2', '# Basic confirmation module before executing the script.'],
  ],
  [
    ['blue', 'confirm_action'],
    ['overlay2', '()'],
    ['text', ' '],
    ['overlay2', '{'],
  ],
  [
    ['text', '    '],
    ['red', 'read'],
    ['text', ' '],
    ['green', '-p'],
    ['text', ' '],
    ['green', '"'],
    ['maroon', '$1'],
    ['green', ' (y/n): "'],
    ['text', ' '],
    ['green', 'choice'],
    ['text', ' '],
    ['teal', '<'],
    ['text', ' '],
    ['green', '/dev/tty'],
  ],
];

const nuxtConfigLines: Line[] = [
  [
    ['mauve', 'export'],
    ['text', ' '],
    ['mauve', 'default'],
    ['text', ' '],
    ['blue', 'defineNuxtConfig'],
    ['text', '('],
    ['overlay2', '{'],
  ],
  [
    ['text', '  content'],
    ['teal', ':'],
    ['text', ' '],
    ['overlay2', '{'],
  ],
  [
    ['text', '    build'],
    ['teal', ':'],
    ['text', ' '],
    ['overlay2', '{'],
  ],
  [
    ['text', '      markdown'],
    ['teal', ':'],
    ['text', ' '],
    ['overlay2', '{'],
  ],
  [
    ['text', '        highlight'],
    ['teal', ':'],
    ['text', ' '],
    ['overlay2', '{'],
  ],
  [
    ['text', '          theme'],
    ['teal', ':'],
    ['text', ' '],
    ['overlay2', '{'],
  ],
  [
    ['text', '            default'],
    ['teal', ':'],
    ['text', ' '],
    ['green', '\'catppuccin-latte\''],
    ['overlay2', ','],
  ],
  [
    ['text', '            dark'],
    ['teal', ':'],
    ['text', ' '],
    ['green', '\'catppuccin-mocha\''],
    ['overlay2', ','],
  ],
  [
    ['text', '          '],
    ['overlay2', '},'],
  ],
  [
    ['text', '        '],
    ['overlay2', '},'],
  ],
  [
    ['text', '      '],
    ['overlay2', '},'],
  ],
  [
    ['text', '    '],
    ['overlay2', '},'],
  ],
  [
    ['text', '  '],
    ['overlay2', '},'],
  ],
  [
    ['overlay2', '}'],
    ['text', ')'],
    ['overlay2', ';'],
  ],
];

const curlLines: Line[] = [
  [
    ['blue', 'curl'],
    ['text', ' '],
    ['green', '-fsSL'],
    ['text', ' '],
    ['green', 'https://angelblanco.dev/scripts/ubuntu-install-node-26.sh'],
    ['text', ' '],
    ['teal', '|'],
    ['text', ' '],
    ['blue', 'bash'],
  ],
];

function snippet(lines: Line[], args: Story['args']): Story {
  return {
    args: {
      ...args,
      code: toCode(lines),
    },
    render: storyArgs => ({
      setup: () => () => h(ProsePre, storyArgs, {
        default: () => toVNode(lines),
      }),
    }),
  };
}

function stubClipboard(write: () => Promise<void>, execCommand: () => boolean) {
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { write },
  });
  Object.defineProperty(document, 'execCommand', { configurable: true, value: execCommand });

  return () => {
    Reflect.deleteProperty(navigator, 'clipboard');
    Reflect.deleteProperty(document, 'execCommand');
  };
}

const meta = {
  title: 'Content/ProsePre',
  component: ProsePre,
  args: { class: shikiClass },
  decorators: [
    story => ({
      setup: () => () => h('div', { class: 'prose max-w-none' }, h(story())),
    }),
  ],
} satisfies Meta<typeof ProsePre>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  ...snippet(aptLines, { language: 'bash' }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvasElement.querySelector('pre')).toHaveClass('shiki');
    await expect(canvasElement.querySelectorAll('pre code .line')).toHaveLength(aptLines.length);
    await expect(canvasElement.querySelector('.bg-base-200')).toBeNull();
    await expect(canvasElement.querySelector('.absolute')?.textContent).toContain('bash');
    await expect(canvas.getByRole('button', { hidden: true })).toBeInTheDocument();
  },
};

export const WithFilename: Story = {
  ...snippet(scriptLines, { language: 'bash', filename: 'ubuntu-install-node-26.sh' }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('ubuntu-install-node-26.sh')).toBeInTheDocument();
    await expect(canvasElement.querySelector('.bg-base-200')).not.toBeNull();
    await expect(canvasElement.querySelector('.absolute')).toBeNull();
    await expect(canvas.getAllByRole('button', { hidden: true })).toHaveLength(1);
    await expect(canvasElement.querySelectorAll('.bg-base-200 .size-5')).toHaveLength(1);
  },
};

export const TypeScript: Story = {
  ...snippet(nuxtConfigLines, { language: 'ts', filename: 'nuxt.config.ts' }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('nuxt.config.ts')).toBeInTheDocument();
    await expect(canvasElement.querySelectorAll('.bg-base-200 .size-5')).toHaveLength(2);
    await expect(canvasElement.querySelectorAll('pre code .line')).toHaveLength(nuxtConfigLines.length);
  },
};

export const LongLine: Story = {
  ...snippet(curlLines, { language: 'bash' }),
  decorators: [
    story => ({
      setup: () => () => h('div', { class: 'max-w-sm' }, h(story())),
    }),
  ],
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelectorAll('pre code .line')).toHaveLength(1);
    await expect(within(canvasElement).getByRole('button', { hidden: true })).toBeInTheDocument();
  },
};

export const EmptyCode: Story = {
  args: { language: 'bash', code: '' },
  render: args => ({
    setup: () => () => h(ProsePre, args, {
      default: () => h('code'),
    }),
  }),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).queryByRole('button', { hidden: true })).toBeNull();
  },
};

export const CopySuccess: Story = {
  ...snippet(aptLines, { language: 'bash' }),
  tags: ['!autodocs'],
  play: async ({ canvasElement }) => {
    const restore = stubClipboard(fn().mockResolvedValue(undefined), fn().mockReturnValue(true));

    try {
      const button = within(canvasElement).getByRole('button', { hidden: true });

      await userEvent.click(button);
      await waitFor(() => expect(button).toHaveClass('btn-success'));
    }
    finally {
      restore();
    }
  },
};

export const CopyError: Story = {
  ...snippet(aptLines, { language: 'bash' }),
  tags: ['!autodocs'],
  play: async ({ canvasElement }) => {
    const restore = stubClipboard(
      fn().mockRejectedValue(new Error('NotAllowedError')),
      fn().mockImplementation(() => {
        throw new Error('NotAllowedError');
      }),
    );

    try {
      const button = within(canvasElement).getByRole('button', { hidden: true });

      await userEvent.click(button);
      await waitFor(() => expect(button).toHaveClass('btn-error'));
    }
    finally {
      restore();
    }
  },
};

export const Dark: Story = {
  ...snippet(nuxtConfigLines, { language: 'ts', filename: 'nuxt.config.ts' }),
  tags: ['!test', '!autodocs'],
  globals: { theme: 'dark' },
};
