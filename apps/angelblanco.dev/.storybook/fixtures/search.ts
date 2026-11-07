import type { SearchSection } from '~/utils/searchSections';

export const searchSectionsFixture: SearchSection[] = [
  {
    id: '/blog/apt-install-php-85-on-ubuntu-26#whats-new-in-php-85',
    title: 'What\'s new in PHP 8.5',
    titles: [
      'Install PHP 8.5 with apt on Ubuntu 26.04',
    ],
    content: 'If you\'re coming from PHP 8.4 or older, here are a few reasons to upgrade beyond security. The release announcement has the full list, but my favorites are: The pipe operator, to chain callables from left to right without temporary variables. clone() with properties, which turns the "with-er" pattern for readonly classes into one line. The #[\\NoDiscard] attribute, which warns when someone ignores a return value that matters. A native URI extension, with URL parsing that follows RFC 3986 and WHATWG, no more parse_url() surprises. array_first() and array_last(). Finally. Here\'s the pipe operator turning a title into a slug:',
    level: 2,
  },
  {
    id: '/blog/apt-install-php-85-on-ubuntu-26#the-easy-way',
    title: 'The easy way',
    titles: [
      'Install PHP 8.5 with apt on Ubuntu 26.04',
    ],
    content: 'As usual, you can install everything with a single command. The script adds the Sury repository, installs PHP 8.5 with the most common extensions, makes it the default php, and optionally installs Composer. The script asks for confirmation at each major step. As always, read the script before you pipe it into bash. Trusting random URLs with sudo is a great way to learn about incident response. If you don\'t have curl installed:',
    level: 2,
  },
  {
    id: '/blog/apt-install-php-85-on-ubuntu-26#_1-install-the-prerequisites',
    title: '1. Install the prerequisites',
    titles: [
      'Install PHP 8.5 with apt on Ubuntu 26.04',
      'The step-by-step guide',
    ],
    content: 'PHP doesn\'t need unzip, but Composer uses it to extract packages much faster than its PHP fallback.',
    level: 3,
  },
  {
    id: '/blog/apt-install-php-85-on-ubuntu-26#_5-make-php-85-the-default',
    title: '5. Make PHP 8.5 the default',
    titles: [
      'Install PHP 8.5 with apt on Ubuntu 26.04',
      'The step-by-step guide',
    ],
    content: 'The php command is managed by update-alternatives, so you can choose which version answers to it:',
    level: 3,
  },
  {
    id: '/blog/apt-install-php-85-on-ubuntu-26#_6-install-composer',
    title: '6. Install Composer',
    titles: [
      'Install PHP 8.5 with apt on Ubuntu 26.04',
      'The step-by-step guide',
    ],
    content: 'The official installer publishes a SHA-384 checksum, so verify it before running anything: Using install instead of mv makes root the owner of the binary, which matters because you\'ll run sudo composer self-update later.',
    level: 3,
  },
  {
    id: '/blog/apt-install-node-26-on-ubuntu-26#the-easy-way',
    title: 'The easy way',
    titles: [
      'Install Node.js 26 with apt on Ubuntu 26.04',
    ],
    content: 'As before, you can install everything with a single command. The script installs Node.js 26 from NodeSource, configures a global npm prefix (so you don\'t need sudo for global packages), and can optionally install pnpm and Bun. The script asks for confirmation at each major step. As always, read the script before you pipe it into bash. Running random scripts from the internet is a fun hobby until it isn\'t. If you don\'t have curl installed:',
    level: 2,
  },
  {
    id: '/blog/apt-install-node-26-on-ubuntu-26#_4-install-pnpm',
    title: '4. Install pnpm',
    titles: [
      'Install Node.js 26 with apt on Ubuntu 26.04',
      'The step-by-step guide',
    ],
    content: 'Since Corepack is no longer included, install pnpm with its standalone script: The installer adds pnpm to your PATH in your shell config, so open a new terminal (or source your config file) before you run pnpm --version. From then on, pnpm self-update keeps it up to date.',
    level: 3,
  },
  {
    id: '/blog/create-your-eslint-config',
    title: 'Create your own ESLint config and share it across projects',
    titles: [],
    content: 'If you\'ve ever worked on multiple projects, you know the pain of copying ESLint configurations between repositories. Every time you set up a new project, you either start from scratch or copy the eslint.config.js file from your last one. There\'s a better way: publish your own shareable ESLint config package.',
    level: 1,
  },
  {
    id: '/blog/create-your-eslint-config#my-config-angelblancoeslint-config',
    title: 'My config: @angelblanco/eslint-config',
    titles: [
      'Create your own ESLint config and share it across projects',
    ],
    content: 'My configuration, @angelblanco/eslint-config, is available on npm, and the source code is on GitHub:',
    level: 2,
  },
  {
    id: '/blog/hello',
    title: 'From Svelte to Nuxt: Rebuilding my portfolio in 2025',
    titles: [],
    content: 'It\'s 2025, and I\'ve just rolled out a complete rebuild of my personal website. I\'ve migrated from a Svelte and Sapper stack to Nuxt, Tailwind CSS and a Turborepo monorepo. It wasn\'t a cosmetic update but a full rewrite, driven by five years of changes in the frontend landscape and by the wish to use the same tools at home as at work.',
    level: 1,
  },
  {
    id: '/blog/hello#whats-next',
    title: 'What\'s next?',
    titles: [
      'From Svelte to Nuxt: Rebuilding my portfolio in 2025',
    ],
    content: 'I want to write more, share some ideas I\'ve been thinking about for a long time, and maybe start contributing to an open source project. Thanks for reading. See you around.',
    level: 2,
  },
];
