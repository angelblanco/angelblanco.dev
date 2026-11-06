export const WORDS_PER_MINUTE = 200;

export function countWords(markdown: string): number {
  const text = markdown
    .replace(/^---\r?\n[\s\S]*?\r?\n---/, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`~|[\]{}()-]/g, ' ');

  return text.match(/[\p{L}\p{N}][\p{L}\p{N}'’.]*/gu)?.length ?? 0;
}

export function readingTime(markdown: string, wordsPerMinute = WORDS_PER_MINUTE): number {
  return Math.max(1, Math.ceil(countWords(markdown) / wordsPerMinute));
}
