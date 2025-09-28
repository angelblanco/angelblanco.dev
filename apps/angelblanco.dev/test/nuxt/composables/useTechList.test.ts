import { describe, expect, it } from 'vitest';

describe('composables: useTechList', () => {
  it('should return a list of technologies', () => {
    const { technologies } = useTechList();

    expect(technologies.length).greaterThan(0);
    expect(technologies?.[0]?.title.length).greaterThan(0);
    expect(technologies.map(t => t.title)).toContain('Vue');
  });

  it('should return a list of technology types', () => {
    const { types } = useTechList();

    expect(types.length).greaterThanOrEqual(6);
    expect(types).toContain(TechType.Framework);
  });
});
