import { expect, test } from '@playwright/test';
import {
  absoluteUrl,
  expectLocalizedHeadLinks,
  findSchemaNode,
  locales,
  localizedPath,
  readJsonLd,
} from './utils';

const posts = [
  { path: '/blog/hello', datePublished: '2025-09-27', dateModified: '2025-09-27' },
  { path: '/blog/install-node-24-on-ubuntu-24', datePublished: '2025-10-12', dateModified: '2026-11-05' },
];

for (const locale of locales) {
  for (const post of posts) {
    test(`it configures the article seo of ${post.path} on: ${locale.code}`, async ({ page }) => {
      await page.goto(localizedPath(locale, post.path));

      await expectLocalizedHeadLinks(page, locale, post.path);

      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description?.length).toBeGreaterThanOrEqual(140);
      expect(description?.length).toBeLessThanOrEqual(160);

      await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'article');
      await expect(page.locator('meta[property="article:published_time"]')).toHaveAttribute('content', `${post.datePublished}T00:00:00Z`);
      await expect(page.locator('meta[property="article:modified_time"]')).toHaveAttribute('content', `${post.dateModified}T00:00:00Z`);
      await expect(page.locator('meta[name="twitter:label1"]')).toHaveAttribute('content', /.+/);
      await expect(page.locator('meta[name="twitter:data1"]')).toHaveAttribute('content', /\d+ min/);
      await expect(page.locator('meta[property="article:author"]')).toHaveAttribute('content', absoluteUrl(locale, '/about'));
      expect(await page.locator('meta[property="article:tag"]').count()).toBeGreaterThan(0);

      const graph = await readJsonLd(page);
      const title = (await page.locator('h1').textContent())?.trim();
      const blogPosting = findSchemaNode(graph, 'BlogPosting');

      await expect(page.locator('meta[property="og:image:alt"]').first()).toHaveAttribute('content', title!);
      expect(blogPosting).toMatchObject({
        headline: title,
        description,
        datePublished: `${post.datePublished}T00:00:00Z`,
        dateModified: `${post.dateModified}T00:00:00Z`,
        timeRequired: expect.stringMatching(/^PT\d+M$/),
        wordCount: expect.any(Number),
        inLanguage: locale.code === 'en'
          ? 'en-US'
          : 'es-ES',
        author: { '@id': 'https://angelblanco.dev/#identity' },
      });
      expect([blogPosting!.image].flat()).toHaveLength(2);
      expect(findSchemaNode(graph, 'WebPage')).toMatchObject({ description });
      expect(findSchemaNode(graph, 'Person')).toMatchObject({ url: 'https://angelblanco.dev' });
    });
  }

  test(`it configures the blog index seo on: ${locale.code}`, async ({ page }) => {
    await page.goto(localizedPath(locale, '/blog'));

    await expectLocalizedHeadLinks(page, locale, '/blog');
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website');

    const graph = await readJsonLd(page);
    expect(findSchemaNode(graph, 'BlogPosting')).toBeUndefined();
    expect(findSchemaNode(graph, 'CollectionPage')).toBeDefined();
  });

  test(`it links the translations of a tag page on: ${locale.code}`, async ({ page }) => {
    await page.goto(localizedPath(locale, '/blog/tags/nodejs'));

    await expectLocalizedHeadLinks(page, locale, '/blog/tags/nodejs');
    expect(findSchemaNode(await readJsonLd(page), 'CollectionPage')).toBeDefined();
  });
}

test('it adds the lastmod of the posts to the sitemaps', async ({ request }) => {
  for (const [sitemap, prefix] of [
    ['en-US', ''],
    ['es-ES', '/es'],
  ]) {
    const xml = await (await request.get(`/__sitemap__/${sitemap}.xml`)).text();

    for (const post of posts) {
      const url = xml.match(new RegExp(`<url>\\s*<loc>https://angelblanco\\.dev${prefix}${post.path}/</loc>[\\s\\S]*?</url>`));

      expect(url?.[0]).toContain(`<lastmod>${post.dateModified}</lastmod>`);
    }
  }
});
