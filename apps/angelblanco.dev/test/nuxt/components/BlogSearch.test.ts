import { mountSuspended, registerEndpoint } from '@nuxt/test-utils/runtime';
import { flushPromises } from '@vue/test-utils';
import { afterEach, describe, expect, it } from 'vitest';
import { BlogSearch } from '#components';

registerEndpoint('/api/search/en.json', () => [
  {
    id: '/blog/hello',
    title: 'From Svelte to Nuxt',
    titles: [],
    content: 'Rebuilding my portfolio.',
    level: 1,
  },
  {
    id: '/blog/eslint',
    title: 'ESLint config',
    titles: [],
    content: 'Share it across projects.',
    level: 1,
  },
]);

async function waitFor(assertion: () => void) {
  for (let attempt = 0; attempt < 50; attempt++) {
    try {
      assertion();
      return;
    }
    catch {
      await flushPromises();
      await new Promise(resolve => setTimeout(resolve, 10));
    }
  }

  assertion();
}

describe('components: BlogSearch', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('renders an accessible button without loading the dialog', async () => {
    const wrapper = await mountSuspended(BlogSearch);
    const button = wrapper.get('[data-testid="blog-search-button"]');

    expect(button.attributes('aria-label')).toBe('searchOpen');
    expect(button.attributes('aria-keyshortcuts')).toBe('Meta+K Control+K');
    expect(wrapper.find('dialog').exists()).toBe(false);
  });

  it('opens with the keyboard shortcut and finds posts', async () => {
    const wrapper = await mountSuspended(BlogSearch, { attachTo: document.body });

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }));

    await waitFor(() => expect(wrapper.find('dialog').exists()).toBe(true));
    await waitFor(() => expect(wrapper.get('dialog').element.open).toBe(true));

    await wrapper.get('input').setValue('nuxt');

    await waitFor(() => expect(wrapper.findAll('[role="option"]')).toHaveLength(1));
    expect(wrapper.get('[role="option"]').text()).toContain('From Svelte to Nuxt');
    expect(wrapper.get('[role="option"]').attributes('aria-selected')).toBe('true');
  });

  it('shows the empty state when nothing matches', async () => {
    const wrapper = await mountSuspended(BlogSearch, { attachTo: document.body });

    await wrapper.get('[data-testid="blog-search-button"]').trigger('click');
    await waitFor(() => expect(wrapper.find('input').exists()).toBe(true));
    await wrapper.get('input').setValue('kubernetes');

    await waitFor(() => expect(wrapper.text()).toContain('searchNoResults'));
    expect(wrapper.findAll('[role="option"]')).toHaveLength(0);
  });
});
