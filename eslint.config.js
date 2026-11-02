import { resolve } from 'node:path';
import eslintConfig from '@angelblanco/eslint-config';

export default eslintConfig(defaultOptions => ({
  ...defaultOptions,
  tailwind: {
    // Absolute path: turbo runs eslint from each workspace folder
    cssConfigPath: resolve(import.meta.dirname, 'packages/tailwind/index.css'),
  },
}));
