import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import PortfolioOgImage from '~/components/OgImage/PortfolioOgImage.browser.vue';

describe('components: PortfolioOgImage', () => {
  it('should render title, description, cta and section', async () => {
    const wrapper = await mountSuspended(PortfolioOgImage, {
      props: {
        title: 'Ángel Blanco',
        description: 'Personal full-stack engineering blog',
        cta: 'Read article',
        section: 'blog',
      },
    });

    expect(wrapper.get('[data-testid="og-title"]').text()).toBe('Ángel Blanco');
    expect(wrapper.get('[data-testid="og-description"]').text()).toBe('Personal full-stack engineering blog');
    expect(wrapper.get('[data-testid="og-cta"]').text()).toBe('Read article→');
    expect(wrapper.get('[data-testid="og-section"]').text()).toBe('/blog');
  });

  it('should inline the profile photo', async () => {
    const wrapper = await mountSuspended(PortfolioOgImage, {
      props: { title: 'Ángel Blanco' },
    });

    expect(wrapper.get('[data-testid="og-photo"]').attributes('src')).toMatch(/^data:image\/webp;base64,/);
  });

  it('should not duplicate a trailing arrow in the cta', async () => {
    const wrapper = await mountSuspended(PortfolioOgImage, {
      props: { title: 'Ángel Blanco', cta: 'Read more →' },
    });

    expect(wrapper.get('[data-testid="og-cta"]').text()).toBe('Read more→');
  });

  it('should omit optional parts when not provided', async () => {
    const wrapper = await mountSuspended(PortfolioOgImage, {
      props: { title: 'Ángel Blanco' },
    });

    expect(wrapper.find('[data-testid="og-description"]').exists()).toBe(false);
    expect(wrapper.find('[data-testid="og-cta"]').exists()).toBe(false);
    expect(wrapper.find('[data-testid="og-section"]').exists()).toBe(false);
  });

  it.each([
    ['Blog', 's'],
    ['How to create your own ESLint config', 'm'],
    ['How I migrated a Laravel monolith to Kubernetes safely', 'l'],
    ['How I migrated a Laravel monolith to Kubernetes in a month', 'xl'],
    ['How I migrated a Laravel monolith to Kubernetes without downtime or drama', 'xxl'],
  ])('should size the title "%s" as %s', async (title, size) => {
    const wrapper = await mountSuspended(PortfolioOgImage, {
      props: { title },
    });

    expect(wrapper.get('section').attributes('data-len')).toBe(size);
  });

  it.each([
    [22, 's'],
    [23, 'm'],
    [40, 'm'],
    [41, 'l'],
    [56, 'l'],
    [57, 'xl'],
    [68, 'xl'],
    [69, 'xxl'],
  ])('should size a %i character title as %s', async (length, size) => {
    const title = 'a'.repeat(length);
    const wrapper = await mountSuspended(PortfolioOgImage, {
      props: { title },
    });

    expect(wrapper.get('section').attributes('data-len')).toBe(size);
  });
});
