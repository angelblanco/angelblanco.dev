import type { Preview } from '@storybook-vue/nuxt';
import annotations from './annotations';
import { serializeNuxtApps } from './serializeNuxtApps';
import '@angelblanco/fonts';

serializeNuxtApps();

const preview: Preview = {
  ...annotations,
  tags: ['autodocs'],
};

export default preview;
