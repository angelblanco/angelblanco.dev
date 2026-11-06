import type { Preview } from '@storybook-vue/nuxt';
import { h, Suspense, watch } from 'vue';
import { useColorMode, useNuxtApp } from '#imports';

type Theme = 'light' | 'dark';
type Locale = 'en' | 'es';

const annotations: Preview = {
  globalTypes: {
    theme: {
      description: 'Theme',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
    locale: {
      description: 'Locale',
      toolbar: {
        title: 'Locale',
        icon: 'globe',
        items: [
          { value: 'en', title: 'English' },
          { value: 'es', title: 'Español' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light', locale: 'en' },
  decorators: [
    (story, { globals }) => ({
      setup() {
        const nuxtApp = useNuxtApp();
        const { $i18n } = nuxtApp;
        const colorMode = useColorMode();

        nuxtApp.isHydrating = false;

        watch(() => globals.theme as Theme, (theme) => {
          colorMode.preference = theme;
        }, { immediate: true });

        watch(() => globals.locale as Locale, async (locale) => {
          await $i18n.loadLocaleMessages(locale);
          $i18n.locale.value = locale;
        }, { immediate: true });

        return () => h(Suspense, null, () => h(story()));
      },
    }),
  ],
  parameters: {
    layout: 'padded',
    a11y: { test: 'todo' },
    controls: {
      matchers: { color: /(?:background|color)$/i, date: /Date$/i },
    },
  },
};

export default annotations;
