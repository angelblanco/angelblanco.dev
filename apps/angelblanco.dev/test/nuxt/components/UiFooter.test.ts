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
});
