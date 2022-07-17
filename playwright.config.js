// playwright.config.js
const { devices } = require('@playwright/test');


const config = {
  testDir: './test',
  timeout: 30 * 10000,
  expect: {
    timeout: 5000
  },
  //reporter: 'html',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 0 : 0,
  use: {
    browserName: 'chromium',
    headless: true,
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