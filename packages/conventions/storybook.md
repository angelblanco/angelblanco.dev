# Storybook Conventions

This document explains how Storybook runs in `apps/angelblanco.dev`, where stories and fixtures live, how to write stories that also run as Vitest tests, and what cannot be storied.

## TL;DR

```bash
pnpm storybook                          # dev server on http://localhost:<STORYBOOK_PORT or NUXT_PORT + 3006>
pnpm build:storybook                    # static build in apps/angelblanco.dev/storybook-static (also run in CI)
pnpm test                               # includes test/nuxt/stories.test.ts, which runs every story tagged `test`
```

All three work from the repo root (through turbo) or from `apps/angelblanco.dev`.

## Architecture

Storybook 10 runs **standalone** with the community framework [`@storybook-vue/nuxt`](https://github.com/nuxt-modules/storybook), colocated in the Nuxt app:

- The config lives in `apps/angelblanco.dev/.storybook`, next to `nuxt.config.ts`. The framework boots the real Nuxt app (`loadNuxt` with `ssr: false`) from the Vite root, which is the parent of `.storybook/`, so it must sit there.
- Stories get the real Nuxt Vite config with no stubs: Tailwind v4, daisyUI themes, `#imports` / `#components`, auto-imports and the real plugins (i18n, color-mode, icon, router).
- **Not the `@nuxtjs/storybook` module.** Its embedded mode has open bugs (it wedges the app dev server, loses autodocs entries, ignores `host`) and picks its own ports, bypassing the worktree port registry.
- **Not a separate `apps/storybook` workspace.** It would have to extend the app as a Nuxt layer and duplicate the module setup. The `build` task keeps hashing stories and `.storybook/**`, because Tailwind scans the whole repo and their classes reach the production CSS.
- **Separate build dir.** The Storybook CLI sets `STORYBOOK=true` for `dev` and `build`, and `nuxt.config.ts` then uses `buildDir: 'node_modules/.cache/storybook/.nuxt'`, so Storybook never overwrites the `.nuxt` folder of `pnpm dev`, `pnpm build` or `pnpm typecheck`.
- **Pinned versions.** `storybook`, every `@storybook/*` package and `eslint-plugin-storybook` share one exact version (10.6.5), enforced by `overrides` in `pnpm-workspace.yaml`. `@storybook-vue/nuxt` is pinned to 10.0.3, the first release that works with Nuxt 4.6, Vite 8 and pnpm workspaces. Upgrade them together.

| File                              | Purpose                                                                                                                                                                                                                                                                                                         |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.storybook/main.ts`              | Framework, story glob (`../app/**/*.stories.ts`), addons (`addon-docs`, `addon-a11y`), `public/` as static dir, the color-mode helper and the Shiki and docs canvas styles (docs canvases get the theme's `base-100` background), `__IS_SSR__: 'false'` and `optimizeDeps`.                                     |
| `.storybook/annotations.ts`       | Theme and locale toolbar globals, the global decorator, and `a11y.test: 'todo'`. Shared by Storybook and the Vitest smoke test.                                                                                                                                                                                 |
| `.storybook/preview.ts`           | Spreads `annotations.ts` and adds the global `autodocs` tag (Storybook reads it statically from this file), loads the fonts and runs `serializeNuxtApps()` (browser only).                                                                                                                                      |
| `.storybook/serializeNuxtApps.ts` | Runs the per-canvas Nuxt app setups one at a time (see [Upgrade path](#upgrade-path)).                                                                                                                                                                                                                          |
| `.storybook/dev.sh`               | Resolves the port and starts `storybook dev`.                                                                                                                                                                                                                                                                   |
| `.storybook/fixtures/*.ts`        | Static data shared by stories: `blog.ts` (posts with reading times and tags, `blogTagCounts`, TOCs), `article.ts` (one post body quoted from post 0005, used by `UI/ContentWrapper` and `Blog/Header`), `search.ts` (search index sections) and `shiki.ts` (Shiki token palette and a `ProsePre` block helper). |
| `test/nuxt/stories.test.ts`       | Portable stories smoke test.                                                                                                                                                                                                                                                                                    |

`.storybook/main.ts` is type checked by `pnpm typecheck` (through `.nuxt/tsconfig.node.json`), and `preview.ts` and the fixtures through the app `tsconfig`. ESLint applies `eslint-plugin-storybook`'s `flat/recommended` config.

## File Layout

- Each story file is `<Component>.stories.ts` **next to its component** (`app/components/**` or `app/layouts/**`).
- Shared fixtures live in `apps/angelblanco.dev/.storybook/fixtures/`, **never in `app/components`**: Nuxt would scan them as components, and the icon client bundle scan would ship their icon names to production.
- Fixtures use real data (front matter and headings of real posts, real `en.yaml` copy), typed with the app types (e.g. `BlogPostSummary`, `Toc`).
- `nuxt.config.ts` keeps stories out of the app: `**/*.stories.ts`, `.storybook` and `storybook-static` are excluded from the icon client bundle scan, and a story file inside `app/layouts` is never registered as a layout.
- `storybook-static` is git-ignored (root and app `.gitignore`) and removed by `pnpm fresh`.

## Story Authoring Rules

1. **CSF3 with typed meta.**

   ```typescript
   import type { Meta, StoryObj } from '@storybook-vue/nuxt';
   import { expect, within } from 'storybook/test';
   import UiFooter from './UiFooter.vue';

   const meta = {
     title: 'UI/Footer',
     component: UiFooter,
     parameters: { layout: 'fullscreen' },
   } satisfies Meta<typeof UiFooter>;

   export default meta;

   type Story = StoryObj<typeof meta>;

   export const Default: Story = {
     play: async ({ canvasElement }) => {
       await expect(within(canvasElement).getByRole('contentinfo')).toBeInTheDocument();
     },
   };
   ```

   - Import the component by **relative path** (`./UiFooter.vue`, `./AboutBriefResume.server.vue`), never from `#components`.
   - Every file exports a `Default` story, and at least one story per file must run as a test (an all-`!test` file makes `describe.each` fail with "No test found in suite").
   - Titles are grouped by area: `UI/…`, `Home/…`, `Blog/…`, `Content/…`, `About/…`, `OG/…`, `Layouts/…`.
   - Use `parameters: { layout: 'fullscreen' }` for page-level parts, and `subcomponents` for children shown in docs (`BlogToc` → `BlogTocLink`).

2. **No template strings.** Nuxt aliases `vue` to the runtime-only build, so `template: '...'` does not compile in Vitest. Use `h()` render functions:
   - Slots or composition: `render: args => ({ setup: () => () => h(Component, args, { default: () => h(...) }) })`.
   - Wrapper decorators: `story => ({ setup: () => () => h('div', { class: 'h-48' }, h(story())) })`.

3. **Static data only.** Use fixtures from `.storybook/fixtures` or local constants. No MSW, no `mockNuxtImport` and no framework mocking APIs (not released in 10.0.3). Components that fetch data are split into a container and a presentational component, and only the presentational one gets stories (`HomeBlog.vue` queries content and renders `HomeBlogList.vue`, which takes `latestPost` and `otherPosts` as props; `pages/blog/[slug].vue` passes the post summaries to `BlogRelated`, and `BlogSearch.vue` fetches the search index for `BlogSearchDialog`).

4. **Icons.** Stories may only use icon names that the app already uses. Stories are excluded from the icon client bundle scan, so a new name is not in the bundle (see [What Cannot Be Storied](#what-cannot-be-storied)), and removing the exclusion would ship it to production.

5. **Variants only where the component has the logic.**
   - Add `Dark` / `Spanish` stories only when the component has theme or locale specific code (e.g. `dark:` classes, `NuxtLinkLocale` prefixes, locale-dependent dates), and `Mobile` only when it has breakpoint classes.
   - Merge interaction stories that end in the same visual state as `Default` into `Default`'s play function.
   - Add `parameters.docs.description.story` when a story only differs from another after its play function runs, because play functions do not run on docs pages.

6. **Modals and empty states.**
   - Stories of components that open a native `<dialog>` with `showModal()` (`BlogSearchDialog`) set `parameters.docs.story.inline = false`, so each modal stays inside its own docs iframe instead of covering the whole docs page.
   - Presentational components that render nothing in their empty state (`BlogRelated` with no related posts) get no empty story: the smoke test requires non-empty HTML.
   - Slot-only wrappers with no props or logic get no story, since their parents' stories already render them: `UiCenterContainer` (inside `UI/PageNotFound` and `Layouts/Default`) and `layouts/empty.vue` (a bare `<div>` around the page).

7. **Code style.** No explanation comments, `interface` over object `type`, sorted imports (`pnpm lint:fix`).

8. **Done means** `pnpm --filter @angelblanco/web lint`, `typecheck`, `test` and `build:storybook` pass, and the story renders without errors in `pnpm storybook`, both on its canvas and on its docs page.

## Theme, Locale and Viewport

The global decorator in `.storybook/annotations.ts` wraps every story in `<Suspense>` (needed for async components such as `<MDC>`), sets `nuxtApp.isHydrating = false` (so `onNuxtReady` runs), and watches two toolbar globals:

| Global     | Values                    | Effect                                                                               |
| ---------- | ------------------------- | ------------------------------------------------------------------------------------ |
| `theme`    | `light` (default), `dark` | Sets `useColorMode().preference`, so `data-theme` and the daisyUI theme change live. |
| `locale`   | `en` (default), `es`      | Loads the messages and sets the `$i18n` locale, so real translations render.         |
| `viewport` | built-in `mobile1`, ...   | Storybook's viewport toolbar.                                                        |

```typescript
export const Dark: Story = {
  tags: ['!test', '!autodocs'],
  globals: { theme: 'dark' },
};

export const Mobile: Story = {
  tags: ['!test', '!autodocs'],
  globals: {
    viewport: { value: 'mobile1', isRotated: false }
  },
};
```

**Every story that sets `globals` gets `tags: ['!test', '!autodocs']` and no play function:**

- `!test`: Vitest has no real locale messages and no browser color mode or viewport, so the story would be a duplicate render of `Default`.
- `!autodocs`: docs pages render every story in one document that shares a single `<html>`, so one story's theme or locale would leak into the others.

Do not recreate theme or locale logic inside a story.

## Testing

### Portable stories smoke test

`apps/angelblanco.dev/test/nuxt/stories.test.ts` runs in the `nuxt` Vitest project (see [Nuxt Testing Conventions](./nuxt-testing.md)):

- It globs `app/**/*.stories.ts`, composes each file with `composeStories` from `@storybook-vue/nuxt` and the project annotations from `.storybook/annotations.ts` (so the global decorator runs with the default globals), and keeps the stories tagged `test` (every story by default, except `!test`).
- Each story is mounted with `mountSuspended` into a `div` attached to `document.body`, must render non-empty HTML (awaited, because of the decorator's `<Suspense>`), and then its `play` function runs with that `canvasElement`.
- A guard test fails if the glob finds no story files.
- `HTMLCanvasElement.getContext` returns a no-op context, so canvas components (the hero vortex) reach their ready state in happy-dom.
- `vitest.config.ts` processes `*.css?raw` imports (`css.include`), so stories that inject raw CSS get the real text.
- It runs with `pnpm test`, so CI covers it with no extra runner.

### Play function rules

- Import `expect`, `userEvent`, `waitFor`, `within` (and `fn`) from `storybook/test`, and query with `within(canvasElement)`. Do not destructure `canvas` or `userEvent` from the play context: composed stories pass empty objects there.
- Assert on roles, ids, `aria-*`, classes, attributes and `data-*`. **Never assert on translated text**: Vitest returns i18n keys (the `useI18n` mock in `test/nuxt/setup.ts`) while Storybook renders real text. Text that comes from fixtures or props is fine.
- Use `findBy*` / `waitFor` for anything async (async MDC setup, clicks that toggle state).
- A play function must pass both in the browser (`pnpm storybook`) and in happy-dom (`pnpm test`). Leave the story in the state it is named after (`Expanded` ends expanded) and restore any global you stub (e.g. `navigator.clipboard` in the `ProsePre` copy stories).
- Use `!test` only for globals stories or when a story truly cannot run in happy-dom.

### CI

`.github/workflows/ci.yaml` runs `pnpm lint`, `pnpm typecheck`, `pnpm test` (stories included), `pnpm build` and finally `pnpm build:storybook`, which catches preset and bundling breakage.

## `optimizeDeps` and CommonJS

The framework forces `optimizeDeps.noDiscovery: true`, so in **`storybook dev`** Vite only pre-bundles the packages listed explicitly. A CommonJS or UMD package reached by a story then fails **only in dev** with errors like `does not provide an export named 'default'`; `build:storybook` bundles CommonJS correctly and Vitest runs in Node, so neither catches it.

- When a story or component reaches a new CommonJS dependency, add it to `optimizeDeps.include` in `.storybook/main.ts`.
- Packages not resolvable from the app folder under pnpm's strict layout use the nested syntax from a package that is: `'@storybook/addon-docs > react'`, `'@nuxt/content > @nuxtjs/mdc > debug'`.
- The current list covers `dayjs` and its plugins, React for the docs renderer, and the MDC parser dependencies.
- Check new stories in `pnpm storybook`, not only in the build.

## What Cannot Be Storied

| What                                                         | Why                                                                                                                                                                                                                              | Instead                                                                                                                                                                                                                                           |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pages (`app/pages/**`)                                       | They load data with `useAsyncData` and `@nuxt/content` and depend on the route. In Storybook the route is always `/iframe.html`.                                                                                                 | Story their components and layouts (`Layouts/Default`, `Blog/Header` `Article`).                                                                                                                                                                  |
| `@nuxt/content` queries (`queryCollection`, `useBlog`)       | There is no content server or database behind Storybook.                                                                                                                                                                         | Split into container + presentational component and story the presentational one with fixtures.                                                                                                                                                   |
| Server components through auto-import (component islands)    | Storybook runs with `ssr: false`, which does not support islands (`NUXT_B3002`), so `<AboutBriefResume>` inside `AboutBrief.vue` cannot render.                                                                                  | Import the `.server.vue` file by relative path in the story and, for its parents, recompose them with `h()`, importing their constants from a plain `<script>` block of the parent (`About/Brief` uses the squares exported by `AboutBrief.vue`). |
| Icons with names computed at runtime that the app never uses | `@nuxt/icon` runs in CSS mode with a client bundle built by scanning the app sources (stories and `.storybook` excluded), and Storybook runs no Nitro server to resolve the missing ones, so an unscanned name may render blank. | Use icon names the app already uses.                                                                                                                                                                                                              |
| Active route state                                           | The route is `/iframe.html`, so `NuxtLink` active classes never match.                                                                                                                                                           | Cover it in Playwright E2E tests.                                                                                                                                                                                                                 |

## Ports

`.storybook/dev.sh` picks the port (it reads only `STORYBOOK_PORT` and `NUXT_PORT` from `.env`, it never runs it as shell code), so it follows the [worktree port scheme](./worktrees.md) with no registry change:

- `STORYBOOK_PORT` when set (from the environment or `apps/angelblanco.dev/.env`); turbo passes it through.
- Otherwise `NUXT_PORT + 3006` from `apps/angelblanco.dev/.env`: `6006` in the main checkout, `6006 + N` in worktree `N`. It fails with a hint to run `pnpm worktree env` when `NUXT_PORT` is missing.
- It runs `storybook dev --port <port> --exact-port --no-open`, so a busy port fails instead of moving to another one.

## Known Noise

These warnings appear on every run and are harmless:

- `[NUXT_B3002] Using server component AboutBriefResume with ssr: false is not supported with auto-detected component islands.` (see [What Cannot Be Storied](#what-cannot-be-storied)).
- `[@nuxtjs/og-image] WARN Nuxt OG Image is enabled but SSR is disabled.`
- `[NUXT_B7002] Some vite.optimizeDeps.include entries could not be resolved: @nuxtjs/mdc > ...` (Nuxt's own list; ours in `main.ts` uses the resolvable `@nuxt/content > @nuxtjs/mdc > ...` form).
- `` `vue-docgen-api` is deprecated and will be removed in the next major ``.
- `One or more extensionless imports detected: "./shared/utils/feeds"`.
- In `pnpm storybook`, the browser console forwards hundreds of `[unhead]` warnings (`twitter:*` meta deprecations, missing meta description, large inline style). Stories render no page head, so they do not apply.
- Node `DEP0205` (`module.register()`), Vite's chunk size warning, `Found 2 warnings while optimizing generated CSS`, `[PLUGIN_TIMINGS]` and, in dev, the `server.hmr.*` deprecation.

Any other warning or a red error overlay is a real problem.

## Upgrade Path

- **Storybook 10.6.6.** It was published the day before the integration and refused by pnpm's `minimumReleaseAge`. Bump `storybook`, every `@storybook/*` package, `eslint-plugin-storybook` and the `pnpm-workspace.yaml` overrides together. Later, Storybook 11.
- **CSF4 and Nuxt mocks.** `defineMain` / `definePreview` and `mockNuxtImport` / `mockComponent` / `registerEndpoints` are merged upstream but not released in `@storybook-vue/nuxt` 10.0.3. Once released, consider CSF4 and mocking composables instead of container/presentational splits.
- **`@storybook/addon-vitest`.** Add a `storybook` Vitest project with browser mode (`@vitest/browser-playwright`, Chromium) to run stories in a real browser, then switch `a11y.test` from `'todo'` to `'error'` to enforce accessibility.
- **`serializeNuxtApps`.** Docs pages mount several stories at once; the framework creates one Nuxt app per canvas, but they share the global `nuxt-app` context, so plugin state lands in the last app and the others crash (`Cannot set properties of undefined (setting 'preference')`). `serializeNuxtApps()` runs the setups one at a time and throws if `globalThis.PLUGINS_SETUP_FUNCTIONS` disappears after an upgrade. Remove it once the framework fixes multi-app docs pages.
- **`isHydrating` workaround.** The framework never clears `nuxtApp.isHydrating`; drop that line from the decorator when it does.
