# apps/angelblanco.dev standards

- Use the installed nuxt packages utilities when possible

```
'@nuxt/content',
'@pinia/nuxt',
'@nuxtjs/color-mode',
'@nuxt/icon',
'@nuxtjs/i18n',
'@vueuse/nuxt',
'@nuxt/image',
'@nuxtjs/mdc',
```

- Separate page components following the same structure as the pages one. Always include the preffix in the file name and the folders.

```
apps/angelblanco.dev/pages/blog/index.vue
apps/angelblanco.dev/components/blog/BlogFooter.vue
```

- Keep pages lean and add logic and template in child components without making it really complex.
