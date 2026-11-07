import type { SearchSection } from '../../../app/utils/searchSections';
import { describe, expect, it } from 'vitest';
import { normalizeSearchText, searchSections, searchSnippet } from '../../../app/utils/searchSections';

const sections: SearchSection[] = [
  {
    id: '/blog/node',
    title: 'Instalar Node.js',
    titles: [],
    content: 'Guía para Ubuntu con apt.',
    level: 1,
  },
  {
    id: '/blog/node#corepack',
    title: 'Corepack',
    titles: ['Instalar Node.js'],
    content: 'Activa pnpm y yarn.',
    level: 2,
  },
  {
    id: '/blog/eslint',
    title: 'ESLint config',
    titles: [],
    content: 'Comparte tu configuración en npm con pnpm.',
    level: 1,
  },
];

describe('utils: searchSections', () => {
  it('normalizes accents and case', () => {
    expect(normalizeSearchText('Guía ÁRBOL')).toBe('guia arbol');
  });

  it('returns nothing for an empty query', () => {
    expect(searchSections(sections, '   ')).toEqual([]);
  });

  it('ranks title matches above heading and content matches', () => {
    expect(searchSections(sections, 'node').map(result => result.id)).toEqual(['/blog/node', '/blog/node#corepack']);
    expect(searchSections(sections, 'pnpm').map(result => result.id)).toEqual(['/blog/eslint', '/blog/node#corepack']);
  });

  it('requires every term to match and ignores accents in the query', () => {
    expect(searchSections(sections, 'guia ubuntu').map(result => result.id)).toEqual(['/blog/node']);
    expect(searchSections(sections, 'guia eslint')).toEqual([]);
  });

  it('limits the results', () => {
    expect(searchSections(sections, 'pnpm', 1)).toHaveLength(1);
  });

  it('builds a snippet around the first match', () => {
    const content = `${'a '.repeat(100)}needle ${'b '.repeat(100)}`;
    const snippet = searchSnippet(content, 'needle', 60);

    expect(snippet).toContain('needle');
    expect(snippet.startsWith('…')).toBe(true);
    expect(snippet.endsWith('…')).toBe(true);
    expect(searchSnippet('short text', 'missing')).toBe('short text');
  });
});
