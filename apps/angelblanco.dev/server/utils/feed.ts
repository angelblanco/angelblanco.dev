import type { MinimarkElement, MinimarkNode, MinimarkTree } from '@nuxt/content';
import type { FeedLocale } from '../../shared/utils/feeds';
import { Feed } from 'feed';
import useContentLicense from '../../app/composables/useContentLicense';
import { feedPath } from '../../shared/utils/feeds';

export interface FeedPost {
  title: string;
  path: string;
  date: string;
  updatedAt?: string;
  description?: string;
  tags: string[];
  body?: MinimarkTree;
}

interface FeedMeta {
  language: string;
  title: string;
  description: string;
}

const feedMeta: Record<FeedLocale, FeedMeta> = {
  en: {
    language: 'en-US',
    title: 'Ángel Blanco · Blog',
    description: 'Latest blog entries of the full-stack engineering blog',
  },
  es: {
    language: 'es-ES',
    title: 'Ángel Blanco · Blog',
    description: 'Últimas entradas del blog de ingeniería informática full-stack',
  },
};

const authorName = 'Ángel Blanco';

const voidTags = new Set([
  'br',
  'hr',
  'img',
  'input',
  'source',
  'wbr',
]);

const droppedTags = new Set(['script', 'style', 'template']);

const urlAttributes = new Set(['href', 'src']);

const allowedAttributes = new Set([
  'align',
  'alt',
  'checked',
  'class',
  'colspan',
  'disabled',
  'height',
  'href',
  'id',
  'lang',
  'rowspan',
  'src',
  'start',
  'title',
  'type',
  'width',
]);

interface RenderContext {
  siteUrl: string;
  pageUrl: string;
}

type ComponentRenderer = (props: Record<string, unknown>, context: RenderContext) => string;

const componentRenderers: Record<string, ComponentRenderer> = {
  'github-repo-preview': ({ repo, description }) => {
    const url = `https://github.com/${String(repo)}`;
    const summary = description
      ? ` · ${escapeHtml(String(description))}`
      : '';

    return `<p><a href="${escapeHtml(url)}">github.com/${escapeHtml(String(repo))}</a>${summary}</p>`;
  },
};

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

export function absoluteUrl(url: string, { siteUrl, pageUrl }: RenderContext): string {
  const resolved = new URL(url, pageUrl);
  const isInternalPage = resolved.origin === new URL(siteUrl).origin
    && !resolved.pathname.endsWith('/')
    && !/\.\w+$/.test(resolved.pathname);

  if (isInternalPage)
    resolved.pathname = `${resolved.pathname}/`;

  return resolved.toString();
}

function textContent(node: MinimarkNode): string {
  if (typeof node === 'string')
    return node;

  return node.slice(2).map(child => textContent(child as MinimarkNode)).join('');
}

function renderAttributes(props: Record<string, unknown>, context: RenderContext): string {
  return Object.entries(props)
    .map(([key, value]) => [
      key === 'className'
        ? 'class'
        : key,
      value,
    ] as const)
    .filter(([key, value]) => allowedAttributes.has(key) && value !== false && value !== null && value !== undefined)
    .map(([key, value]) => {
      if (value === true)
        return ` ${key}`;

      const text = Array.isArray(value)
        ? value.join(' ')
        : String(value);

      return ` ${key}="${escapeHtml(urlAttributes.has(key)
        ? absoluteUrl(text, context)
        : text)}"`;
    })
    .join('');
}

function renderPre(element: MinimarkElement): string {
  const [, props, ...children] = element;
  const code = typeof props.code === 'string'
    ? props.code
    : children.map(textContent).join('');
  const language = typeof props.language === 'string'
    ? ` class="language-${escapeHtml(props.language)}"`
    : '';

  return `<pre><code${language}>${escapeHtml(code.trimEnd())}</code></pre>`;
}

function renderNode(node: MinimarkNode, context: RenderContext): string {
  if (typeof node === 'string')
    return escapeHtml(node);

  const [tag, props, ...children] = node;
  const component = componentRenderers[tag];

  if (component)
    return component(props, context);

  if (droppedTags.has(tag))
    return '';

  if (tag === 'pre')
    return renderPre(node);

  const content = children.map(child => renderNode(child as MinimarkNode, context)).join('');

  if (!/^[a-z][a-z0-9]*$/.test(tag))
    return content;

  if (voidTags.has(tag))
    return `<${tag}${renderAttributes(props, context)}>`;

  return `<${tag}${renderAttributes(props, context)}>${content}</${tag}>`;
}

export function renderMinimarkToHtml(tree: MinimarkTree, context: RenderContext): string {
  return tree.value.map(node => renderNode(node, context)).join('');
}

function localeHomeUrl(siteUrl: string, locale: FeedLocale): string {
  return locale === 'en'
    ? `${siteUrl}/`
    : `${siteUrl}/${locale}/`;
}

export function buildBlogFeed({ locale, siteUrl, posts }: {
  locale: FeedLocale;
  siteUrl: string;
  posts: FeedPost[];
}): Feed {
  const site = siteUrl.replace(/\/+$/, '');
  const meta = feedMeta[locale];
  const homeUrl = localeHomeUrl(site, locale);
  const blogUrl = `${homeUrl}blog/`;
  const author = { name: authorName, link: `${homeUrl}about/` };
  const license = useContentLicense();
  const entries = posts
    .map(post => ({
      post,
      published: new Date(post.date),
      updated: new Date(post.updatedAt ?? post.date),
    }))
    .toSorted((a, b) => b.published.getTime() - a.published.getTime());
  const lastUpdate = entries.reduce<Date | undefined>(
    (latest, { updated }) => !latest || updated > latest
      ? updated
      : latest,
    undefined,
  );

  const feed = new Feed({
    id: blogUrl,
    link: blogUrl,
    title: meta.title,
    description: meta.description,
    language: meta.language,
    updated: lastUpdate ?? new Date(0),
    generator: false,
    favicon: `${site}/favicon.ico`,
    image: `${site}/android-chrome-512x512.png`,
    copyright: `${license.name} ${license.url} © ${authorName}`,
    author,
    feedLinks: {
      rss: `${site}${feedPath(locale, 'rss')}`,
      atom: `${site}${feedPath(locale, 'atom')}`,
    },
  });

  for (const { post, published, updated } of entries) {
    const link = absoluteUrl(post.path, { siteUrl: site, pageUrl: homeUrl });

    feed.addItem({
      title: post.title,
      link,
      date: updated,
      published,
      description: post.description,
      content: post.body
        ? renderMinimarkToHtml(post.body, { siteUrl: site, pageUrl: link })
        : undefined,
      category: post.tags.map(tag => ({ name: tag, term: tag })),
      author: [author],
    });
  }

  return feed;
}
