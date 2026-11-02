import eslintConfig from '@angelblanco/eslint-config';

export default eslintConfig(defaultOptions => ({
  ...defaultOptions,
  tailwind: {
    // Absolute path: turbo runs eslint from each workspace folder
    cssConfigPath: `${import.meta.dirname}/packages/tailwind/index.css`,
  },
}));
