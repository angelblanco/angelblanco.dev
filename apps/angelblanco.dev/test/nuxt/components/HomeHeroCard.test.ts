import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { HomeHeroCard } from '#components';

describe('components: HomeHeroCard', () => {
  it('should narrow the card padding and heading below 375px only', async () => {
    const wrapper = await mountSuspended(HomeHeroCard);
    const card = wrapper.get('div');
    const heading = wrapper.get('h1');

    expect(card.classes()).toEqual(expect.arrayContaining([
      'p-12',
      'max-[375px]:px-6',
      'gap-6',
      'lg:gap-8',
    ]));
    expect(heading.classes()).toEqual(expect.arrayContaining(['text-5xl', 'max-[375px]:text-4xl', 'lg:text-8xl']));
  });

  it('should link the rotated photo to the about page', async () => {
    const wrapper = await mountSuspended(HomeHeroCard);
    const image = wrapper.get('img');

    expect(image.classes()).toEqual(expect.arrayContaining([
      'size-24',
      'rotate-15',
      'md:size-42',
      'lg:size-64',
    ]));
    expect(image.element.closest('a')?.getAttribute('href')).toMatch(/^\/about\/?$/);
  });
});
