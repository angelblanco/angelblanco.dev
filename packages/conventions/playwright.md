# Playwright E2E Testing Conventions

As a senior engineer, my goal is to write robust, maintainable, and efficient end-to-end (E2E) tests for our Nuxt application using Playwright. This document outlines the conventions and workflow to follow.

## Overview

The Playwright test suite is located in `packages/playwright/` and is configured to test the statically built output of the main Nuxt application located at `apps/angelblanco.dev/`.

The core principle is to ensure that every user-facing page is tested for correct rendering, content, and functionality across all supported languages and themes.

**IMPORTANT**: Before writing any test, you must read the updated version of `packages/playwright/tests/utils.ts` to understand the available helper functions and data structures.

## Core Testing Concepts

### Internationalization (i18n) and Theming

Our application supports multiple languages and themes. It is **critical** that all E2E tests are written to validate functionality in every supported combination.

- **Locales & Themes:** The available locales (e.g., `en`, `es`) and themes (`light`, `dark`) are exported from `packages/playwright/tests/utils.ts`. Tests should loop through these arrays to ensure full coverage.

### Dynamic Content and Structure

To write effective tests, you need to understand the structure of the page you are testing.

- **Route Structure:** The application's routes are defined by the file structure within `apps/angelblanco.dev/app/pages/`. For example, a file at `app/pages/about/index.vue` corresponds to the `/about` route.
- **Component Analysis:** If you need to understand the specific components used on a page, you can find them in `apps/angelblanco.dev/app/components/`. This is useful for creating targeted selectors or understanding the page's DOM structure.

### Utility Functions

The `packages/playwright/tests/utils.ts` file provides several helper functions to streamline testing:

- **`ensureTheme(page, theme)`:** Ensures the specified theme (`'light'` or `'dark'`) is active on the page. It will click the theme switcher if necessary.
- **`hideCanvas(page)`:** Hides the `<canvas>` element used for animations to prevent inconsistencies in screenshots. It must only be used if needed.
- **`localizedPath(locale, path)`:** Constructs a correct, locale-aware URL path.

## Test Authoring Guidelines

1.  **Structure:** Tests should be structured with nested loops, iterating through `locales` and then `themes` as defined in `utils.ts`.
2.  **File Naming:** Test files should be named `[page-name].spec.ts`.
3.  **Conciseness:** Write the minimum amount of code required. Leverage the helper functions from `utils.ts`.
4.  **Screenshots:** Visually compare screenshots to ensure that page styling remains consistent. Screenshots should be full-page and follow the naming convention: `[page-name]-${locale.code}-${theme}.png`.
5.  **DRY (Don't Repeat Yourself):** The loop-based structure inherently follows this principle. Avoid duplicating test logic.
6.  **No Superfluous Comments:** Code should be self-explanatory.

### Example: Testing the Some Page

This example demonstrates the standard structure for a Playwright test file, iterating through all locales and themes.

```typescript
// tests/somePage.spec.ts
import { expect, test } from '@playwright/test';
import { ensureTheme, expectSeoIsConfigured, locales, localizedPath, themes } from './utils';

for (const locale of locales) {
  for (const theme of themes) {
    test(`it renders some page properly on: ${locale.code} ${theme}`, async ({ page }) => {
      await page.goto(localizedPath(locale, '/some-page'));

      await ensureTheme(page, theme);

      await expect(page).toHaveTitle(/Ángel Blanco/);
      await expectSeoIsConfigured(page);

      await expect(page).toHaveScreenshot(`some-page-${locale.code}-${theme}.png`, {
        fullPage: true,
      });
    });
  }
}
```

## Workflow

1.  **Analyze the Target Page:**
    - Identify the route by checking the `apps/angelblanco.dev/app/pages/` directory.
    - Review the components used on the page (`apps/angelblanco.dev/app/components/`).
2.  **Read `utils.ts`:**
    - Familiarize yourself with the available helpers and data in `packages/playwright/tests/utils.ts`.
3.  **Write the Test:**
    - Create or open the relevant `*.spec.ts` file in `packages/playwright/tests/`.
    - Implement the test using the nested loop structure for locales and themes.
    - Use helper functions from `utils.ts` where appropriate.
4.  **Run and Verify:**
    - Execute the tests using `pnpm test:e2e` from within the `packages/playwright` directory.
    - To update snapshots, run `pnpm test:e2e --update-snapshots`.
    - If a test run fails, inform the user and let the user decide if you must continue with fixes or not.

By following these guidelines, we ensure our E2E test suite is clean, efficient, and provides comprehensive coverage for our application.
