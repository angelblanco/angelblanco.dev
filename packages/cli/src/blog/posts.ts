import type { Issue } from './check.ts';
import type { Lang, Post } from './parse.ts';
import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { checkPair, checkPost, routeOf } from './check.ts';
import { parsePost, slugOf } from './parse.ts';

export const CONTENT_DIR = 'apps/angelblanco.dev/content';
export const BLOG_DIRS: Record<Lang, string> = { en: `${CONTENT_DIR}/blog`, es: `${CONTENT_DIR}/es/blog` };

function git(root: string, args: string[]): string[] {
  try {
    return execFileSync('git', args, {
      cwd: root,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).split('\n').filter(Boolean);
  }
  catch {
    return [];
  }
}

export function allSlugs(root: string): string[] {
  const slugs = new Set<string>();

  for (const dir of Object.values(BLOG_DIRS)) {
    if (existsSync(join(root, dir)))
      readdirSync(join(root, dir)).filter(file => file.endsWith('.md')).forEach(file => slugs.add(slugOf(file)));
  }

  return [...slugs].sort();
}

export function changedSlugs(root: string, base = 'master'): string[] {
  const files = [
    ...git(root, ['diff', '--name-only', `${base}...HEAD`]),
    ...git(root, ['diff', '--name-only', 'HEAD']),
    ...git(root, ['ls-files', '--others', '--exclude-standard']),
  ];
  const blogFile = /^apps\/angelblanco\.dev\/content\/(?:es\/)?blog\/[^/]+\.md$/;

  return [
    ...new Set(files.filter(file => blogFile.test(file)).map(slugOf)),
  ].sort();
}

export function resolveSlug(root: string, input: string): string {
  const slug = slugOf(input);
  const match = allSlugs(root).find(candidate => [
    candidate,
    routeOf(candidate),
    candidate.split('.')[0],
  ].includes(slug));

  if (!match)
    throw new Error(`No blog post matches "${input}"`);

  return match;
}

function loadPost(root: string, lang: Lang, slug: string): Post | undefined {
  const file = `${BLOG_DIRS[lang]}/${slug}.md`;

  return existsSync(join(root, file))
    ? parsePost(file, lang, readFileSync(join(root, file), 'utf8'))
    : undefined;
}

export interface Report {
  posts: Post[];
  issues: Issue[];
}

export function checkSlugs(root: string, slugs: string[]): Report {
  const routes = new Set(allSlugs(root).map(routeOf));
  const context = {
    slugs: routes,
    fileExists: (post: Post, src: string): boolean => existsSync(resolve(root, dirname(post.file), src)),
  };
  const posts: Post[] = [];
  const issues: Issue[] = [];

  for (const slug of slugs) {
    const en = loadPost(root, 'en', slug);
    const es = loadPost(root, 'es', slug);

    for (const post of [en, es]) {
      if (post) {
        posts.push(post);
        issues.push(...checkPost(post, context));
      }
    }

    if (en && es) {
      issues.push(...checkPair(en, es));
    }
    else {
      issues.push({
        file: `${en ? BLOG_DIRS.es : BLOG_DIRS.en}/${slug}.md`,
        line: 1,
        level: 'error',
        message: `Missing ${en ? 'Spanish' : 'English'} version`,
      });
    }
  }

  return { posts, issues };
}
