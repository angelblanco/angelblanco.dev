import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));

export function nuxtFontsConfig() {
  return {
    npm: {
      root,
      remote: false,
      resolve: (id: string) => join(root, 'node_modules', id),
    },
    families: [
      {
        name: 'Inter Variable',
        provider: 'npm',
        weights: ['100 900'],
        styles: ['normal' as const],
      },
      {
        name: 'Geist Mono',
        provider: 'npm',
        weights: [400],
        styles: ['normal' as const],
      },
      {
        name: 'Geist Mono SemiBold',
        src: pathToFileURL(join(root, 'node_modules/@fontsource/geist-mono/files/geist-mono-latin-600-normal.woff2')).href,
        weight: 600,
        global: true,
        preload: false,
      },
    ],
  };
}
