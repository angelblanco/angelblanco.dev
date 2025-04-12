import antfu from '@antfu/eslint-config'

export default antfu(
  {
    typescript: true,
    vue: true,
    formatters: {
      css: true,
      html: true,
      markdown: true,
    },
    stylistict: {
      indent: 2,
      semi: 'always',
    },
  },
)
