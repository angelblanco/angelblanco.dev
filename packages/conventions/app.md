# apps/angelblanco.dev standards

- Use the installed nuxt packages utilities when possible

```
'@nuxt/content',
'@nuxtjs/color-mode',
'@nuxt/icon',
'@nuxtjs/i18n',
'@vueuse/nuxt',
'@nuxt/image',
'@nuxt/fonts',
```

- Fonts live in `packages/fonts`: `@nuxt/fonts` loads them on the site and in the OG images through `nuxtFontsConfig()`, so do not add font families to `nuxt.config.ts` directly or import font CSS in the app. Only Storybook imports `@angelblanco/fonts` (in `.storybook/preview.ts`), because `@nuxt/fonts` is not loaded there. `Geist Mono` only has the 400 weight on the site; the 600 weight is the separate `Geist Mono SemiBold` family, used only by the OG images.

- Separate page components following the same structure as the pages one. Always include the preffix in the file name and the folders.

```
apps/angelblanco.dev/pages/blog/index.vue
apps/angelblanco.dev/components/blog/BlogFooter.vue
```

- Keep pages lean and add logic and template in child components without making it really complex.
