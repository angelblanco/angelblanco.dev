import { describe, expect, it } from 'vitest';
import { tagCounts } from '../../../app/utils/tagCounts';

describe('utils: tagCounts', () => {
  it('sorts tags by number of posts and then alphabetically', () => {
    const posts = [
      {
        tags: ['vue', 'nuxt'],
      },
      {
        tags: ['nuxt', 'eslint'],
      },
      {
        tags: ['nuxt', 'vue', 'bash'],
      },
    ];

    expect(tagCounts(posts)).toEqual([
      { tag: 'nuxt', count: 3 },
      { tag: 'vue', count: 2 },
      { tag: 'bash', count: 1 },
      { tag: 'eslint', count: 1 },
    ]);
  });

  it('returns an empty list without posts', () => {
    expect(tagCounts([])).toEqual([]);
  });
});
