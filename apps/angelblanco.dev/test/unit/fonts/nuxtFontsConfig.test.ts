import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { nuxtFontsConfig } from '@angelblanco/fonts/nuxt';
import { describe, expect, it } from 'vitest';

describe('fonts: nuxtFontsConfig', () => {
  const config = nuxtFontsConfig();

  it('never falls back to a CDN', () => {
    expect(config.npm.remote).toBe(false);
  });

  it('keeps the 600 weight out of the site family', () => {
    expect(config.families.find(family => family.name === 'Geist Mono')).toMatchObject({
      provider: 'npm',
      weights: [400],
    });
  });

  it('serves the OG only weight from an existing file without preloading it', () => {
    const semiBold = config.families.find(family => family.name === 'Geist Mono SemiBold');

    expect(semiBold).toMatchObject({ weight: 600, global: true, preload: false });
    expect(existsSync(fileURLToPath(semiBold!.src!))).toBe(true);
  });

  it.each(['@fontsource-variable/inter', '@fontsource/geist-mono'])('resolves %s from the fonts package', (pkg) => {
    expect(existsSync(join(config.npm.resolve(pkg), 'package.json'))).toBe(true);
  });
});
