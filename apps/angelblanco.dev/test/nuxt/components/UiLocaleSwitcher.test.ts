import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
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

    expect(button.classes()).not.toContain('text-primary-content');
    expect(button.classes()).not.toContain('dark:text-primary');

    await button.trigger('click');

    expect(button.classes()).toEqual(expect.arrayContaining(['text-primary-content', 'dark:text-primary']));
    wrapper.unmount();
  });

  it('should expose the toggle as a labelled disclosure button', async () => {
    const wrapper = await mountSuspended(UiLocaleSwitcher, { attachTo: document.body });
    const button = wrapper.get('#locale-switcher');

    expect(button.attributes('type')).toBe('button');
    expect(button.attributes('aria-label')).toBe('a11yLanguage');
    expect(button.attributes('aria-controls')).toBe('locale-switcher-menu');
    expect(button.attributes('aria-expanded')).toBe('false');

    await button.trigger('click');

    expect(button.attributes('aria-expanded')).toBe('true');
    expect(wrapper.find('#locale-switcher-menu').exists()).toBe(true);

    await button.trigger('click');

    expect(button.attributes('aria-expanded')).toBe('false');
    expect(wrapper.find('#locale-switcher-menu').exists()).toBe(false);
    wrapper.unmount();
  });

  it('should name each language in its own language', async () => {
    const wrapper = await mountSuspended(UiLocaleSwitcher, { attachTo: document.body });

    await wrapper.get('#locale-switcher').trigger('click');

    const english = wrapper.get('[data-lang="en"]');
    const spanish = wrapper.get('[data-lang="es"]');

    expect(english.attributes()).toMatchObject({ lang: 'en', hreflang: 'en' });
    expect(spanish.attributes()).toMatchObject({ lang: 'es', hreflang: 'es' });
    expect(english.get('.sr-only').text()).toBe('English');
    expect(spanish.get('.sr-only').text()).toBe('Español');
    wrapper.unmount();
  });

  it('should keep the visible code inside the accessible name of each language link', async () => {
    const wrapper = await mountSuspended(UiLocaleSwitcher, { attachTo: document.body });

    await wrapper.get('#locale-switcher').trigger('click');

    for (const [locale, code, name] of [
      ['en', 'EN', 'English'],
      ['es', 'ES', 'Español'],
    ]) {
      const link = wrapper.get(`[data-lang="${locale}"]`);

      expect(link.attributes('aria-label')).toBeUndefined();
      expect(link.text()).toBe(`${code} ${name}`);
    }
    wrapper.unmount();
  });

  it('should close with Escape and return focus to the toggle', async () => {
    const wrapper = await mountSuspended(UiLocaleSwitcher, { attachTo: document.body });
    const button = wrapper.get('#locale-switcher');

    await button.trigger('click');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await nextTick();

    expect(button.attributes('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(button.element);
    wrapper.unmount();
  });
});
