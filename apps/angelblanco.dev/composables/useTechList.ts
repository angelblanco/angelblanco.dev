export enum TechType {
  Db = 'db',
  Language = 'lang',
  Framework = 'framework',
  Testing = 'testing',
  DevOps = 'devops',
  Tools = 'tools',
};

export interface TechEntry {
  title: string;
  icon: string;
  type: TechType;
}

export interface TechList {
  technologies: TechEntry[];
  types: TechType[];
}

export default function useTechList(): TechList {
  const technologies: TechEntry[] = [
    {
      title: 'Vue',
      icon: 'simple-icons:vuedotjs',
      type: TechType.Framework,
    },
    {
      title: 'Nuxt',
      icon: 'simple-icons:nuxtdotjs',
      type: TechType.Framework,
    },
    {
      title: 'Laravel',
      icon: 'simple-icons:laravel',
      type: TechType.Framework,
    },
    {
      title: 'NodeJS',
      icon: 'simple-icons:nodedotjs',
      type: TechType.Framework,
    },
    {
      title: 'Tailwind CSS',
      icon: 'simple-icons:tailwindcss',
      type: TechType.Framework,
    },
    {
      title: 'Typescript',
      icon: 'simple-icons:typescript',
      type: TechType.Language,
    },
    {
      title: 'PHP',
      icon: 'simple-icons:php',
      type: TechType.Language,
    },
    {
      title: 'Javascript',
      icon: 'simple-icons:javascript',
      type: TechType.Language,
    },
    {
      title: 'Vitest',
      icon: 'simple-icons:vitest',
      type: TechType.Testing,
    },
    {
      title: 'Playwright',
      icon: 'simple-icons:playwright',
      type: TechType.Testing,
    },
    {
      title: 'MongoDB',
      icon: 'simple-icons:mongodb',
      type: TechType.Db,
    },
    {
      title: 'Postgresql',
      icon: 'simple-icons:postgresql',
      type: TechType.Db,
    },
    {
      title: 'Redis',
      icon: 'simple-icons:redis',
      type: TechType.Db,
    },
    {
      title: 'RabbitMQ',
      icon: 'simple-icons:rabbitmq',
      type: TechType.Db,
    },
    {
      title: 'Docker',
      icon: 'simple-icons:docker',
      type: TechType.DevOps,
    },
    {
      title: 'Jenkins',
      icon: 'simple-icons:jenkins',
      type: TechType.DevOps,
    },
    {
      title: 'Github Actions',
      icon: 'simple-icons:githubactions',
      type: TechType.DevOps,
    },
    {
      title: 'Grafana',
      icon: 'simple-icons:grafana',
      type: TechType.DevOps,
    },
    {
      title: 'Jira',
      icon: 'simple-icons:jira',
      type: TechType.Tools,
    },
    {
      title: 'Figma',
      icon: 'simple-icons:figma',
      type: TechType.Tools,
    },
    {
      title: 'VSCode',
      icon: 'simple-icons:visualstudiocode',
      type: TechType.Tools,
    },
    {
      title: 'PHPStorm',
      icon: 'simple-icons:phpstorm',
      type: TechType.Tools,
    },
    {
      title: 'NeoVIM',
      icon: 'simple-icons:neovim',
      type: TechType.Tools,
    },
  ];

  return {
    technologies,
    types: [
      TechType.Framework,
      TechType.Language,
      TechType.Testing,
      TechType.Db,
      TechType.DevOps,
      TechType.Tools,
    ],
  };
}
