import type { CheckContext } from '../src/blog/check.ts';
import { describe, expect, it } from 'vitest';
import { checkPair, checkPost, routeOf } from '../src/blog/check.ts';
import { headingAnchor, parsePost } from '../src/blog/parse.ts';

const frontmatter = `---
title: Install Node.js with apt
tags:
  - nodejs
date: 2026-11-05
---
`;

const context: CheckContext = {
  slugs: new Set(['hello', 'install-node']),
  fileExists: () => true,
};

function en(body: string, head = frontmatter) {
  return parsePost('content/blog/0002.install-node.md', 'en', `${head}${body}`);
}

function es(body: string, head = frontmatter) {
  return parsePost('content/es/blog/0002.install-node.md', 'es', `${head}${body}`);
}

function messages(issues: { message: string }[]): string[] {
  return issues.map(issue => issue.message);
}

describe('parsePost', () => {
  it('reads frontmatter, headings, code blocks and links with their line numbers', () => {
    const post = en('\n## Setup\n\nSee [Node.js](https://nodejs.org/).\n\n```bash\n# Update\nsudo apt update\n```\n');

    expect(post.frontmatter.tags).toEqual(['nodejs']);
    expect(post.headings).toEqual([
      { line: 8, level: 2, text: 'Setup' },
    ]);
    expect(post.links).toEqual([
      {
        line: 10,
        image: false,
        text: 'Node.js',
        url: 'https://nodejs.org/',
      },
    ]);
    expect(post.codeBlocks).toEqual([
      {
        line: 12,
        lang: 'bash',
        content: ['# Update', 'sudo apt update'],
        generated: false,
      },
    ]);
  });

  it('ignores headings and links inside code and marks automd blocks as generated', () => {
    const post = en('<!-- automd:file src="../../public/x.sh" code lang="bash" -->\n```bash\n# [x](https://a.dev)\n```\n<!-- /automd -->\n`[y](https://b.dev)`\n');

    expect(post.headings).toEqual([]);
    expect(post.links).toEqual([]);
    expect(post.codeBlocks[0]!.generated).toBe(true);
    expect(post.automd).toEqual([
      { line: 7, src: '../../public/x.sh', closed: true },
    ]);
  });

  it('builds heading anchors like Nuxt Content', () => {
    expect(headingAnchor('What about Yarn?')).toBe('what-about-yarn');
    expect(headingAnchor('¿Y Yarn?')).toBe('y-yarn');
    expect(headingAnchor('Configure `npm` prefix')).toBe('configure-npm-prefix');
  });
});

describe('checkPost', () => {
  it('passes a valid post', () => {
    expect(checkPost(en('\n## The easy way\n\n```bash\nls\n```\n'), context)).toEqual([]);
  });

  it('validates the frontmatter schema', () => {
    const post = en('', '---\ntitle: Short\ntags: []\ndate: 05/11/2026\ntoc: yes\n---\n');

    expect(messages(checkPost(post, context))).toEqual([
      '`title` must be a string of at least 10 characters',
      '`tags` must have at least one tag',
      '`date` must be YYYY-MM-DD',
      '`toc` must be a boolean',
    ]);
  });

  it('flags H1, Title Case and skipped heading levels', () => {
    const post = en('\n# Title\n## The Easy Way To Install\n#### Deep\n## Enable Corepack (for Yarn and pnpm)\n');

    expect(messages(checkPost(post, context))).toEqual([
      'Do not use H1 in the body, the title comes from the frontmatter',
      'Heading looks like Title Case, use sentence case: "The Easy Way To Install"',
      'Heading jumps from H2 to H4',
    ]);
  });

  it('flags posts whose first section skips H2', () => {
    const post = en('\n### The easy way\n\n#### 1. Install Node.js\n');

    expect(messages(checkPost(post, context))).toEqual([
      'Heading jumps from H1 to H3',
    ]);
  });

  it('flags code fences without language, images without alt and vague link text', () => {
    const post = en('\n```\nls\n```\n\n![](/a.png)\n\nRead it [here](https://a.dev).\n');

    expect(messages(checkPost(post, context))).toEqual([
      'Code fence has no language identifier',
      'Image has no alt text: /a.png',
      'Link text "here" does not describe its target',
    ]);
  });

  it('validates internal links, anchors and automd sources', () => {
    const post = es('\n## El script\n\n[a](/blog/hello/) [b](/es/blog/0002.install-node/) [c](#el-script) [d](#missing) [e](/es/blog/hello#el-script) [f](/es/blog/hello/#el-script)\n\n<!-- automd:file src="../x.sh" -->\n', frontmatter);
    const issues = checkPost(post, {
      ...context,
      fileExists: () => false,
    });

    expect(messages(issues)).toEqual([
      'automd block has no closing `<!-- /automd -->`',
      'automd source not found: ../x.sh',
      'ES posts must link to /es/blog/…, got /blog/hello/',
      'No post with route 0002.install-node (drop the numeric prefix of the file name)',
      'No heading matches anchor #missing',
      'Internal links need a trailing slash: /es/blog/hello#el-script',
    ]);
  });

  it('strips the numeric prefix to build routes', () => {
    expect(routeOf('0004.apt-install-node-26')).toBe('apt-install-node-26');
  });
});

describe('checkPair', () => {
  it('passes a translated pair', () => {
    const issues = checkPair(
      en('## Install\n\n[docs](https://nodejs.org/en/docs)\n\n```bash\n# Update packages\nsudo apt update\n```\n'),
      es('## Instalar\n\n[docs](https://nodejs.org/es/docs)\n\n```bash\n# Actualizar paquetes\nsudo apt update\n```\n'),
    );

    expect(issues).toEqual([]);
  });

  it('flags frontmatter drift, missing code, and untranslated comments', () => {
    const issues = checkPair(
      en('## A\n## B\n\n```bash\n# Update\nsudo apt update\n```\n\n```bash\nls\n```\n'),
      es('## A\n\n```bash\n# Update\nsudo apt update\n```\n', frontmatter.replace('2026-11-05', '2026-11-06')),
    );

    expect(messages(issues)).toEqual([
      '`date` differs from EN: "2026-11-05" vs "2026-11-06"',
      'Heading structure differs from EN (EN: 2 headings, ES: 1)',
      'EN has 2 code blocks, ES has 1',
    ]);

    expect(messages(checkPair(en('```bash\n# Update\nls\n```\n'), es('```bash\n# Update\nls -la\n```\n')))).toEqual([
      'Code differs from EN block at line 7',
      'Comment not translated: # Update',
    ]);
  });

  it('keeps English comments in automd blocks', () => {
    const block = '<!-- automd:file src="x.sh" -->\n```bash\n# Update\n```\n<!-- /automd -->\n';

    expect(checkPair(en(block), es(block))).toEqual([]);
  });

  it('flags external links present in only one language', () => {
    expect(messages(checkPair(en('[a](https://a.dev)\n'), es('[b](https://b.dev)\n')))).toEqual([
      'ES is missing the link https://a.dev',
      'ES links to https://b.dev, EN does not',
    ]);
  });
});
