import tailwindcss from '@tailwindcss/vite';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/icon',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@nuxt/image',
    '@nuxtjs/mdc',
  ],

  mdc: {
    components: {
      prose: false,
      map: {
        strong: 'ProseCustomStrong',
      },
    },
  },

  nitro: {
    preset: 'netlify',
  },

  compatibilityDate: '2025-04-05',

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

  i18n: {
    locales: [
      { code: 'en', language: 'en-US', file: 'en.yaml' },
      { code: 'es', language: 'es-ES', file: 'es.yaml' },
    ],
    defaultLocale: 'en',
  },

  experimental: {
    componentIslands: true, // For MDC translation to work
  },

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
});
