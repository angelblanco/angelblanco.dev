import { mountSuspended } from '@nuxt/test-utils/runtime';
import { flushPromises } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ProsePre } from '#components';

function mockClipboard(writeText: (text: string) => Promise<void>) {
  const spy = vi.fn(writeText);
  vi.stubGlobal('navigator', {
    ...navigator,
    clipboard: { writeText: spy },
  });
  return spy;
}

async function mountPre(props: Record<string, unknown>) {
  return mountSuspended(ProsePre, {
    props: { code: 'pnpm install\n', language: 'bash', ...props },
    slots: {
      default: () => 'pnpm install',
    },
  });
}

describe('components: ProsePre', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should always render an accessible copy button, with or without a filename', async () => {
    for (const filename of ['install.sh', null]) {
      const wrapper = await mountPre({ filename });
      const button = wrapper.get('[data-testid="code-copy"]');

      expect(button.attributes('type')).toBe('button');
      expect(button.attributes('aria-label')).toBe('codeCopy');
      expect(button.classes().some(name => name === 'hidden' || name.includes('group-hover:flex'))).toBe(false);
    }
  });

  it('should show the filename from the fence meta in the header', async () => {
    const wrapper = await mountPre({ filename: 'install.sh' });

    expect(wrapper.text()).toContain('install.sh');
    expect(wrapper.find('.i-vscode-icons\\:file-type-shell').exists()).toBe(true);
  });

  it('should show the language when there is no filename', async () => {
    const wrapper = await mountPre({ filename: null });

    expect(wrapper.get('[aria-hidden="true"]').text()).toBe('bash');
  });

  it('should not render the copy button for empty code', async () => {
    const wrapper = await mountPre({ code: '  ' });

    expect(wrapper.find('[data-testid="code-copy"]').exists()).toBe(false);
  });

  it('should copy the code without shiki notations and announce it', async () => {
    const writeText = mockClipboard(async () => {});
    const wrapper = await mountPre({ code: 'old(); // [!code --]\nnew(); // [!code ++]' });

    await wrapper.get('[data-testid="code-copy"]').trigger('click');
    await flushPromises();

    expect(writeText).toHaveBeenCalledWith('new();');
    expect(wrapper.get('[role="status"]').text()).toBe('codeCopied');
    expect(wrapper.get('[data-testid="code-copy"]').attributes('data-state')).toBe('success');
  });

  it('should announce a failed copy', async () => {
    mockClipboard(async () => {
      throw new Error('denied');
    });
    const wrapper = await mountPre({});

    await wrapper.get('[data-testid="code-copy"]').trigger('click');
    await flushPromises();

    expect(wrapper.get('[role="status"]').text()).toBe('codeCopyFailed');
    expect(wrapper.get('[data-testid="code-copy"]').classes()).toContain('btn-error');
  });
});
