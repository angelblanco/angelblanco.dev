import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { UiLocaleSwitcher } from '#components';

describe('components: UiLocaleSwitcher', () => {
  it('should render the tabler language icon', async () => {
    const wrapper = await mountSuspended(UiLocaleSwitcher, {
      props: { iconSize: 'size-5' },
    });
    const button = wrapper.get('#locale-switcher');

    expect(button.get('.i-tabler\\:language').classes()).toContain('size-5');
  });

  it('should only highlight the button with the primary color while open', async () => {
    const wrapper = await mountSuspended(UiLocaleSwitcher, { attachTo: document.body });
    const button = wrapper.get('#locale-switcher');

    expect(button.classes()).not.toContain('text-primary');

    await button.trigger('click');

    expect(button.classes()).toContain('text-primary');
    wrapper.unmount();
  });
});
