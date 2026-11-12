import type { StorybookConfig } from '@storybook-vue/nuxt';
import { mergeConfig } from 'vite';

const colorModeHelper = `<script>(() => {
  const root = document.documentElement;
  const addColorScheme = (value) => { root.classList.add(value); root.setAttribute('data-theme', value); };
  const removeColorScheme = (value) => { root.classList.remove(value); root.removeAttribute('data-theme'); };
  window.__NUXT_COLOR_MODE__ = { preference: 'light', value: 'light', getColorScheme: () => 'light', addColorScheme, removeColorScheme };
  addColorScheme('light');
})();</script>`;

const previewStyles = `<style>
html .shiki span { color: var(--shiki-default); }
html.dark .shiki span { color: var(--shiki-dark); }
.docs-story { background-color: var(--color-base-100); color: var(--color-base-content); }
</style>`;

const config: StorybookConfig = {
  framework: { name: '@storybook-vue/nuxt', options: {} },
  stories: ['../app/**/*.stories.ts'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  staticDirs: ['../public'],
  core: { disableTelemetry: true } as StorybookConfig['core'],
  previewHead: head => `${head}${colorModeHelper}${previewStyles}`,
  viteFinal: viteConfig => mergeConfig(viteConfig, {
    optimizeDeps: {
      include: [
        'dayjs',
        'dayjs/plugin/localizedFormat',
        'dayjs/plugin/relativeTime',
        '@storybook/addon-docs > react',
        '@storybook/addon-docs > react/jsx-runtime',
        '@storybook/addon-docs > react-dom',
        '@storybook/addon-docs > react-dom/client',
        '@nuxt/content > @nuxtjs/mdc > remark-gfm',
        '@nuxt/content > @nuxtjs/mdc > remark-emoji',
        '@nuxt/content > @nuxtjs/mdc > remark-mdc',
        '@nuxt/content > @nuxtjs/mdc > remark-rehype',
        '@nuxt/content > @nuxtjs/mdc > rehype-raw',
        '@nuxt/content > @nuxtjs/mdc > parse5',
        '@nuxt/content > @nuxtjs/mdc > unist-util-visit',
        '@nuxt/content > @nuxtjs/mdc > unified',
        '@nuxt/content > @nuxtjs/mdc > debug',
        '@nuxt/content > @nuxtjs/mdc > extend',
      ],
    },
  }),
};

export default config;
