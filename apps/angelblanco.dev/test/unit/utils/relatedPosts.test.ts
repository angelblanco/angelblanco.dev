import { describe, expect, it } from 'vitest';
import { relatedPosts, relatedPostsGridClass } from '../../../app/utils/relatedPosts';

const current = {
  path: '/blog/current',
  date: '2025-01-01',
  tags: ['vue', 'nuxt', 'eslint'],
};

const posts = [
  current,
  {
    path: '/blog/one-tag-old',
    date: '2024-01-01',
    tags: ['vue'],
  },
  {
    path: '/blog/one-tag-new',
    date: '2025-06-01',
    tags: ['eslint', 'bash'],
  },
  {
    path: '/blog/two-tags',
    date: '2023-01-01',
    tags: ['vue', 'nuxt'],
  },
  {
    path: '/blog/unrelated',
    date: '2026-01-01',
    tags: ['ubuntu'],
  },
  {
    path: '/blog/one-tag-oldest',
    date: '2020-01-01',
    tags: ['nuxt'],
  },
];

describe('utils: relatedPosts', () => {
  it('sorts by shared tags and date, excluding the current and unrelated posts', () => {
    expect(relatedPosts(current, posts).map(post => post.path)).toEqual([
      '/blog/two-tags',
      '/blog/one-tag-new',
      '/blog/one-tag-old',
    ]);
  });

  it('respects the limit', () => {
    expect(relatedPosts(current, posts, 1)).toHaveLength(1);
  });

  it('returns nothing without shared tags', () => {
    expect(relatedPosts({
      ...current,
      tags: ['rust'],
    }, posts)).toEqual([]);
  });
});

describe('utils: relatedPostsGridClass', () => {
  it('should only use as many columns as related posts', () => {
    expect(relatedPostsGridClass(1)).toBe('');
    expect(relatedPostsGridClass(2)).toBe('sm:grid-cols-2');
    expect(relatedPostsGridClass(3)).toBe('sm:grid-cols-3');
  });
});
