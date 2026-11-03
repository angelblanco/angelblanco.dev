import { describe, expect, it } from 'vitest';

describe('composables: useContentLicense', () => {
  it('should return the CC BY-NC-SA 4.0 license', () => {
    const { name, url, since } = useContentLicense();

    expect(name).toBe('CC BY-NC-SA 4.0');
    expect(url).toBe('https://creativecommons.org/licenses/by-nc-sa/4.0/');
    expect(since).toBe(2025);
  });
});
