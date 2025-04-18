# angelblanco.dev

# Technologies used
- [Nuxt JS](https://nuxt.com)
- [Turborepo](https://turbo.build/repo)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Vite](https://vitejs.dev/)

# Project structure

- `conventions`: tips for aider and other LLMs to help code faster.
- `packages`: shared packages for different tools
  - `tsconfig`: Base shared `tsconfig.json` configurations for TypeScript projects.
  - `eslint`: Custom ESLint configuration shared across the monorepo.
  - `tailwind`: Shared Tailwind CSS configuration for consistent styling across projects.
- `apps`: deployable applications
  - `angelblanco.dev`: the source code of the webpage itself composing the different packages for the turbo repo.
