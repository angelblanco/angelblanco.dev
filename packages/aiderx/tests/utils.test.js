import { describe, expect, it } from 'vitest';

import { resolveCliPackageRoot } from '../src/utils';

describe('aider utils', () => {
  it('cliRepoDir', () => {
    const dir = resolveCliPackageRoot();
    expect(dir).toBeDefined();
    expect(dir).toMatch(/packages\/aiderx$/);
  });
});
