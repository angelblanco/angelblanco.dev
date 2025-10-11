export enum ProjectLicense {
  MIT = 'MIT',
  Comercial = 'Comercial',
}

const GITHUB_BASE_URL = 'https://github.com/';
const HTTPS_URL_PREFFIX = 'https://';

export interface ProjectRepo {
  name: string;
  url: string;
  from: string;
  to: string | null;
  description: string[];
  technologies: TechEntry[];
  license: ProjectLicense;
}

export default function useProjectRepos() {
  const { t } = useI18n();

  const { githubUrl } = useSocials();
  const { technologies } = useTechList();

  function repoUrl(url: string) {
    return url.startsWith('http') ? url : `${githubUrl}/${url}`;
  }

  function techEntries(names: TechName[]): TechEntry[] {
    return technologies.filter(t => names.includes(t.title));
  }

  function description(trans: string): string[] {
    return t(trans).split('\n');
  }

  const projectRepos = computed<ProjectRepo[]>(() => ([
    {
      name: 'angelblanco.dev',
      url: repoUrl('angelblanco.dev'),
      description: description('angelBlancoDevDescription'),
      technologies: techEntries([TechName.Nuxt, TechName.Vue, TechName.Tailwind]),
      license: ProjectLicense.MIT,
      from: '2025',
      to: null,
    },
    {
      name: 'BEONx',
      url: 'https://beonx.com',
      description: description('beonxDescription'),
      technologies: techEntries([
        TechName.Laravel,
        TechName.Vue,
        TechName.PHP,
        TechName.MongoDB,
        TechName.Postgresql,
        TechName.Tailwind,
        TechName.Docker,
        TechName.RabbitMQ,
        TechName.Redis,
        TechName.Jira,
        TechName.Playwright,
      ]),
      from: '2016',
      to: null,
      license: ProjectLicense.Comercial,
    },
    {
      name: 'kickstart.nvim',
      url: repoUrl('kickstart.nvim'),
      description: description('kickstartNvimDescription'),
      technologies: techEntries([TechName.NeoVIM, TechName.Linux]),
      license: ProjectLicense.MIT,
      from: '2023',
      to: null,
    },
    {
      name: 'v1.angelblanco.dev',
      url: repoUrl('v1.angelblanco.dev'),
      description: description('angelBlancoV1Description'),
      technologies: techEntries([TechName.Svelte, TechName.Javascript]),
      license: ProjectLicense.MIT,
      from: '2020',
      to: '2023',
    },
  ]));

  function isGithubUrl(url: string) {
    return url.startsWith(GITHUB_BASE_URL);
  }

  function prettyUrl(url: string) {
    if (isGithubUrl(url)) {
      return url.substring(GITHUB_BASE_URL.length);
    }

    if (url.startsWith(HTTPS_URL_PREFFIX)) {
      return url.substring(HTTPS_URL_PREFFIX.length);
    }

    return url;
  }

  return {
    projectRepos,
    showLicense(license: ProjectLicense) {
      if (license === ProjectLicense.Comercial) {
        return false;
      }

      return true;
    },
    prettyUrl,
  };
}
