import antfu from '@antfu/eslint-config';

export default antfu(
  {
    typescript: true,
    vue: true,
    formatters: {
      css: true,
      html: true,
      markdown: true,
    },
    stylistic: {
      semi: true,
      indent: 2,
    },
  },
  {
    files: ['**/*.vue'],
    rules: {
      'vue/block-order': ['error', {
        order: ['template', 'script', 'style'],
      }],
    },
  },
);
