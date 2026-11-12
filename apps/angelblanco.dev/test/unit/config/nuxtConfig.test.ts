import { fileURLToPath } from 'node:url';
import { loadNuxtConfig } from 'nuxt/kit';
import { describe, expect, it } from 'vitest';

const cwd = fileURLToPath(new URL('../../..', import.meta.url));

describe('nuxt.config', () => {
  it('builds a static Nitro site so @nuxt/image prerenders the /_ipx files', async () => {
    const config = await loadNuxtConfig({ cwd, envName: 'production' });

    expect(config.nitro.static).toBe(true);
  });

  it('keeps Nitro dynamic in development so @nuxt/image serves /_ipx', async () => {
    const config = await loadNuxtConfig({
      cwd,
      envName: 'development',
      overrides: { dev: true },
    });

    expect(config.nitro.static).toBe(false);
  });
});
