import process from 'node:process';
import tailwindcss from '@tailwindcss/vite';
import useSocials from './app/composables/useSocials';
import { readingTime } from './app/utils/readingTime';
import { feedRoutes } from './shared/utils/feeds';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/color-mode',
    '@nuxt/icon',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@nuxt/image',
    '@nuxtjs/seo',
    '@nuxt/content',
    '@nuxt/test-utils/module',
    '@nuxt/scripts',
  ],

  ...(process.env.STORYBOOK === 'true'
    ? { buildDir: 'node_modules/.cache/storybook/.nuxt' }
    : {}),

  typescript: {
    tsConfig: {
      include: ['../test/**/*', '../.storybook/preview.ts', '../.storybook/fixtures/**/*'],
    },
    nodeTsConfig: {
      include: ['../.storybook/main.ts'],
    },
  },

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },
  },

  seo: {
    meta: {
      themeColor: [
        { content: '#030712', media: '(prefers-color-scheme: dark)' },
        { content: 'white', media: '(prefers-color-scheme: light)' },
      ],
      twitterCreator: '@angelblancodev',
      colorScheme: 'dark light',
    },
  },

  site: {
    trailingSlash: true,
  },

  linkChecker: {
    failOnError: true,
    // Accented heading anchors are percent-encoded (é -> %C3%A9), which this rule reports as uppercase.
    skipInspections: ['no-uppercase-chars'],
  },

  i18n: {
    baseUrl: 'https://angelblanco.dev',
    locales: [
      { code: 'en', language: 'en-US', file: 'en.yaml' },
      { code: 'es', language: 'es-ES', file: 'es.yaml' },
    ],
    defaultLocale: 'en',
    trailingSlash: true,
    experimental: {
      strictSeo: true,
    },
  },

  schemaOrg: {
    identity: {
      type: 'Person',
      name: 'Ángel Blanco',
      image: '/ablanco_2025_profile.webp',
      description: 'Software engineer',
      url: 'https://angelblanco.dev',
      sameAs: useSocials().socials.map(s => s.url),
    },
  },

  nitro: {
    preset: 'github_pages',
    prerender: {
      routes: [
        ...feedRoutes(),
        '/api/search/en.json',
        '/api/search/es.json',
      ],
    },
  },

  experimental: {
    viewTransition: true,
    defaults: {
      nuxtLink: {
        trailingSlash: 'append',
      },
    },
  },

  compatibilityDate: '2025-09-20',

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  colorMode: {
    classSuffix: '',
    dataValue: 'theme',
  },

  ogImage: {
    buildCache: {
      base: '.cache/og-image',
    },
    compatibility: {
      dev: {
        browser: 'playwright',
      },
      prerender: {
        browser: 'playwright',
      },
    },
  },

  icon: {
    mode: 'css',
    cssLayer: 'base',
    clientBundle: {
      scan: {
        globInclude: ['**/*.vue', '**/*.ts'],
        globExclude: [
          'node_modules',
          'dist',
          '.output',
          '.data',
          '.nuxt',
          '.turbo',
          '.storybook',
          'storybook-static',
          '**/*.stories.ts',
        ],
      },
    },
  },

  content: {
    experimental: {
      sqliteConnector: 'native',
    },
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'catppuccin-latte',
            dark: 'catppuccin-mocha',
          },
          langs: ['php'],
        },
      },
    },
  },

  hooks: {
    'content:file:afterParse': ({ file, content, collection }) => {
      if (collection.name.startsWith('blog_'))
        content.readingTime = readingTime(file.body);
    },
  },

  mdc: {
    components: {
      prose: false,
      map: {
        strong: 'ProseCustomStrong',
      },
    },
  },

  scripts: {
    registry: {
      trigger: 'onNuxtReady',
    },
  },

});
