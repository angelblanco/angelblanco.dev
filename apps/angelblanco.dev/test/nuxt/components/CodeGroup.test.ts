import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { h } from 'vue';
import { CodeGroup, ProsePre } from '#components';

function block(filename: string) {
  return h(ProsePre, { filename, language: 'bash', code: `${filename} install` }, () => `${filename} install`);
}

async function mountGroup() {
  return mountSuspended(CodeGroup, {
    attachTo: document.body,
    slots: {
      default: () => [
        block('pnpm'),
        block('npm'),
        block('bun'),
      ],
    },
  });
}

describe('components: CodeGroup', () => {
  it('should render an accessible tablist with one tab per code block', async () => {
    const wrapper = await mountGroup();
    const tabs = wrapper.findAll('[role="tab"]');

    expect(wrapper.get('[role="tablist"]').attributes('aria-label')).toBe('codeGroupLabel');
    expect(tabs.map(tab => tab.text())).toEqual(['pnpm', 'npm', 'bun']);
    expect(tabs.map(tab => tab.attributes('aria-selected'))).toEqual(['true', 'false', 'false']);
    expect(tabs.map(tab => tab.attributes('tabindex'))).toEqual(['0', '-1', '-1']);

    const panelId = tabs[0]!.attributes('aria-controls');
    const panel = wrapper.get(`#${panelId}`);
    expect(panel.attributes('role')).toBe('tabpanel');
    expect(panel.attributes('aria-labelledby')).toBe(tabs[0]!.attributes('id'));
    wrapper.unmount();
  });

  it('should show only the selected panel and hide the grouped filenames', async () => {
    const wrapper = await mountGroup();
    const panels = wrapper.findAll('[role="tabpanel"]');

    expect(panels.map(panel => panel.isVisible())).toEqual([true, false, false]);
    expect(panels[0]!.find('.truncate').exists()).toBe(false);

    await wrapper.findAll('[role="tab"]')[1]!.trigger('click');

    expect(wrapper.findAll('[role="tabpanel"]').map(panel => panel.isVisible())).toEqual([false, true, false]);
    wrapper.unmount();
  });

  it('should move between tabs with the keyboard', async () => {
    const wrapper = await mountGroup();
    const tablist = wrapper.get('[role="tablist"]');
    const selectedLabel = () => wrapper.get('[role="tab"][aria-selected="true"]').text();

    await tablist.trigger('keydown', { key: 'ArrowRight' });
    expect(selectedLabel()).toBe('npm');
    expect(document.activeElement?.textContent?.trim()).toBe('npm');

    await tablist.trigger('keydown', { key: 'ArrowLeft' });
    await tablist.trigger('keydown', { key: 'ArrowLeft' });
    expect(selectedLabel()).toBe('bun');

    await tablist.trigger('keydown', { key: 'Home' });
    expect(selectedLabel()).toBe('pnpm');

    await tablist.trigger('keydown', { key: 'End' });
    expect(selectedLabel()).toBe('bun');
    wrapper.unmount();
  });
});
