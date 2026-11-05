import type { MinimarkTree } from '@nuxt/content';
import type { FeedPost } from '../../../server/utils/feed';
import { describe, expect, it } from 'vitest';
import { absoluteUrl, buildBlogFeed, renderMinimarkToHtml } from '../../../server/utils/feed';
import { feedPath, feedRoutes } from '../../../shared/utils/feeds';

const siteUrl = 'https://angelblanco.dev';

const context = {
  siteUrl,
  pageUrl: 'https://angelblanco.dev/blog/hello/',
};

function tree(...value: MinimarkTree['value']): MinimarkTree {
  return { type: 'minimark', value };
}

const posts: FeedPost[] = [
  {
    title: 'Hello world post',
    path: '/blog/hello',
    date: '2025-05-05',
    tags: ['nuxt'],
    body: tree([
      'p',
      {},
      'Hello ',
      ['strong', {}, 'world'],
    ]),
  },
  {
    title: 'Install Node.js 26',
    path: '/blog/install-node-26',
    date: '2026-11-05',
    updatedAt: '2026-11-06',
    description: 'Install Node.js with apt',
    tags: ['nodejs', 'ubuntu'],
  },
];

describe('feed paths', () => {
  it('should keep the default locale at the root', () => {
    expect(feedPath('en', 'rss')).toBe('/feed.xml');
    expect(feedPath('es', 'atom')).toBe('/es/atom.xml');
  });

  it('should list every feed route to prerender', () => {
    expect(feedRoutes()).toEqual([
      '/feed.xml',
      '/atom.xml',
      '/es/feed.xml',
      '/es/atom.xml',
    ]);
  });
});

describe('absoluteUrl', () => {
  it('should resolve internal pages with a trailing slash', () => {
    expect(absoluteUrl('/blog/install-node-24', context)).toBe('https://angelblanco.dev/blog/install-node-24/');
    expect(absoluteUrl('/blog/hello#intro', context)).toBe('https://angelblanco.dev/blog/hello/#intro');
  });

  it('should resolve anchors against the post url', () => {
    expect(absoluteUrl('#support', context)).toBe('https://angelblanco.dev/blog/hello/#support');
  });

  it('should keep files and external urls untouched', () => {
    expect(absoluteUrl('/images/cover.webp', context)).toBe('https://angelblanco.dev/images/cover.webp');
    expect(absoluteUrl('https://nodejs.org/en', context)).toBe('https://nodejs.org/en');
  });
});

describe('renderMinimarkToHtml', () => {
  it('should render elements, escape text and absolutize links', () => {
    const html = renderMinimarkToHtml(tree(
      [
        'h2',
        { id: 'intro' },
        'Intro',
      ],
      [
        'p',
        {},
        'a < b & ',
        [
          'a',
          { href: '/blog/other' },
          'other',
        ],
      ],
      [
        'img',
        { src: '/cover.png', alt: 'Cover "image"' },
      ],
    ), context);

    expect(html).toBe(
      '<h2 id="intro">Intro</h2>'
      + '<p>a &lt; b &amp; <a href="https://angelblanco.dev/blog/other/">other</a></p>'
      + '<img src="https://angelblanco.dev/cover.png" alt="Cover &quot;image&quot;">',
    );
  });

  it('should render code blocks as plain escaped code', () => {
    const html = renderMinimarkToHtml(tree(
      [
        'pre',
        {
          language: 'bash',
          code: 'echo "<ok>"\n',
          className: 'shiki',
          style: '',
        },
        [
          'code',
          { __ignoreMap: '' },
          [
            'span',
            { class: 'line' },
            'echo',
          ],
        ],
      ],
      [
        'p',
        {},
        ['code', {}, 'pnpm'],
      ],
    ), context);

    expect(html).toBe('<pre><code class="language-bash">echo &quot;&lt;ok&gt;&quot;</code></pre><p><code>pnpm</code></p>');
  });

  it('should drop styles and unsafe attributes', () => {
    const html = renderMinimarkToHtml(tree(
      [
        'p',
        {
          style: 'color: red',
          onclick: 'alert(1)',
          className: ['a', 'b'],
        },
        'Text',
      ],
      ['style', {}, '.x{}'],
    ), context);

    expect(html).toBe('<p class="a b">Text</p>');
  });

  it('should render known components and unwrap unknown ones', () => {
    const html = renderMinimarkToHtml(tree(
      [
        'github-repo-preview',
        { repo: 'angelblanco/eslint-config', description: 'ESLint config' },
      ],
      [
        'custom-box',
        {},
        ['p', {}, 'Inside'],
      ],
    ), context);

    expect(html).toBe(
      '<p><a href="https://github.com/angelblanco/eslint-config">github.com/angelblanco/eslint-config</a> · ESLint config</p>'
      + '<p>Inside</p>',
    );
  });
});

