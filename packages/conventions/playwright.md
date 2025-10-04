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

- **Finding Translations:**
  When writing assertions against text content, you **must** retrieve the correct translations from the application's i18n files:
  - **English:** `apps/angelblanco.dev/i18n/locales/en.yaml`
  - **Spanish:** `apps/angelblanco.dev/i18n/locales/es.yaml`

  Do not hardcode translated strings directly in the tests.

## Dynamic Content and Structure

To write effective tests, you need to understand the structure of the page you are testing.

- **Route Structure:** The application's routes are defined by the file structure within `apps/angelblanco.dev/app/pages/`. For example, a file at `app/pages/about/index.vue` corresponds to the `/about` route.
- **Component Analysis:** If you need to understand the specific components used on a page, you can find them in `apps/angelblanco.dev/app/components/`. This is useful for creating targeted selectors or understanding the page's DOM structure.

## Test Authoring Guidelines

1.  **Conciseness:** Write the minimum amount of code required to test the desired functionality. Avoid unnecessary steps or assertions.
2.  **Use Best Practices:** Leverage the latest Playwright features and APIs. Use web-first assertions and locators.
3.  **DRY (Don't Repeat Yourself):** Do not write the same test logic multiple times. Use loops or parameterized tests to cover different locales or scenarios.
4.  **No Superfluous Comments:** Code should be self-explanatory. Only add comments for complex logic that cannot be simplified.
5.  **File Naming:** Test files should be named `[page-name].spec.ts`. For example, tests for the home page are in `home.spec.ts`.

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
  });
}
```

## Workflow

1.  **Analyze the Target Page:**
    - Identify the route by checking the `apps/angelblanco.dev/app/pages/` directory, maybe with the `tree` command.
    - Review the components used on the page (`apps/angelblanco.dev/app/components/`).
2.  **Gather Translations:**
    - Open `en.yaml` and `es.yaml` to find the text content you need to assert against.
3.  **Write the Test:**
    - Create or open the relevant `*.spec.ts` file in `packages/playwright/tests/`.
    - Write a concise test that covers both English and Spanish locales, using a loop or parameterized test structure.
    - Use locators and web-first assertions.
4.  **Run and Verify:**
    - Execute the tests using `pnpm test:e2e` from within the `packages/playwright` directory.

By following these guidelines, I will ensure our E2E test suite is clean, efficient, and provides comprehensive coverage for our application.
