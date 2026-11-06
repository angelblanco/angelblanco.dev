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

  it('should not tilt the icons on hover', async () => {
    const wrapper = await mountSuspended(UiThemeSwitcher);
    const icons = wrapper.findAll('#theme-switcher .swap-on, #theme-switcher .swap-off');

    expect(icons).toHaveLength(2);
    expect(icons.flatMap(icon => icon.classes()).some(name => name.includes('rotate-12'))).toBe(false);
  });

  it('should be a labelled toggle button that reports the dark theme state', async () => {
    const wrapper = await mountSuspended(UiThemeSwitcher);
    const button = wrapper.get('#theme-switcher');
    const pressed = button.attributes('aria-pressed');

    expect(button.element.tagName).toBe('BUTTON');
    expect(button.attributes('type')).toBe('button');
    expect(button.attributes('aria-label')).toBe('a11yDarkTheme');
    expect(['true', 'false']).toContain(pressed);

    await button.trigger('click');

    expect(button.attributes('aria-pressed')).not.toBe(pressed);
  });
});
