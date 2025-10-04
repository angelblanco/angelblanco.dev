# Playwright E2E Testing Conventions

As a senior engineer, my goal is to write robust, maintainable, and efficient end-to-end (E2E) tests for our Nuxt application using Playwright. This document outlines the conventions and workflow to follow.

## Overview

The Playwright test suite is located in `packages/playwright/` and is configured to test the statically built output of the main Nuxt application located at `apps/angelblanco.dev/`.

The core principle is to ensure that every user-facing page is tested for correct rendering, content, and functionality across all supported languages.

## Internationalization (i18n) Testing

Our application supports multiple languages. It is **critical** that all E2E tests are written to validate functionality in every supported locale.

- **Locales:**
  - **English (en):** The default locale, accessible at the root path (`/`).
  - **Spanish (es):** Accessible at the `/es` path prefix (e.g., `/es/about`).

## Dynamic Content and Structure

To write effective tests, you need to understand the structure of the page you are testing.

- **Route Structure:** The application's routes are defined by the file structure within `apps/angelblanco.dev/app/pages/`. For example, a file at `app/pages/about/index.vue` corresponds to the `/about` route.
- **Component Analysis:** If you need to understand the specific components used on a page, you can find them in `apps/angelblanco.dev/app/components/`. This is useful for creating targeted selectors or understanding the page's DOM structure.

### Theme Switching

The application's theme can be toggled between light and dark modes by interacting with the theme switcher component.

- **Selector:** The theme switcher is a `label` element with the ID `#theme-switcher`.
- **Action:** A single click on this element will toggle the theme.

```typescript
// Toggle the theme
await page.click('#theme-switcher');
```

### Locale Switching

The locale (language) can be changed via the locale switcher component, which is a dropdown menu.

- **Selector:** The main button for the dropdown has the ID `#locale-switcher`. The language options within the dropdown have a `data-lang` attribute (e.g., `[data-lang="es"]`).
- **Action:**
  1. Click the `#locale-switcher` button to open the dropdown.
  2. Click the desired language option using its `data-lang` attribute.

```typescript
// Open the locale switcher dropdown
await page.click('#locale-switcher');

// Select the Spanish locale
await page.click('[data-lang="es"]');
```

### Advanced Analysis with Chrome DevTools

For complex test scenarios, it is highly recommended to use the Chrome DevTools to analyze the page. This allows for a deeper understanding of the DOM structure, component behavior, and network requests.

By inspecting elements, simulating user interactions, and observing the application's state, the coding agent can craft more precise and resilient Playwright tests. This is particularly useful for dynamic components or when debugging test failures. This includes taking pictures and simulating different scenarios to ensure full coverage.

## Test Authoring Guidelines

1.  **Conciseness:** Write the minimum amount of code required to test the desired functionality. Avoid unnecessary steps or assertions.
2.  **Use Best Practices:** Leverage the latest Playwright features and APIs. Use web-first assertions and locators.
3.  **DRY (Don't Repeat Yourself):** Do not write the same test logic multiple times. Use loops or parameterized tests to cover different locales or scenarios.
4.  **No Superfluous Comments:** Code should be self-explanatory. Only add comments for complex logic that cannot be simplified.
5.  **File Naming:** Test files should be named `[page-name].spec.ts`.
6.  **Use screenshots:** Visually comparing screenshots ensure that we have not broken page styling.

### Example: Testing a Page Title (DRY approach)

```typescript
// tests/home.spec.ts
import { expect, test } from '@playwright/test';

const locales = [
  { code: 'en', path: '/', title: 'Ángel Blanco' },
  { code: 'es', path: '/es', title: 'Ángel Blanco' },
];

for (const locale of locales) {
  test(`has correct title for locale: ${locale.code}`, async ({ page }) => {
    await page.goto(locale.path);
    await expect(page).toHaveTitle(new RegExp(locale.title));
    await expect(page).toHaveScreenshot('home.png');
  });
}
```

## Workflow

1.  **Analyze the Target Page:**
    - Identify the route by checking the `apps/angelblanco.dev/app/pages/` directory, maybe with the `tree` command.
    - Review the components used on the page (`apps/angelblanco.dev/app/components/`).
2.  **Write the Test:**
    - Create or open the relevant `*.spec.ts` file in `packages/playwright/tests/`.
    - Write a concise test that covers both English and Spanish locales, using a loop or parameterized test structure.
    - Use locators and web-first assertions.
3.  **Run and Verify:**
    - Execute the tests using `pnpm run test:e2e` from within the `packages/playwright` directory. If you have changed or added screenshots, run it with `--update-snapshots`.
    - If the test run fails, do not try to fix it right away, let the user decide if you need to fix it or not.

By following these guidelines, ensure our E2E test suite is clean, efficient, and provides comprehensive coverage for our application.
