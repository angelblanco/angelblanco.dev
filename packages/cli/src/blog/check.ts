import type { CodeBlock, Post } from './parse.ts';
import { headingAnchor } from './parse.ts';

export type Level = 'error' | 'warn';

export interface Issue {
  file: string;
  line: number;
  level: Level;
  message: string;
}

export interface CheckContext {
  slugs: Set<string>;
  fileExists: (post: Post, src: string) => boolean;
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const VAGUE_LINK_TEXT = new Set([
  'here',
  'click here',
  'this',
  'link',
  'aquí',
  'aqui',
  'pincha aquí',
  'este enlace',
  'enlace',
]);
const COMMENT_RE = /^\s*(?:#(?!!)|\/\/|\/\*|\*|<!--)/;
const PARITY_FIELDS = [
  'tags',
  'date',
  'updatedAt',
  'image',
  'toc',
] as const;

function isDate(value: unknown): boolean {
  return typeof value === 'string' && DATE_RE.test(value) && !Number.isNaN(Date.parse(value));
}

function isTitleCase(text: string): boolean {
  const words = text
    .replace(/`[^`]*`/g, '')
    .replace(/[^\p{L}\s]/gu, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .slice(1)
    .filter(word => word.length >= 3 && word !== word.toUpperCase());

  return words.length >= 2 && words.every(word => /^[A-Z][a-z]+$/.test(word));
}

export function routeOf(slug: string): string {
  return slug.replace(/^\d+\./, '');
}

export function checkPost(post: Post, context: CheckContext): Issue[] {
  const issues: Issue[] = [];
  const add = (line: number, level: Level, message: string): void => {
    issues.push({
      file: post.file,
      line,
      level,
      message,
    });
  };
  const { title, tags, date, updatedAt, toc } = post.frontmatter;

  if (post.frontmatterError)
    add(1, 'error', `Invalid frontmatter: ${post.frontmatterError}`);
  if (typeof title !== 'string' || title.length < 10)
    add(1, 'error', '`title` must be a string of at least 10 characters');
  if (!Array.isArray(tags) || tags.length === 0)
    add(1, 'error', '`tags` must have at least one tag');
  if (!isDate(date))
    add(1, 'error', '`date` must be YYYY-MM-DD');
  if (updatedAt !== undefined && !isDate(updatedAt))
    add(1, 'error', '`updatedAt` must be YYYY-MM-DD');
  if (toc !== undefined && typeof toc !== 'boolean')
    add(1, 'error', '`toc` must be a boolean');

  let previous = 1;

  for (const heading of post.headings) {
    if (heading.level === 1)
      add(heading.line, 'error', 'Do not use H1 in the body, the title comes from the frontmatter');
    else if (heading.level > previous + 1 && previous > 1)
      add(heading.line, 'warn', `Heading jumps from H${previous} to H${heading.level}`);
    if (isTitleCase(heading.text))
      add(heading.line, 'warn', `Heading looks like Title Case, use sentence case: "${heading.text}"`);
    previous = heading.level;
  }

  for (const block of post.codeBlocks) {
    if (!block.lang)
      add(block.line, 'error', 'Code fence has no language identifier');
  }

  for (const block of post.automd) {
    if (!block.closed)
      add(block.line, 'error', 'automd block has no closing `<!-- /automd -->`');
    if (!block.src)
      add(block.line, 'error', 'automd block has no `src`');
    else if (!context.fileExists(post, block.src))
      add(block.line, 'error', `automd source not found: ${block.src}`);
  }

  const anchors = new Set(post.headings.map(heading => headingAnchor(heading.text)));
  const blogPrefix = post.lang === 'es'
    ? '/es/blog/'
    : '/blog/';

  for (const link of post.links) {
    if (link.image) {
      if (!link.text.trim())
        add(link.line, 'error', `Image has no alt text: ${link.url}`);
      continue;
    }

    if (VAGUE_LINK_TEXT.has(link.text.trim().toLowerCase()))
      add(link.line, 'warn', `Link text "${link.text}" does not describe its target`);

    if (link.url.startsWith('#')) {
      if (!anchors.has(link.url.slice(1)))
        add(link.line, 'warn', `No heading matches anchor ${link.url}`);
      continue;
    }

    const internal = /^\/(?:es\/)?blog\/([^#?]+)/.exec(link.url);

    if (!internal)
      continue;
    if (!link.url.startsWith(blogPrefix))
      add(link.line, 'error', `${post.lang.toUpperCase()} posts must link to ${blogPrefix}…, got ${link.url}`);
    if (!context.slugs.has(internal[1]!))
      add(link.line, 'error', `No post with route ${internal[1]} (drop the numeric prefix of the file name)`);
  }

  return issues;
}

function stripComments(block: CodeBlock): string[] {
  return block.content.filter(line => !COMMENT_RE.test(line)).map(line => line.trimEnd());
}

function comments(block: CodeBlock): string[] {
  return block.content.filter(line => COMMENT_RE.test(line)).map(line => line.trim());
}

function externalUrls(post: Post): Set<string> {
  return new Set(post.links
    .filter(link => !link.image && /^https?:\/\//.test(link.url))
    .map(link => link.url.replace(/\/(?:en|es)(?=\/)/, '').replace(/\/$/, '')));
}

export function checkPair(en: Post, es: Post): Issue[] {
  const issues: Issue[] = [];
  const add = (line: number, level: Level, message: string): void => {
    issues.push({ file: es.file, line, level, message });
  };

  for (const field of PARITY_FIELDS) {
    if (JSON.stringify(en.frontmatter[field]) !== JSON.stringify(es.frontmatter[field]))
      add(1, 'error', `\`${field}\` differs from EN: ${JSON.stringify(en.frontmatter[field])} vs ${JSON.stringify(es.frontmatter[field])}`);
  }

  const levels = (post: Post): string => post.headings.map(heading => heading.level).join(',');

  if (levels(en) !== levels(es))
    add(1, 'warn', `Heading structure differs from EN (EN: ${en.headings.length} headings, ES: ${es.headings.length})`);

  if (en.codeBlocks.length !== es.codeBlocks.length) {
    add(1, 'error', `EN has ${en.codeBlocks.length} code blocks, ES has ${es.codeBlocks.length}`);
  }
  else {
    en.codeBlocks.forEach((enBlock, index) => {
      const esBlock = es.codeBlocks[index]!;

      if (enBlock.lang !== esBlock.lang)
        add(esBlock.line, 'error', `Code block language differs from EN (${enBlock.lang} vs ${esBlock.lang})`);
      else if (stripComments(enBlock).join('\n') !== stripComments(esBlock).join('\n'))
        add(esBlock.line, 'warn', `Code differs from EN block at line ${enBlock.line}`);

      if (esBlock.generated)
        return;

      const enComments = new Set(comments(enBlock));

      for (const comment of comments(esBlock)) {
        if (enComments.has(comment))
          add(esBlock.line, 'warn', `Comment not translated: ${comment}`);
      }
    });
  }

  const enUrls = externalUrls(en);
  const esUrls = externalUrls(es);

  for (const url of enUrls) {
    if (!esUrls.has(url))
      add(1, 'warn', `ES is missing the link ${url}`);
  }
  for (const url of esUrls) {
    if (!enUrls.has(url))
      add(1, 'warn', `ES links to ${url}, EN does not`);
  }

  return issues;
}
