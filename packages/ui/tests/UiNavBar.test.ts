import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import NavBar from '../components/UiNavBar.vue';

describe('uiNavBar', () => {
  it('renders logo slot', () => {
    const wrapper = mount(NavBar, {
      props: {
        logo: '/',
        menuItems: [],
      },
      slots: {
        logo: '<span>MyLogo</span>',
      },
    });
    expect(wrapper.html()).toContain('MyLogo');
  });

  it('renders menu items', () => {
    const wrapper = mount(NavBar, {
      props: {
        logo: '/',
        menuItems: [
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
        ],
      },
    });
    expect(wrapper.text()).toContain('Home');
    expect(wrapper.text()).toContain('About');
  });

  it('renders right items', () => {
    const wrapper = mount(NavBar, {
      props: {
        logo: '/',
        menuItems: [],
        rightItems: [
          { label: 'Login', href: '/login' },
          { icon: 'i-heroicons-bell' },
        ],
      },
    });
    expect(wrapper.text()).toContain('Login');
    expect(wrapper.find('i.i-heroicons-bell').exists()).toBe(true);
  });
});
