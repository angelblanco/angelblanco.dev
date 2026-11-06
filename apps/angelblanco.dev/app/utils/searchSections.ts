export interface SearchSection {
  id: string;
  title: string;
  titles: string[];
  content: string;
  level: number;
}

export interface SearchResult extends SearchSection {
  score: number;
  snippet: string;
}

export function normalizeSearchText(text: string): string {
  return text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
}

export function searchSnippet(content: string, term: string, length = 140): string {
  const index = normalizeSearchText(content).indexOf(term);
  const start = Math.max(0, Math.min(index - 40, content.length - length));
  const snippet = content.slice(start, start + length).trim();

  return `${start > 0
    ? '…'
    : ''}${snippet}${start + length < content.length
    ? '…'
    : ''}`;
}

export function searchSections(sections: SearchSection[], query: string, limit = 8): SearchResult[] {
  const terms = normalizeSearchText(query).split(/\s+/).filter(Boolean);

  if (!terms.length)
    return [];

  const results: SearchResult[] = [];

  for (const section of sections) {
    const title = normalizeSearchText(section.title);
    const titles = normalizeSearchText(section.titles.join(' '));
    const content = normalizeSearchText(section.content);
    let score = 0;

    for (const term of terms) {
      const termScore = (title.includes(term)
        ? 10
        : 0) + (titles.includes(term)
        ? 4
        : 0) + (content.includes(term)
        ? 1
        : 0);

      if (!termScore) {
        score = 0;
        break;
      }

      score += termScore;
    }

    if (score) {
      results.push({
        ...section,
        score,
        snippet: searchSnippet(section.content, terms[0]!),
      });
    }
  }

  return results
    .sort((a, b) => b.score - a.score || a.level - b.level)
    .slice(0, limit);
}
