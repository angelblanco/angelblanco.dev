import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { h } from 'vue';
import ProsePre from '~/components/content/ProsePre.vue';

function mountPre(props: Record<string, unknown>) {
  return mountSuspended(ProsePre, {
    props,
    slots: {
      default: () => h('code', h('span', { class: 'line' }, 'curl -fsSL https://angelblanco.dev | bash')),
    },
  });
}

describe('components: ProsePre', () => {
  it('renders the language badge in its own row above the code', async () => {
    const wrapper = await mountPre({ language: 'bash', code: 'curl' });
    const pre = wrapper.get('pre');
    const badge = wrapper.findAll('div').find(div => div.text() === 'bash' && !div.find('div').exists());

    expect(badge).toBeDefined();
    expect(pre.element.contains(badge!.element)).toBe(false);
    expect(badge!.element.compareDocumentPosition(pre.element) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(wrapper.find('.absolute').exists()).toBe(false);
    expect(pre.classes()).toContain('pt-0!');
    expect(wrapper.get('button').element.compareDocumentPosition(pre.element) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('keeps the full padding without a badge row', async () => {
    const wrapper = await mountPre({ code: '' });

    expect(wrapper.find('button').exists()).toBe(false);
    expect(wrapper.find('.font-mono').exists()).toBe(false);
    expect(wrapper.get('pre').classes()).not.toContain('pt-0!');
  });

  it('shows the filename header instead of the badge row', async () => {
    const wrapper = await mountPre({ language: 'bash', filename: 'install.sh', code: 'curl' });

    expect(wrapper.text()).toContain('install.sh');
    expect(wrapper.find('.font-mono').exists()).toBe(false);
    expect(wrapper.get('pre').classes()).not.toContain('pt-0!');
  });

  it('makes the scrollable code a focusable, named group that is not a landmark', async () => {
    const wrapper = await mountPre({ language: 'bash', code: 'curl' });
    const pre = wrapper.get('pre');

    expect(pre.attributes('tabindex')).toBe('0');
    expect(pre.attributes('role')).toBe('group');
    expect(pre.attributes('aria-label')).toBe('a11yCodeBlockNamed');
    expect(pre.classes()).toContain('focus-visible:outline-2');
  });

  it('falls back to a generic name without language or filename', async () => {
    const wrapper = await mountPre({ code: 'curl' });

    expect(wrapper.get('pre').attributes('aria-label')).toBe('a11yCodeBlock');
  });
});
