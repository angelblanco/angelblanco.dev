export enum TechType {
  Db = 'dbs',
  Language = 'langs',
  Framework = 'frameworks',
  Testing = 'testing',
  DevOps = 'devops',
  Tools = 'tools',
};

export interface TechEntry {
  title: TechName;
  icon: string;
  type: TechType;
}

export interface TechList {
  technologies: TechEntry[];
  types: TechType[];
}

export enum TechName {
  Vue = 'Vue',
  Nuxt = 'Nuxt',
  Laravel = 'Laravel',
  NodeJS = 'NodeJS',
  Tailwind = 'Tailwind CSS',
  Typescript = 'Typescript',
  PHP = 'PHP',
  Javascript = 'Javascript',
  Vitest = 'Vitest',
  Playwright = 'Playwright',
  MongoDB = 'MongoDB',
  Postgresql = 'Postgresql',
  Redis = 'Redis',
  RabbitMQ = 'RabbitMQ',
  Docker = 'Docker',
  Jenkins = 'Jenkins',
  GithubActions = 'Github Actions',
  Grafana = 'Grafana',
  Jira = 'Jira',
  Figma = 'Figma',
  VSCode = 'VSCode',
  PHPStorm = 'PHPStorm',
  NeoVIM = 'NeoVIM',
  Linux = 'Linux',
}

export default function useTechList(): TechList {
  const technologies: TechEntry[] = [
    {
      title: TechName.Vue,
      icon: 'simple-icons:vuedotjs',
      type: TechType.Framework,
    },
    {
      title: TechName.Nuxt,
      icon: 'simple-icons:nuxtdotjs',
      type: TechType.Framework,
    },
    {
      title: TechName.Laravel,
      icon: 'simple-icons:laravel',
      type: TechType.Framework,
    },
    {
      title: TechName.NodeJS,
      icon: 'simple-icons:nodedotjs',
      type: TechType.Framework,
    },
    {
      title: TechName.Tailwind,
      icon: 'simple-icons:tailwindcss',
      type: TechType.Framework,
    },
    {
      title: TechName.Typescript,
      icon: 'simple-icons:typescript',
      type: TechType.Language,
    },
    {
      title: TechName.PHP,
      icon: 'simple-icons:php',
      type: TechType.Language,
    },
    {
      title: TechName.Javascript,
      icon: 'simple-icons:javascript',
      type: TechType.Language,
    },
    {
      title: TechName.Vitest,
      icon: 'simple-icons:vitest',
      type: TechType.Testing,
    },
    {
      title: TechName.Playwright,
      icon: 'simple-icons:playwright',
      type: TechType.Testing,
    },
    {
      title: TechName.MongoDB,
      icon: 'simple-icons:mongodb',
      type: TechType.Db,
    },
    {
      title: TechName.Postgresql,
      icon: 'simple-icons:postgresql',
      type: TechType.Db,
    },
    {
      title: TechName.Redis,
      icon: 'simple-icons:redis',
      type: TechType.Db,
    },
    {
      title: TechName.RabbitMQ,
      icon: 'simple-icons:rabbitmq',
      type: TechType.Db,
    },
    {
      title: TechName.Linux,
      icon: 'simple-icons:linux',
      type: TechType.DevOps,
    },
    {
      title: TechName.Docker,
      icon: 'simple-icons:docker',
      type: TechType.DevOps,
    },
    {
      title: TechName.Jenkins,
      icon: 'simple-icons:jenkins',
      type: TechType.DevOps,
    },
    {
      title: TechName.GithubActions,
      icon: 'simple-icons:githubactions',
      type: TechType.DevOps,
    },
    {
      title: TechName.Grafana,
      icon: 'simple-icons:grafana',
      type: TechType.DevOps,
    },
    {
      title: TechName.Jira,
      icon: 'simple-icons:jira',
      type: TechType.Tools,
    },
    {
      title: TechName.Figma,
      icon: 'simple-icons:figma',
      type: TechType.Tools,
    },
    {
      title: TechName.VSCode,
      icon: 'simple-icons:visualstudiocode',
      type: TechType.Tools,
    },
    {
      title: TechName.PHPStorm,
      icon: 'simple-icons:phpstorm',
      type: TechType.Tools,
    },
    {
      title: TechName.NeoVIM,
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
