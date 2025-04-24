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
  ],

  nitro: {
    preset: 'netlify',
  },

  compatibilityDate: '2025-04-05',

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  colorMode: {
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
      { code: 'en', language: 'en-US', file: 'en.json' },
      { code: 'es', language: 'es-ES', file: 'es.json' },
    ],
    defaultLocale: 'en',
    bundle: {
      optimizeTranslationDirective: false,
    },
  },
});
