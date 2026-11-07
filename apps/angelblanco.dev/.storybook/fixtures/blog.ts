import type { Toc } from '@nuxt/content';
import type { BlogCollectionItem, BlogPostSummary } from '~/composables/useBlog';
import type { TagCount } from '~/utils/tagCounts';
import { tagCounts } from '~/utils/tagCounts';

export const flatTocFixture: Toc = {
  title: '',
  searchDepth: 2,
  depth: 2,
  links: [
    { id: 'support-dates-at-a-glance', depth: 2, text: 'Support dates at a glance' },
    { id: 'whats-new-in-php-85', depth: 2, text: 'What\'s new in PHP 8.5' },
    { id: 'what-changed-goodbye-ppa-hello-packagessuryorg', depth: 2, text: 'What changed: goodbye PPA, hello packages.sury.org' },
    { id: 'the-easy-way', depth: 2, text: 'The easy way' },
    { id: 'the-step-by-step-guide', depth: 2, text: 'The step-by-step guide' },
    { id: 'what-about-other-php-versions', depth: 2, text: 'What about other PHP versions?' },
    { id: 'the-script', depth: 2, text: 'The script' },
    { id: 'keep-everything-up-to-date', depth: 2, text: 'Keep everything up to date' },
  ],
};

export const tocFixture: Toc = {
  ...flatTocFixture,
  links: flatTocFixture.links.map(link => link.id !== 'the-step-by-step-guide'
    ? link
    : {
        ...link,
        children: [
          { id: '_1-install-the-prerequisites', depth: 3, text: '1. Install the prerequisites' },
          { id: '_2-install-the-sury-signing-key', depth: 3, text: '2. Install the Sury signing key' },
          { id: '_3-add-the-sury-repository', depth: 3, text: '3. Add the Sury repository' },
          { id: '_4-install-php-85', depth: 3, text: '4. Install PHP 8.5' },
          { id: '_5-make-php-85-the-default', depth: 3, text: '5. Make PHP 8.5 the default' },
          { id: '_6-install-composer', depth: 3, text: '6. Install Composer' },
        ],
      }),
};

export const emptyTocFixture: Toc = { ...flatTocFixture, links: [] };

export const realBlogPostSummaries: BlogPostSummary[] = [
  {
    id: 'blog_en/blog/0005.apt-install-php-85-on-ubuntu-26.md',
    path: '/blog/apt-install-php-85-on-ubuntu-26',
    title: 'Install PHP 8.5 with apt on Ubuntu 26.04',
    description: 'Install PHP 8.5 and Composer on Ubuntu 26.04 LTS with apt from Ondřej Surý\'s packages.sury.org repository, and keep them patched with apt upgrade.',
    date: '2026-11-06',
    readingTime: 11,
    tags: [
      'php',
      'ubuntu',
      'apt',
      'composer',
      'bash',
      'script',
    ],
  },
  {
    id: 'blog_en/blog/0004.apt-install-node-26-on-ubuntu-26.md',
    path: '/blog/apt-install-node-26-on-ubuntu-26',
    title: 'Install Node.js 26 with apt on Ubuntu 26.04',
    description: 'On October 21, 2026, Node.js released security patches for ten vulnerabilities affecting its supported versions, four of them rated high, including a remote code execution issue. Unsupported versions, such as Node.js 20 and 25, won\'t be updated.',
    date: '2026-11-05',
    readingTime: 7,
    tags: [
      'nodejs',
      'ubuntu',
      'apt',
      'javascript',
      'bash',
      'script',
    ],
  },
  {
    id: 'blog_en/blog/0003.create-your-eslint-config.md',
    path: '/blog/create-your-eslint-config',
    title: 'Create your own ESLint config and share it across projects',
    description: 'If you\'ve ever worked on multiple projects, you know the pain of copying ESLint configurations between repositories. Every time you set up a new project, you either start from scratch or copy the eslint.config.js file from your last one. There\'s a better way: publish your own shareable ESLint config package.',
    date: '2025-11-02',
    readingTime: 3,
    tags: [
      'eslint',
      'typescript',
      'vue',
      'tooling',
      'npm',
    ],
  },
  {
    id: 'blog_en/blog/0002.install-node-24-on-ubuntu-24.md',
    path: '/blog/install-node-24-on-ubuntu-24',
    title: 'Install Node.js 24 on Ubuntu 24.04',
    description: 'Getting Node.js 24 running on Ubuntu 24 should be a straightforward process. While Ubuntu comes with a version of Node.js in its default repositories, you might want to use Node.js 24, which became LTS on October 28, 2025 and is supported until April 2028. For a new setup, install Node.js 26 on Ubuntu 26.04 instead. This guide offers two simple methods to get you set up quickly.',
    date: '2025-10-12',
    readingTime: 6,
    tags: [
      'nodejs',
      'ubuntu',
      'javascript',
      'bash',
      'script',
    ],
  },
  {
    id: 'blog_en/blog/0001.hello.md',
    path: '/blog/hello',
    title: 'From Svelte to Nuxt: Rebuilding my portfolio in 2025',
    description: 'It\'s 2025, and I\'ve just rolled out a complete rebuild of my personal website. I\'ve migrated from a Svelte and Sapper stack to Nuxt, Tailwind CSS and a Turborepo monorepo. It wasn\'t a cosmetic update but a full rewrite, driven by five years of changes in the frontend landscape and by the wish to use the same tools at home as at work.',
    date: '2025-09-27',
    readingTime: 4,
    tags: [
      'nuxt',
      'vue',
      'svelte',
      'turborepo',
      'tailwindcss',
      'daisyui',
    ],
  },
];

export const blogTagCounts: TagCount[] = tagCounts(realBlogPostSummaries);

export const homeBlogPosts: BlogPostSummary[] = [
  ...realBlogPostSummaries,
  ...realBlogPostSummaries.slice(1).map(post => ({ ...post, id: `${post.id}-clone` })),
];

export const postFixture = {
  ...realBlogPostSummaries[0],
  stem: 'blog/0005.apt-install-php-85-on-ubuntu-26',
  extension: 'md',
  meta: {},
  navigation: true,
  seo: {
    title: 'Install PHP 8.5 with apt on Ubuntu 26.04',
    description: 'Install PHP 8.5 and Composer on Ubuntu 26.04 LTS with apt from Ondřej Surý\'s packages.sury.org repository, and keep them patched with apt upgrade.',
  },
  body: { type: 'minimark', value: [], toc: tocFixture },
} as unknown as BlogCollectionItem;
