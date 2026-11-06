import { describe, expect, it } from 'vitest';
import { countWords, readingTime } from '../../../app/utils/readingTime';

describe('utils: readingTime', () => {
  it('ignores frontmatter, comments and markdown syntax', () => {
    const markdown = [
      '---',
      'title: "A long title that should not count"',
      'tags: [a, b]',
      '---',
      '',
      '## Hello world',
      '',
      '<!-- automd:file src="x" -->',
      'Read the [Nuxt docs](https://nuxt.com/docs) and **enjoy** it.',
    ].join('\n');

    expect(countWords(markdown)).toBe(9);
  });

  it('counts accented words and contractions as single words', () => {
    expect(countWords('Está aquí, it’s fine. Node.js 26')).toBe(6);
  });

  it('returns at least one minute', () => {
    expect(readingTime('')).toBe(1);
    expect(readingTime('one two')).toBe(1);
  });

  it('rounds up to the next minute', () => {
    expect(readingTime(Array.from({ length: 201 }).fill('word').join(' '))).toBe(2);
    expect(readingTime(Array.from({ length: 400 }).fill('word').join(' '))).toBe(2);
    expect(readingTime('a b c', 2)).toBe(2);
  });
});
