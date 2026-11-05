import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { h } from 'vue';
import DefaultLayout from '~/layouts/default.vue';

describe('layouts: default', () => {
  it('should wrap the page in header, main and footer landmarks', async () => {
    const wrapper = await mountSuspended(DefaultLayout, {
      slots: {
        default: () => h('p', { id: 'page' }, 'content'),
      },
    });

    expect(wrapper.find('header nav#ui-nav-bar').exists()).toBe(true);
    expect(wrapper.find('main #page').exists()).toBe(true);
    expect(wrapper.find('footer').exists()).toBe(true);
    expect(wrapper.findAll('nav')).toHaveLength(1);
  });
});
