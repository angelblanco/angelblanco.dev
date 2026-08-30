import { defineVitestProject } from '@nuxt/test-utils/config';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'unit',
          include: ['test/unit/**/*.{test,spec}.ts'],
          environment: 'node',
        },
      },
      await defineVitestProject({
        // Nitro forces `ssr` back on in the test build because `componentIslands` is
        // enabled, so @nuxtjs/i18n assumes a server delivers the messages and fetches
        // `/_i18n/*/messages.json`, which 404s under vitest. Reporting no SSR keeps it
        // on the (stubbed) client loaders instead — translations come from the `useI18n`
        // mock in `test/nuxt/setup.ts`.
        define: { __IS_SSR__: 'false' },
        test: {
          name: 'nuxt',
          include: ['test/nuxt/**/*.{test,spec}.ts'],
          setupFiles: ['test/nuxt/setup.ts'],
          environment: 'nuxt',
        },
      }),
    ],
  },
});
