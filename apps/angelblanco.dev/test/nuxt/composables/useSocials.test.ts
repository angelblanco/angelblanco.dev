import { describe, expect, it } from 'vitest';

describe('composables: useSocials', () => {
  it('should return a list of socials', () => {
    const { socials } = useSocials();

    expect(socials.length).toBe(3);
    expect(socials.map(s => s.name)).toContain(SocialName.GitHub);
  });

  it('should return a social by name', () => {
    const { getSocialByName } = useSocials();

    const github = getSocialByName(SocialName.GitHub);

    expect(github.name).toBe(SocialName.GitHub);
    expect(github.url).toBe('https://github.com/angelblanco');
  });

  it('should return the repo url', () => {
    const { repoUrl } = useSocials();

    expect(repoUrl).toBe('https://github.com/angelblanco/angelblanco.dev');
  });

  it('should return the github url', () => {
    const { githubUrl } = useSocials();

    expect(githubUrl).toBe('https://github.com/angelblanco');
  });
});
