import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));

export function nuxtFontsConfig() {
  return {
    processCSSVariables: false,
    npm: {
      root,
      remote: false,
      resolve: id => join(root, 'node_modules', id),
    },
    families: [
      {
        name: 'Inter Variable',
        provider: 'npm',
        weights: ['100 900'],
        styles: ['normal'],
      },
      {
        name: 'Geist Mono',
        provider: 'npm',
        weights: [400, 600],
        styles: ['normal'],
      },
    ],
  };
}
