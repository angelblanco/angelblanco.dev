import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { UiThemeSwitcher } from '#components';

describe('components: UiThemeSwitcher', () => {
  it('should render the tabler sun and moon-stars icons', async () => {
    const wrapper = await mountSuspended(UiThemeSwitcher, {
      props: { iconSize: 'size-5' },
    });
    const switcher = wrapper.get('#theme-switcher');

    expect(switcher.find('.i-tabler\\:sun').exists()).toBe(true);
    expect(switcher.find('.i-tabler\\:moon-stars').exists()).toBe(true);
  });

  it('should only tilt the visible icon on hover when motion is allowed', async () => {
    const wrapper = await mountSuspended(UiThemeSwitcher);
    const visible = wrapper.get('#theme-switcher .swap-off');
    const hidden = wrapper.get('#theme-switcher .swap-on');

    expect(visible.classes().some(name => /^motion-safe:group-hover:-?rotate-12$/.test(name))).toBe(true);
    expect(hidden.classes().some(name => name.includes('rotate-12'))).toBe(false);
  });
});
