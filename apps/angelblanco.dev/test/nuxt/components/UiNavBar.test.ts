import { mountSuspended } from '@nuxt/test-utils/runtime';
import { afterEach, describe, expect, it } from 'vitest';
import { UiNavBar } from '#components';

describe('components: UiNavBar', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should render the tabler github icon in the repository link', async () => {
    const wrapper = await mountSuspended(UiNavBar);
    const link = wrapper.get('a[href="https://github.com/angelblanco/angelblanco.dev"]');

    expect(link.find('.i-tabler\\:brand-github').exists()).toBe(true);
  });

  it('should render the header icons with the compact size', async () => {
    const wrapper = await mountSuspended(UiNavBar);
    const icons = wrapper.findAll('.iconify');

    expect(icons.length).toBeGreaterThan(0);
    for (const icon of icons) {
      expect(icon.classes()).toEqual(expect.arrayContaining(['size-5', 'lg:size-6']));
      expect(icon.classes()).not.toContain('fill-current');
    }
  });

  it('should swap the menu icon for the close icon when toggled', async () => {
    const wrapper = await mountSuspended(UiNavBar, { attachTo: document.body });
    const toggle = wrapper.get('#ui-navbar-toggle');

    expect(toggle.get('.i-tabler\\:menu-2').classes()).toContain('swap-off');
    expect(toggle.get('.i-tabler\\:x').classes()).toContain('swap-on');

    await toggle.trigger('click');

    expect(toggle.get('.i-tabler\\:menu-2').classes()).toContain('swap-on');
    expect(toggle.get('.i-tabler\\:x').classes()).toContain('swap-off');
  });

  it('should only highlight the menu toggle with the primary color while open', async () => {
    const wrapper = await mountSuspended(UiNavBar, { attachTo: document.body });
    const toggle = wrapper.get('#ui-navbar-toggle');

    expect(toggle.classes()).not.toContain('text-primary');

    await toggle.trigger('click');

    expect(toggle.classes()).toContain('text-primary');
  });

  it('should render the mobile menu entries with tabler icons', async () => {
    const wrapper = await mountSuspended(UiNavBar, { attachTo: document.body });

    await wrapper.get('#ui-navbar-toggle').trigger('click');

    const menu = document.querySelector('#ui-nav-bar-menu');
    const iconNames = ['article', 'code', 'user'];

    expect(menu).not.toBeNull();
    for (const name of iconNames) {
      expect(menu!.querySelector(`.i-tabler\\:${name}`)).not.toBeNull();
    }
  });
});
