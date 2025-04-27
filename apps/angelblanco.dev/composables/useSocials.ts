interface SocialEntry {
  name: string;
  url: string;
  icon: string;
}

interface SocialsComposable {
  socials: SocialEntry[];
  repoUrl: string;
}

export default function useSocials(): SocialsComposable {
  return {
    repoUrl: 'https://github.com/angelblanco/angelblanco.dev',
    socials: [
      {
        name: 'GitHub',
        url: 'https://github.com/angelblanco',
        icon: 'simple-icons:github',
      },
      {
        name: 'X.com',
        url: 'https://x.com/angelblancodev',
        icon: 'simple-icons:x',
      },
      {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/angelblanco-dev',
        icon: 'simple-icons:linkedin',
      },
    ],
  };
}
