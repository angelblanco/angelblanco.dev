interface SocialEntry {
  name: string;
  url: string;
  icon: string;
  logo: string;
}

export default function useSocials(): { socials: SocialEntry[] } {
  return {
    socials: [
      {
        name: 'GitHub',
        url: 'https://github.com/angelblanco',
        icon: 'codicon:github-inverted',
        logo: 'logos:github-icon',
      },
      {
        name: 'X.com',
        url: 'https://x.com/angelblancodev',
        icon: 'codicon:twitter',
        logo: 'logos:x',
      },
      {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/angelblanco-dev',
        icon: 'logos:linkedin-icon',
        logo: 'logos:linkedin-icon',
      },
    ],
  };
}
