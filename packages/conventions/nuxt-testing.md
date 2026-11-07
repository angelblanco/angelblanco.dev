# Nuxt Testing Conventions

This document outlines the conventions for testing the `apps/angelblanco.dev` Nuxt application. Our testing strategy is built upon `vitest` as the test runner and leverages `@nuxt/test-utils` for seamless integration with the Nuxt environment.

## Philosophy

We follow the [Vue testing philosophy](https://vue-test-utils.vuejs.org/guide/#what-to-test), which recommends a balanced approach. We aim for comprehensive test coverage by writing:

- **Unit Tests:** For isolated business logic, composables, and utility functions.
- **Component Tests:** To assert component rendering, interactions, and props.
- **End-to-End (E2E) Tests:** To validate critical user flows from a real user's perspective.

## Test Suites

Our `apps/angelblanco.dev/vitest.config.ts` is configured with two test projects, each serving a specific purpose:

1.  **`unit`**: For simple unit tests that do not require a Nuxt runtime environment.
    - **Location**: `test/unit/**/*.test.ts`
    - **Environment**: `node`

2.  **`nuxt`**: For component tests and unit tests that depend on the Nuxt runtime (e.g., auto-imported components, composables like `useAppConfig`), and for the Storybook stories smoke test.
    - **Location**: `test/nuxt/**/*.test.ts`
    - **Environment**: `nuxt` (powered by `happy-dom`)

E2E tests are not a Vitest project: they run with Playwright in `packages/playwright` (see [Playwright E2E Testing Conventions](./playwright-testing.md)).

## Unit & Component Testing (`unit` and `nuxt` suites)

We use `@vue/test-utils` for mounting and interacting with Vue components.

### When to use `test/unit` vs. `test/nuxt`?

- If your test covers a plain TypeScript function or a Vue component that is completely isolated and does not rely on any Nuxt features (like auto-imports or plugins), place it in `test/unit/`.
- If your test needs to render a component that uses Nuxt auto-imports, composables, or if you are testing a Nuxt-specific feature, place it in `test/nuxt/`.

### Helpers from `@nuxt/test-utils/runtime`

For tests in the `nuxt` suite, we have access to powerful helpers:

- **`mountSuspended`**: Use this to mount components within the Nuxt test environment. It correctly handles components with an `async setup` and ensures all Nuxt injections are available.

  ```typescript
  import { mountSuspended } from '@nuxt/test-utils/runtime';
  import { MyComponent } from '#components';

  test('can mount my component', async () => {
    const wrapper = await mountSuspended(MyComponent);
    expect(wrapper.text()).toContain('Hello world');
  });
  ```

- **Mocking**: Use `mockNuxtImport` to mock composables and `mockComponent` to stub out child components.

  `mockNuxtImport` is a compile-time macro: its factory is extracted and hoisted to the top level of the file it appears in. It must therefore be called at the top level of a test file or a setup file, never from inside a helper function — wrapping it in an exported helper moves the factory out of that function's scope and fails at runtime.

  Mocks shared by every test in the `nuxt` suite live in `test/nuxt/setup.ts`, registered via the project's `setupFiles`. `useI18n` is already mocked there: `t` returns the translation key and `setLocale` updates `locale` synchronously, so locale-dependent composables can be tested without loading real messages.

  Real locale messages are **not** available in the `nuxt` suite. `@nuxt/test-utils` builds with `ssr: false`, but Nitro forces it back on because the app has a server component (`AboutBriefResume.server.vue`), which turns on component islands; `@nuxtjs/i18n` then stubs its client loaders and expects a server route to deliver the messages. `vitest.config.ts` reports `__IS_SSR__: 'false'` so the runtime stops fetching that route, which leaves the stubbed loaders resolving empty. Assert on translation keys, not translated text.

## Stories Smoke Test

`test/nuxt/stories.test.ts` mounts every Storybook story tagged `test` (all stories except those tagged `!test`) with `composeStories` and `mountSuspended`, checks that it renders, and runs its `play` function. A story whose play function breaks fails `pnpm test`.

- Play functions never assert on translated text: this suite returns translation keys while Storybook renders real text. Assert on roles, attributes and classes instead.
- The global decorator from `.storybook/annotations.ts` runs here with the default globals (light, English). Stories that set `globals` (theme, locale, viewport) are tagged `!test`, because real messages, color mode and viewports only exist in the browser.

See [Storybook Conventions](./storybook.md) for the authoring and play function rules.

## End-to-End Testing

E2E tests validate complete user flows against the static build with Playwright. They live in `packages/playwright` and follow the [Playwright E2E Testing Conventions](./playwright-testing.md).

## Running Tests

Navigate to the app directory (`apps/angelblanco.dev`) to run tests.

- **Run all suites**: `pnpm test`
- **Run tests in watch mode**: `pnpm test:watch`
- **Generate coverage report**: `pnpm test:coverage`
- **Run a specific suite**: `pnpm vitest --project nuxt`
