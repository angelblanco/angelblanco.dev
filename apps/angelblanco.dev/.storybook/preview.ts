import type { Preview } from '@storybook-vue/nuxt';
import annotations from './annotations';
import { serializeNuxtApps } from './serializeNuxtApps';
import '@fontsource-variable/inter';
import '@fontsource/geist-mono/400.css';
import '@fontsource/geist-mono/600.css';

serializeNuxtApps();

const preview: Preview = {
  ...annotations,
  tags: ['autodocs'],
};

export default preview;
