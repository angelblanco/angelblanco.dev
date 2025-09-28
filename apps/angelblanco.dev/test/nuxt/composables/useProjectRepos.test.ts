import { describe, expect, it } from 'vitest';
import { mockI18n } from '../test-utils';

mockI18n();

describe('composables: useProjectRepos', () => {
  it('should return a list of project repos', async () => {
    const { projectRepos } = useProjectRepos();

    expect(projectRepos.value.length).greaterThanOrEqual(3);
    expect(projectRepos.value.map(r => r.name)).toContain('angelblanco.dev');
  });

  it('should return the correct license visibility', () => {
    const { showLicense } = useProjectRepos();

    expect(showLicense(ProjectLicense.MIT)).toBe(true);
    expect(showLicense(ProjectLicense.Comercial)).toBe(false);
  });

  it('should return a pretty url', () => {
    const { prettyUrl } = useProjectRepos();

    expect(prettyUrl('https://github.com/angelblanco/angelblanco.dev')).toBe('angelblanco/angelblanco.dev');
    expect(prettyUrl('https://beonx.com')).toBe('beonx.com');
    expect(prettyUrl('other')).toBe('other');
  });
});
