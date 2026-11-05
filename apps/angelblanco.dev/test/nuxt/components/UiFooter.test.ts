import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { UiFooter } from '#components';

describe('components: UiFooter', () => {
  it('should link the content license', async () => {
    const wrapper = await mountSuspended(UiFooter);
    const link = wrapper.get('[data-testid="content-license"]');

    expect(link.text()).toBe('CC BY-NC-SA 4.0');
    expect(link.attributes('href')).toBe('https://creativecommons.org/licenses/by-nc-sa/4.0/');
    expect(link.attributes('rel')).toContain('license');
    expect(link.attributes('target')).toBe('_blank');
  });

  it('should show the copyright notice', async () => {
    const wrapper = await mountSuspended(UiFooter);

    expect(wrapper.text()).toContain('2025-Present © Author');
  });

  it('should render the filled tabler heart', async () => {
    const wrapper = await mountSuspended(UiFooter);

    expect(wrapper.find('.i-tabler\\:heart-filled').exists()).toBe(true);
  });

  it('should render as the page footer landmark', async () => {
    const wrapper = await mountSuspended(UiFooter);

    expect(wrapper.element.tagName).toBe('FOOTER');
  });

  it('should give every social link an accessible name', async () => {
    const wrapper = await mountSuspended(UiFooter);
    const links = wrapper.findAll('a.btn-square');

    expect(links.map(link => link.attributes('aria-label'))).toEqual(['GitHub', 'X', 'LinkedIn']);
    for (const link of links)
      expect(link.attributes('__target')).toBeUndefined();
  });

  it('should open the repository link in a new tab without an opener', async () => {
    const wrapper = await mountSuspended(UiFooter);
    const link = wrapper.get('a[href="https://github.com/angelblanco/angelblanco.dev"]');

    expect(link.attributes('target')).toBe('_blank');
    expect(link.attributes('rel')).toContain('noopener');
  });
});
