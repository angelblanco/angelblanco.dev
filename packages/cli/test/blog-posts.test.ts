import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { allSlugs, BLOG_DIRS, checkSlugs, resolveSlug } from '../src/blog/posts.ts';

const post = `---
title: A valid blog post
description: A valid description for a blog post that is long enough to be shown in search results and social cards without being cut off by any of them today.
tags: [test]
date: 2026-11-05
---

## Intro
`;

let root: string;

function write(file: string, content = post): void {
  mkdirSync(dirname(join(root, file)), { recursive: true });
  writeFileSync(join(root, file), content);
}

beforeEach(() => {
  root = mkdtempSync(join(tmpdir(), 'cli-blog-'));
  write(`${BLOG_DIRS.en}/0001.hello.md`);
  write(`${BLOG_DIRS.es}/0001.hello.md`);
  write(`${BLOG_DIRS.en}/0002.only-english.md`);
});

afterEach(() => rmSync(root, { recursive: true, force: true }));

describe('blog posts', () => {
  it('lists slugs from both languages', () => {
    expect(allSlugs(root)).toEqual(['0001.hello', '0002.only-english']);
  });

  it('resolves a slug from a route, a number, a file name or a path', () => {
    expect(resolveSlug(root, 'hello')).toBe('0001.hello');
    expect(resolveSlug(root, '0001.hello')).toBe('0001.hello');
    expect(resolveSlug(root, '0001')).toBe('0001.hello');
    expect(resolveSlug(root, `${BLOG_DIRS.es}/0001.hello.md`)).toBe('0001.hello');
    expect(() => resolveSlug(root, 'nope')).toThrow('No blog post matches "nope"');
  });

  it('checks pairs and reports a missing translation', () => {
    const { posts, issues } = checkSlugs(root, ['0001.hello', '0002.only-english']);

    expect(posts).toHaveLength(3);
    expect(issues).toEqual([
      {
        file: `${BLOG_DIRS.es}/0002.only-english.md`,
        line: 1,
        level: 'error',
        message: 'Missing Spanish version',
      },
    ]);
  });

  it('resolves automd sources relative to the post', () => {
    write(`${BLOG_DIRS.en}/0001.hello.md`, `${post}\n<!-- automd:file src="../../public/x.sh" -->\n<!-- /automd -->\n`);

    expect(checkSlugs(root, ['0001.hello']).issues[0]!.message).toBe('automd source not found: ../../public/x.sh');

    write('apps/angelblanco.dev/public/x.sh', 'echo hi');

    expect(checkSlugs(root, ['0001.hello']).issues).toEqual([]);
  });
});
