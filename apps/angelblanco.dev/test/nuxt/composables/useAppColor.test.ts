import { describe, expect, it } from 'vitest';

describe('composables: useAppColors', () => {
  it('should return light color by default', () => {
    const { base100 } = useAppColors();
    expect(base100.value).toBe('oklch(100% 0 0)');
  });
});
