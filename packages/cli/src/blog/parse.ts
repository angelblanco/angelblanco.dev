import { parse as parseYaml } from 'yaml';

export type Lang = 'en' | 'es';

export interface Heading {
  line: number;
  level: number;
  text: string;
}

export interface CodeBlock {
  line: number;
  lang: string;
  content: string[];
  generated: boolean;
}

export interface Link {
  line: number;
  text: string;
  url: string;
  image: boolean;
}

export interface AutomdBlock {
  line: number;
  src?: string;
  closed: boolean;
}

export interface Post {
  file: string;
  lang: Lang;
  slug: string;
  frontmatter: Record<string, unknown>;
  frontmatterError?: string;
  headings: Heading[];
  codeBlocks: CodeBlock[];
  links: Link[];
  automd: AutomdBlock[];
}

const FENCE_RE = /^\s*(`{3,}|~{3,})\s*([\w+-]*)/;
const HEADING_RE = /^(#{1,6})\s(.*)$/;
const LINK_RE = /(!?)\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
const AUTOMD_OPEN_RE = /<!--\s*automd:[a-z]+(\s[^>]*)?>/i;
const AUTOMD_CLOSE_RE = /<!--\s*\/automd\s*-->/;
const SRC_RE = /src="([^"]+)"/;

export function slugOf(file: string): string {
  return file.split('/').pop()!.replace(/\.md$/, '');
}

export function parsePost(file: string, lang: Lang, source: string): Post {
  const lines = source.split(/\r?\n/);
  const post: Post = {
    file,
    lang,
    slug: slugOf(file),
    frontmatter: {},
    headings: [],
    codeBlocks: [],
    links: [],
    automd: [],
  };

  let start = 0;

  if (lines[0] === '---') {
    const end = lines.indexOf('---', 1);

    if (end > 0) {
      try {
        post.frontmatter = (parseYaml(lines.slice(1, end).join('\n')) ?? {}) as Record<string, unknown>;
      }
      catch (error) {
        post.frontmatterError = (error as Error).message;
      }
      start = end + 1;
    }
  }

  let fence: { marker: string; block: CodeBlock } | undefined;
  let automd: AutomdBlock | undefined;

  for (let index = start; index < lines.length; index++) {
    const text = lines[index]!;
    const line = index + 1;

    if (fence) {
      if (text.trim().startsWith(fence.marker) && text.trim().replace(/[`~]/g, '') === '')
        fence = undefined;
      else
        fence.block.content.push(text);
      continue;
    }

    const fenceMatch = FENCE_RE.exec(text);

    if (fenceMatch) {
      const block: CodeBlock = {
        line,
        lang: fenceMatch[2]!,
        content: [],
        generated: !!automd,
      };

      post.codeBlocks.push(block);
      fence = { marker: fenceMatch[1]!, block };
      continue;
    }

    const automdOpen = AUTOMD_OPEN_RE.exec(text);

    if (automdOpen) {
      automd = { line, src: SRC_RE.exec(automdOpen[1] ?? '')?.[1], closed: false };
      post.automd.push(automd);
      continue;
    }

    if (AUTOMD_CLOSE_RE.test(text)) {
      if (automd)
        automd.closed = true;
      automd = undefined;
      continue;
    }

    const heading = HEADING_RE.exec(text);

    if (heading) {
      post.headings.push({
        line,
        level: heading[1]!.length,
        text: heading[2]!.replace(/\s#+\s*$/, '').trim(),
      });
      continue;
    }

    for (const match of text.replace(/`[^`]*`/g, m => ' '.repeat(m.length)).matchAll(LINK_RE)) {
      post.links.push({
        line,
        image: match[1] === '!',
        text: match[2]!,
        url: match[3]!,
      });
    }
  }

  return post;
}

export function headingAnchor(text: string): string {
  return text
    .replace(/`/g, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-');
}
