import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { nuxtFontsConfig } from '@angelblanco/fonts/nuxt';
import { describe, expect, it } from 'vitest';

describe('fonts: nuxtFontsConfig', () => {
  const config = nuxtFontsConfig();

  it('leaves the site CSS untouched and never falls back to a CDN', () => {
    expect(config.processCSSVariables).toBe(false);
    expect(config.npm.remote).toBe(false);
  });

  it('serves the OG families from the npm provider', () => {
    expect(config.families.map(family => family.name)).toEqual(['Inter Variable', 'Geist Mono']);
    expect(config.families.every(family => family.provider === 'npm')).toBe(true);
  });

  it.each(['@fontsource-variable/inter', '@fontsource/geist-mono'])('resolves %s from the fonts package', (pkg) => {
    expect(existsSync(join(config.npm.resolve(pkg), 'package.json'))).toBe(true);
  });
});