describe('buildBlogFeed', () => {
  const feed = buildBlogFeed({ locale: 'en', siteUrl: `${siteUrl}/`, posts });

  it('should sort posts by publication date', () => {
    expect(feed.items.map(item => item.title)).toEqual(['Install Node.js 26', 'Hello world post']);
  });

  it('should build each item from the post', () => {
    const [latest, oldest] = feed.items;

    expect(latest).toMatchObject({
      link: 'https://angelblanco.dev/blog/install-node-26/',
      published: new Date('2026-11-05'),
      date: new Date('2026-11-06'),
      description: 'Install Node.js with apt',
      category: [
        { name: 'nodejs', term: 'nodejs' },
        { name: 'ubuntu', term: 'ubuntu' },
      ],
      author: [
        { name: 'Ángel Blanco', link: 'https://angelblanco.dev/about/' },
      ],
    });
    expect(latest?.content).toBeUndefined();
    expect(oldest?.date).toEqual(new Date('2025-05-05'));
    expect(oldest?.content).toBe('<p>Hello <strong>world</strong></p>');
  });

  it('should render a valid rss 2.0 document', () => {
    const rss = feed.rss2();

    expect(rss).toMatch(/^<\?xml version="1.0" encoding="utf-8"\?>\s*<rss version="2.0"/);
    expect(rss).toContain('<link>https://angelblanco.dev/blog/</link>');
    expect(rss).toContain('<language>en-US</language>');
    expect(rss).toContain('<atom:link href="https://angelblanco.dev/feed.xml" rel="self" type="application/rss+xml"/>');
    expect(rss).toContain('<guid isPermaLink="true">https://angelblanco.dev/blog/install-node-26/</guid>');
    expect(rss).toContain('<pubDate>Thu, 05 Nov 2026 00:00:00 GMT</pubDate>');
    expect(rss).toContain('<lastBuildDate>Fri, 06 Nov 2026 00:00:00 GMT</lastBuildDate>');
    expect(rss).toContain('<category>nodejs</category>');
    expect(rss).toContain('<content:encoded><![CDATA[<p>Hello <strong>world</strong></p>]]></content:encoded>');
  });

  it('should render a valid atom 1.0 document', () => {
    const atom = feed.atom1();

    expect(atom).toContain('<feed xmlns="http://www.w3.org/2005/Atom">');
    expect(atom).toContain('<id>https://angelblanco.dev/blog/</id>');
    expect(atom).toContain('<link rel="self" href="https://angelblanco.dev/atom.xml"/>');
    expect(atom).toContain('<published>2026-11-05T00:00:00.000Z</published>');
    expect(atom).toContain('<updated>2026-11-06T00:00:00.000Z</updated>');
    expect(atom).toContain('<category label="nodejs" term="nodejs"/>');
  });

  it('should localize the spanish feed', () => {
    const rss = buildBlogFeed({
      locale: 'es',
      siteUrl,
      posts: [
        { ...posts[0]!, path: '/es/blog/hello' },
      ],
    }).rss2();

    expect(rss).toContain('<link>https://angelblanco.dev/es/blog/</link>');
    expect(rss).toContain('<language>es-ES</language>');
    expect(rss).toContain('<atom:link href="https://angelblanco.dev/es/feed.xml" rel="self" type="application/rss+xml"/>');
    expect(rss).toContain('<link>https://angelblanco.dev/es/blog/hello/</link>');
  });
});
