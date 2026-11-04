import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = join(import.meta.dirname, '../../..');

function topLevelEntries(locale: string): Map<string, string> {
  const yaml = readFileSync(join(root, 'i18n/locales', `${locale}.yaml`), 'utf8');
  const entries = [
    ...yaml.matchAll(/^([^\s#][^:]*):(.*)$/gm),
  ];

  return new Map(entries.map(([, key, value]) => [
    key!,
    value!.trim(),
  ]));
}

function usedCtaKeys(): string[] {
  const files = readdirSync(join(root, 'app'), { recursive: true, encoding: 'utf8' })
    .filter(file => /\.(?:vue|ts)$/.test(file));
  const sources = files.map(file => readFileSync(join(root, 'app', file), 'utf8')).join('\n');

  return [
    ...new Set(sources.match(/ogCta\w+/g)),
  ];
}

describe('i18n locales', () => {
  const en = topLevelEntries('en');
  const es = topLevelEntries('es');

  it('should define the same keys in en and es', () => {
    expect([
      ...es.keys(),
    ].sort()).toEqual([
      ...en.keys(),
    ].sort());
  });

  it.each(usedCtaKeys())('should translate the og cta %s in both locales', (key) => {
    expect(en.get(key)).toBeTruthy();
    expect(es.get(key)).toBeTruthy();
  });

  it('should find the og cta keys used by the app', () => {
    expect(usedCtaKeys()).toEqual(expect.arrayContaining(['ogCtaDefault', 'ogCtaArticle']));
  });
});
