// playwright.config.js
const { devices } = require('@playwright/test');

const config = {
  testDir: './test',
  timeout: 24 * 60 * 60 * 1000,
  expect: {
    timeout: 15000
  },
  //reporter: 'html',
  forbidOnly: !!process.env.CI,
  workers: process.env.CI ? 1 : undefined,
  fullyParallel: true,
  maxFailures: process.env.CI ? 1 : undefined,
  retries: process.env.CI ? 0 : 0,
  use: {
    browserName: 'chromium',
    headless: false,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
};
module.exports = config;