import tailwindcss from '@tailwindcss/vite';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@angelblanco/ui', '@nuxt/content', '@pinia/nuxt'],

  nitro: {
    preset: 'netlify',
  },

  compatibilityDate: '2025-04-05',

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },
});
