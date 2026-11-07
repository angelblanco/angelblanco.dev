import type { BlogSearchData } from '#shared/types/blogSearch';
import { mountSuspended, registerEndpoint } from '@nuxt/test-utils/runtime';
import { flushPromises } from '@vue/test-utils';
import { afterEach, describe, expect, it } from 'vitest';
import { BlogSearch } from '#components';

const data: BlogSearchData = {
  posts: [
    {
      path: '/blog/eslint',
      title: 'ESLint config',
      description: 'Share it across projects.',
      tags: ['eslint', 'typescript'],
      date: '2026-02-01',
      readingTime: 5,
      content: 'Publish it to npm.',
    },
    {
      path: '/blog/hello',
      title: 'From Svelte to Nuxt',
      description: 'Rebuilding my portfolio.',
      tags: ['nuxt'],
      date: '2026-01-01',
      content: 'Why I moved.',
    },
  ],
  sections: [
    {
      id: '/blog/hello#linting',
      postPath: '/blog/hello',
      title: 'Linting',
      titles: ['From Svelte to Nuxt'],
      content: 'I use my own eslint rules.',
      level: 2,
    },
  ],
};

registerEndpoint('/api/search/en.json', () => data);

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

async function openSearch() {
  const wrapper = await mountSuspended(BlogSearch, { attachTo: document.body });

  await wrapper.get('[data-testid="blog-search-button"]').trigger('click');
  await waitFor(() => expect(wrapper.findAll('[data-testid="blog-search-tag-filter"]')).toHaveLength(3));

  return wrapper;
}

function optionTexts(wrapper: Awaited<ReturnType<typeof openSearch>>) {
  return wrapper.findAll('[role="option"]').map(option => option.text());
}

describe('components: BlogSearch', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('renders an accessible button without loading the dialog', async () => {
    const wrapper = await mountSuspended(BlogSearch);
    const button = wrapper.get('[data-testid="blog-search-button"]');

    expect(button.attributes('aria-label')).toBe('Search the blog');
    expect(button.attributes('aria-keyshortcuts')).toBe('Meta+K Control+K');
    expect(wrapper.find('dialog').exists()).toBe(false);
  });

  it('opens with the keyboard shortcut and shows the recent posts', async () => {
    const wrapper = await mountSuspended(BlogSearch, { attachTo: document.body });

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }));

    await waitFor(() => expect(wrapper.find('dialog').exists()).toBe(true));
    await waitFor(() => expect(wrapper.get('dialog').element.open).toBe(true));
    await waitFor(() => expect(wrapper.findAll('[data-testid="blog-search-post"]')).toHaveLength(2));
    expect(wrapper.get('[role="option"]').attributes('aria-selected')).toBe('true');
  });

  it('ranks the post match first and groups the section under its post', async () => {
    const wrapper = await openSearch();

    await wrapper.get('input').setValue('eslint');

    await waitFor(() => expect(wrapper.findAll('[role="option"]')).toHaveLength(4));
    const [post, parent, section, tag] = optionTexts(wrapper);

    expect(tag).toContain('#eslint');
    expect(post).toContain('ESLint config');
    expect(parent).toContain('From Svelte to Nuxt');
    expect(section).toContain('Linting');
    expect(wrapper.find('mark').text().toLowerCase()).toBe('eslint');
  });

  it('moves through the options with the arrow keys', async () => {
    const wrapper = await openSearch();
    const input = wrapper.get('input');

    await input.setValue('eslint');
    await waitFor(() => expect(wrapper.findAll('[role="option"]')).toHaveLength(4));

    await input.trigger('keydown', { key: 'ArrowDown' });
    await input.trigger('keydown', { key: 'ArrowDown' });

    expect(input.attributes('aria-activedescendant')).toBe('blog-search-option-2');
    expect(wrapper.get('#blog-search-option-2').attributes('aria-selected')).toBe('true');

    await input.trigger('keydown', { key: 'ArrowUp' });
    await input.trigger('keydown', { key: 'ArrowUp' });
    await input.trigger('keydown', { key: 'ArrowUp' });

    expect(input.attributes('aria-activedescendant')).toBe('blog-search-option-3');
  });

  it('filters by the toggled tags and removes the last one with backspace', async () => {
    const wrapper = await openSearch();
    const [eslint, nuxt] = wrapper.findAll('[data-testid="blog-search-tag-filter"]').filter(chip => ['#eslint1', '#nuxt1'].includes(chip.text()));

    await nuxt!.trigger('click');
    await waitFor(() => expect(wrapper.findAll('[data-testid="blog-search-post"]')).toHaveLength(1));
    expect(nuxt!.attributes('aria-pressed')).toBe('true');
    expect(wrapper.get('[data-testid="blog-search-post"]').text()).toContain('From Svelte to Nuxt');

    await eslint!.trigger('click');
    await waitFor(() => expect(wrapper.findAll('[data-testid="blog-search-post"]')).toHaveLength(2));
    expect(wrapper.findAll('[data-testid="blog-search-active-tag"]').map(chip => chip.text())).toEqual(['#nuxt', '#eslint']);

    await wrapper.get('input').trigger('keydown', { key: 'Backspace' });
    await waitFor(() => expect(wrapper.findAll('[data-testid="blog-search-active-tag"]')).toHaveLength(1));
    expect(eslint!.attributes('aria-pressed')).toBe('false');
  });

  it('filters the topics in tag mode and opens the topic page', async () => {
    const wrapper = await openSearch();
    const input = wrapper.get('input');

    await input.setValue('#type');
    await waitFor(() => expect(wrapper.findAll('[data-testid="blog-search-topic"]')).toHaveLength(1));
    expect(optionTexts(wrapper)).toEqual([
      expect.stringContaining('#typescript'),
    ]);
    expect(wrapper.findAll('[data-testid="blog-search-tag-filter"]').map(chip => chip.text())).toEqual(['#typescript1']);

    await input.trigger('keydown', { key: 'Enter' });

    await waitFor(() => expect(useRouter().currentRoute.value.path).toBe('/blog/tags/typescript'));
    expect(wrapper.findAll('[data-testid="blog-search-active-tag"]')).toHaveLength(0);
  });

  it('shows the empty state when nothing matches', async () => {
    const wrapper = await openSearch();

    await wrapper.get('input').setValue('kubernetes');

    await waitFor(() => expect(wrapper.find('[data-testid="blog-search-empty"]').exists()).toBe(true));
    expect(wrapper.text()).toContain('No results for “kubernetes”');
    expect(wrapper.findAll('[role="option"]')).toHaveLength(0);
  });
});
