import type { BlogSearchData } from '../../../shared/types/blogSearch';
import { describe, expect, it } from 'vitest';
import {
  createBlogSearchIndex,
  highlightParts,
  normalizeSearchText,
  searchBlog,
  searchSnippet,
  searchTerms,
} from '../../../app/utils/blogSearch';

const data: BlogSearchData = {
  posts: [
    {
      path: '/blog/php',
      title: 'Instalar PHP 8.5 en Ubuntu',
      description: 'Con el PPA de Ondřej.',
      tags: ['php', 'ubuntu'],
      date: '2026-03-01',
      readingTime: 4,
      content: 'Una guía rápida.',
    },
    {
      path: '/blog/eslint',
      title: 'Crea tu configuración de ESLint',
      description: 'Comparte reglas entre proyectos.',
      tags: ['eslint', 'typescript'],
      date: '2026-02-01',
      readingTime: 6,
      content: 'Publica el paquete con pnpm.',
    },
    {
      path: '/blog/node',
      title: 'Instalar Node.js',
      description: 'Desde NodeSource.',
      tags: ['node', 'ubuntu'],
      date: '2026-01-01',
      content: 'Guía para Ubuntu.',
    },
  ],
  sections: [
    {
      id: '/blog/node#corepack',
      postPath: '/blog/node',
      title: 'Corepack',
      titles: ['Instalar Node.js'],
      content: 'Activa pnpm y yarn con ESLint listo.',
      level: 2,
    },
    {
      id: '/blog/node#versiones',
      postPath: '/blog/node',
      title: 'Versiones',
      titles: ['Instalar Node.js'],
      content: 'Cambia de versión con pnpm env.',
      level: 2,
    },
    {
      id: '/blog/orphan#lost',
      postPath: '/blog/orphan',
      title: 'Lost',
      titles: [],
      content: 'pnpm',
      level: 2,
    },
  ],
};

const index = await createBlogSearchIndex(data, 'spanish');

function paths(results: Awaited<ReturnType<typeof searchBlog>>) {
  return results.hits.map(hit => hit.post.path);
}

describe('utils: blogSearch', () => {
  it('normalizes accents, case and the tag prefix', () => {
    expect(normalizeSearchText('Guía ÁRBOL')).toBe('guia arbol');
    expect(searchTerms('#Node.js  guía')).toEqual(['node.js', 'guia']);
  });

  it('builds the tag list from the posts', () => {
    expect(index.tags[0]).toEqual({ tag: 'ubuntu', count: 2 });
    expect(index.sections.has('/blog/orphan#lost')).toBe(false);
  });

  it('shows the recent posts with an empty query', async () => {
    const results = await searchBlog(index, '  ', { recentLimit: 2 });

    expect(paths(results)).toEqual(['/blog/php', '/blog/eslint']);
    expect(results.tags).toEqual([]);
  });

  it('ranks a post match above a section match', async () => {
    const results = await searchBlog(index, 'eslint');

    expect(paths(results)).toEqual(['/blog/eslint', '/blog/node']);
    expect(results.hits[0]).toMatchObject({ matched: true, sections: [] });
    expect(results.hits[1]!.matched).toBe(false);
    expect(results.hits[1]!.sections.map(section => section.id)).toEqual(['/blog/node#corepack']);
  });

  it('groups the matching sections under their post', async () => {
    const results = await searchBlog(index, 'pnpm', { sectionsPerPost: 1 });

    expect(paths(results)).toContain('/blog/node');
    expect(results.hits.find(hit => hit.post.path === '/blog/node')!.sections).toHaveLength(1);
  });

  it('ignores accents and matches prefixes', async () => {
    expect(paths(await searchBlog(index, 'guia'))).toEqual(['/blog/php', '/blog/node']);
    expect(paths(await searchBlog(index, 'instal'))).toEqual(expect.arrayContaining(['/blog/php', '/blog/node']));
  });

  it('requires every term to match', async () => {
    expect(paths(await searchBlog(index, 'instalar php'))).toEqual(['/blog/php']);
  });

  it('filters by any of the selected tags', async () => {
    expect(paths(await searchBlog(index, '', {
      tags: ['php', 'eslint'],
    }))).toEqual(['/blog/php', '/blog/eslint']);
    expect(paths(await searchBlog(index, 'instalar', {
      tags: ['node'],
    }))).toEqual(['/blog/node']);
    expect(paths(await searchBlog(index, 'pnpm', {
      tags: ['php'],
    }))).toEqual([]);
  });

  it('suggests the topics that match the query, even when filtered', async () => {
    expect((await searchBlog(index, 'ubu')).tags).toEqual([
      { tag: 'ubuntu', count: 2 },
    ]);
    expect((await searchBlog(index, 'ubu', {
      tags: ['ubuntu'],
    })).tags).toEqual([
      { tag: 'ubuntu', count: 2 },
    ]);
  });

  it('only suggests tags in tag mode', async () => {
    const results = await searchBlog(index, '#');

    expect(results.hits).toEqual([]);
    expect(results.tags.map(({ tag }) => tag)).toEqual([
      'ubuntu',
      'eslint',
      'node',
      'php',
      'typescript',
    ]);
    expect((await searchBlog(index, '#es')).tags.map(({ tag }) => tag)).toEqual(['eslint', 'typescript']);
    expect((await searchBlog(index, '#scr')).tags.map(({ tag }) => tag)).toEqual(['typescript']);
  });

  it('limits the results', async () => {
    expect((await searchBlog(index, 'instalar', { limit: 1 })).hits).toHaveLength(1);
  });

  it('builds a snippet around the first match', () => {
    const content = `${'a '.repeat(100)}needle ${'b '.repeat(100)}`;
    const snippet = searchSnippet(content, ['missing', 'needle'], 60);

    expect(snippet).toContain('needle');
    expect(snippet.startsWith('…')).toBe(true);
    expect(snippet.endsWith('…')).toBe(true);
    expect(searchSnippet('short text', ['missing'])).toBe('short text');
  });

  it('splits the text into highlighted parts ignoring accents', () => {
    expect(highlightParts('Guía de Node', ['guia', 'node'])).toEqual([
      { text: 'Guía', match: true },
      { text: ' de ', match: false },
      { text: 'Node', match: true },
    ]);
    expect(highlightParts('plain', [])).toEqual([
      { text: 'plain', match: false },
    ]);
  });
});
