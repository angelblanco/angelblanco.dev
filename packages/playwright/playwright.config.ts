import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';
import { defineConfig, devices } from '@playwright/test';

const envFile = resolve(__dirname, '.env');

if (!existsSync(envFile))
  throw new Error('Missing packages/playwright/.env. Run `pnpm worktree env`.');

process.loadEnvFile(envFile);

if (!process.env.E2E_PORT)
  throw new Error('E2E_PORT is missing in packages/playwright/.env. Run `pnpm worktree env`.');

const baseURL = `http://localhost:${process.env.E2E_PORT}`;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'line',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'desktop-chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'desktop-firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    /* Test against mobile viewports. */
    {
      name: 'android-mobile',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'iphone',
      use: { ...devices['iPhone 12'] },
    },
    {
      name: 'ipad',
      use: { ...devices['iPad (gen 7)'] },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'pnpm run start:server',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
});
