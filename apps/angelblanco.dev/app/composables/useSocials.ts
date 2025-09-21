interface SocialEntry {
  name: SocialName;
  url: string;
  icon: string;
}

export enum SocialName {
  GitHub = 'GitHub',
  Twitter = 'X',
  LinkedIn = 'LinkedIn',
}

export default function useSocials() {
  const socials: SocialEntry[] = [
    {
      name: SocialName.GitHub,
      url: 'https://github.com/angelblanco',
      icon: 'simple-icons:github',
    },
    {
      name: SocialName.Twitter,
      url: 'https://x.com/angelblancodev',
      icon: 'simple-icons:x',
    },
    {
      name: SocialName.LinkedIn,
      url: 'https://www.linkedin.com/in/angelblanco-dev',
      icon: 'simple-icons:linkedin',
    },
  ];

  function getSocialByName(name: SocialName): SocialEntry {
    return socials.find(s => s.name === name) as SocialEntry;
  }

  return {
    repoUrl: 'https://github.com/angelblanco/angelblanco.dev',
    socials,
    getSocialByName,
    githubUrl: getSocialByName(SocialName.GitHub).url,
  };
}
