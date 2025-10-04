# angelblanco.dev

# Technologies used

- [Nuxt JS](https://nuxt.com)
- [Turborepo](https://turbo.build/repo)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ESLint](https://eslint.org/)
- [Antfu Eslint Config](https://github.com/antfu/eslint-config)
- [Vite](https://vitejs.dev/)
- [Daisy UI](https://daisyui.com/)

# Project structure

- `apps`: deployable applications
  - `angelblanco.dev`: the source code of the webpage itself composing the different packages from the turbo repo.
- `packages`: shared packages for different tools
  - `conventions`: guidance for LLMs agents.
  - `tsconfig`: Base shared `tsconfig.json` configurations for TypeScript projects.
  - `eslint`: Custom ESLint configuration shared across the monorepo.
  - `fonts`: Defines a CSS for font management with the required fonts as dependencies.
  - `tailwind`: Tailwind 4 CSS file with daysi ui integration.
  - `playwright`: E2E tests with different browser integrations.
