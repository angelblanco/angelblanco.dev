import { mountSuspended } from '@nuxt/test-utils/runtime';
import { afterEach, describe, expect, it } from 'vitest';
import { BlogComments } from '#components';

const emptyConfig = {
  repo: 'angelblanco/angelblanco.dev',
  repoId: '',
  category: '',
  categoryId: '',
};

describe('components: BlogComments', () => {
  afterEach(() => {
    updateAppConfig({ giscus: emptyConfig });
  });

  it('renders nothing while giscus is not configured', async () => {
    updateAppConfig({ giscus: emptyConfig });
    const wrapper = await mountSuspended(BlogComments, {
      props: { term: '/blog/hello' },
    });

    expect(wrapper.find('#blog-comments').exists()).toBe(false);
  });

  it('renders the comments section once giscus is configured', async () => {
    updateAppConfig({
      giscus: {
        ...emptyConfig,
        repoId: 'R_1',
        category: 'Comments',
        categoryId: 'DIC_1',
      },
    });
    const wrapper = await mountSuspended(BlogComments, {
      props: { term: '/blog/hello' },
    });

    expect(wrapper.find('#blog-comments').exists()).toBe(true);
    expect(wrapper.get('h2').text()).toBe('blogComments');
  });
});
