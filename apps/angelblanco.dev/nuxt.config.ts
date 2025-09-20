import tailwindcss from '@tailwindcss/vite';
import { definePerson } from 'nuxt-schema-org/schema';
import useSocials from './app/composables/useSocials';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/icon',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@nuxt/image',
    '@nuxtjs/mdc',
    '@nuxtjs/seo',
    'nuxt-schema-org',
    '@nuxt/content',
  ],

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
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

  i18n: {
    baseUrl: 'https://angelblanco.dev',
    locales: [
      { code: 'en', language: 'en-US', file: 'en.yaml' },
      { code: 'es', language: 'es-ES', file: 'es.yaml' },
    ],
    defaultLocale: 'en',
  },

  schemaOrg: {
    identity: definePerson({
      name: 'Ángel Blanco',
      image: '/ablanco_alt_1.webp',
      description: 'Software engineer',
      url: 'angelblanco.dev',
      sameAs: useSocials().socials.map(s => s.url),
    }),
  },

  nitro: {
    preset: 'netlify',
  },

  compatibilityDate: '2025-09-20',

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  colorMode: {
    classSuffix: '',
    dataValue: 'theme',
  },

  icon: {
    mode: 'css',
    cssLayer: 'base',
    clientBundle: {
      scan: {
        globInclude: ['**/*.vue', '**/*.ts'],
        globExclude: ['node_modules', 'dist', '.output', '.data', '.nuxt', '.turbo'],
      },
    },
  },

  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'github-light',
            dark: 'github-dark',
          },
        },
      },
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

  experimental: {
    componentIslands: true, // For MDC translation to work
  },

});
