import type { Orama } from '@orama/orama';
import type { BlogSearchData, BlogSearchPost, BlogSearchSection } from '../../shared/types/blogSearch';
import type { TagCount } from './tagCounts';
import { create, insertMultiple, search } from '@orama/orama';
import { tagCounts } from './tagCounts';

const schema = {
  kind: 'enum',
  title: 'string',
  description: 'string',
  titles: 'string[]',
  content: 'string',
  keywords: 'string',
  tags: 'enum[]',
} as const;

export const POST_WEIGHT = 3;

export const SEARCH_BOOST = {
  title: 4,
  description: 2,
  keywords: 2,
  titles: 1.5,
  content: 1,
};

export interface BlogSearchIndex {
  db: Orama<typeof schema>;
  posts: Map<string, BlogSearchPost>;
  sections: Map<string, BlogSearchSection>;
  tags: TagCount[];
}

export interface BlogSearchHit {
  post: BlogSearchPost;
  score: number;
  matched: boolean;
  sections: BlogSearchSection[];
}

export interface BlogSearchResults {
  terms: string[];
  tags: TagCount[];
  hits: BlogSearchHit[];
}

export interface BlogSearchOptions {
  tags?: string[];
  limit?: number;
  tagLimit?: number;
  recentLimit?: number;
  sectionsPerPost?: number;
}

export interface HighlightPart {
  text: string;
  match: boolean;
}

export function normalizeSearchText(text: string): string {
  return text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
}

export function searchTerms(query: string): string[] {
  return normalizeSearchText(query.replace(/^#/, '')).split(/[^\p{L}\p{N}.+-]+/u).filter(Boolean);
}

export function searchSnippet(content: string, terms: string[], length = 140): string {
  const normalized = normalizeSearchText(content);
  const index = Math.min(...terms.map(term => normalized.indexOf(term)).filter(index => index >= 0));
  const start = Number.isFinite(index)
    ? Math.max(0, Math.min(index - 40, content.length - length))
    : 0;
  const snippet = content.slice(start, start + length).trim();

  return `${start > 0
    ? '…'
    : ''}${snippet}${start + length < content.length
    ? '…'
    : ''}`;
}

export function highlightParts(text: string, terms: string[]): HighlightPart[] {
  const chars = Array.from(text);
  const normalized = chars.map((char) => {
    const value = normalizeSearchText(char);

    return value.length === 1
      ? value
      : '\0';
  }).join('');
  const marked = chars.map(() => false);

  for (const term of terms) {
    for (let index = normalized.indexOf(term); index >= 0; index = normalized.indexOf(term, index + term.length))
      marked.fill(true, index, index + term.length);
  }

  const parts: HighlightPart[] = [];

  chars.forEach((char, index) => {
    const last = parts.at(-1);

    if (last && last.match === marked[index])
      last.text += char;
    else
      parts.push({ text: char, match: marked[index]! });
  });

  return parts;
}

export async function createBlogSearchIndex(data: BlogSearchData, language = 'english'): Promise<BlogSearchIndex> {
  const db = create({ schema, language });
  const posts = new Map(data.posts.map(post => [post.path, post]));
  const sections = new Map(data.sections.filter(section => posts.has(section.postPath)).map(section => [section.id, section]));

  await insertMultiple(db, [
    ...data.posts.map(post => ({
      id: post.path,
      kind: 'post',
      title: post.title,
      description: post.description,
      titles: [],
      content: post.content,
      keywords: post.tags.join(' '),
      tags: post.tags,
    })),
    ...[
      ...sections.values(),
    ].map(section => ({
      id: section.id,
      kind: 'section',
      title: section.title,
      description: '',
      titles: section.titles,
      content: section.content,
      keywords: '',
      tags: posts.get(section.postPath)!.tags,
    })),
  ]);

  return {
    db,
    posts,
    sections,
    tags: tagCounts(data.posts),
  };
}

export async function searchBlog(index: BlogSearchIndex, query: string, options: BlogSearchOptions = {}): Promise<BlogSearchResults> {
  const { tags: selected = [], limit = 8, tagLimit = 6, recentLimit = 5, sectionsPerPost = 3 } = options;
  const terms = searchTerms(query);
  const term = terms.join(' ');
  const tagMode = query.trimStart().startsWith('#');
  const posts = [
    ...index.posts.values(),
  ];

  const tags = term || tagMode
    ? index.tags
        .filter(({ tag }) => !term || normalizeSearchText(tag).includes(term))
        .sort((a, b) => Number(normalizeSearchText(b.tag).startsWith(term)) - Number(normalizeSearchText(a.tag).startsWith(term)))
        .slice(0, tagMode ? undefined : tagLimit)
    : [];

  if (tagMode)
    return { terms, tags, hits: [] };

  if (!term) {
    const filtered = selected.length
      ? posts.filter(post => post.tags.some(tag => selected.includes(tag)))
      : posts.slice(0, recentLimit);

    return {
      terms,
      tags,
      hits: filtered.map(post => ({
        post,
        score: 0,
        matched: true,
        sections: [],
      })),
    };
  }

  const result = await search(index.db, {
    term,
    properties: [
      'title',
      'description',
      'titles',
      'content',
      'keywords',
    ],
    boost: SEARCH_BOOST,
    tolerance: term.length > 4
      ? 1
      : 0,
    threshold: 0,
    limit: 200,
    ...(selected.length && {
      where: {
        tags: { containsAny: selected },
      },
    }),
  });

  const groups = new Map<string, BlogSearchHit & { postScore: number; sectionScore: number }>();

  for (const { id, score, document } of result.hits) {
    const postPath = id.split('#')[0]!;
    const post = index.posts.get(postPath);

    if (!post)
      continue;

    const group = groups.get(postPath) ?? {
      post,
      score: 0,
      postScore: 0,
      sectionScore: 0,
      matched: false,
      sections: [],
    };
    groups.set(postPath, group);

    if (document.kind === 'post') {
      group.matched = true;
      group.postScore = score * POST_WEIGHT;
    }
    else {
      const section = index.sections.get(id);

      group.sectionScore = Math.max(group.sectionScore, score);

      if (section && group.sections.length < sectionsPerPost)
        group.sections.push(section);
    }

    group.score = group.postScore + group.sectionScore;
  }

  return {
    terms,
    tags,
    hits: [
      ...groups.values(),
    ]
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(({ post, score, matched, sections }) => ({ post, score, matched, sections })),
  };
}
