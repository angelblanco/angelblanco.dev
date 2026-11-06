import { resolve } from 'node:path';
import eslintConfig from '@angelblanco/eslint-config';
import storybook from 'eslint-plugin-storybook';

export default eslintConfig(defaultOptions => ({
  ...defaultOptions,
  tailwind: {
    // Absolute path: turbo runs eslint from each workspace folder
    cssConfigPath: resolve(import.meta.dirname, 'packages/tailwind/index.css'),
  },
})).append(
  ...storybook.configs['flat/recommended'],
  {
    files: ['**/.storybook/main.*'],
    rules: {
      'storybook/no-uninstalled-addons': [
        'error',
        {
          packageJsonLocation: resolve(import.meta.dirname, 'apps/angelblanco.dev/package.json'),
        },
      ],
    },
  },
);
