import { devices, PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './test',
  timeout: 24 * 60 * 60 * 1000,
  expect: {
    timeout: 15000
  },
  reporter: [['html'],['list']],
  forbidOnly: !!process.env.CI,
  workers: process.env.CI ? 1 : undefined,
  fullyParallel: true,
  maxFailures: process.env.CI ? 0 : undefined,
  retries: process.env.CI ? 0 : undefined,
  use: {
    channel: 'chrome',
    headless: !true,
    ignoreHTTPSErrors: true,
    baseURL: "about.blank",    
    permissions: [    
      'notifications',
      'microphone',
      'camera',
      'geolocation'],
    screenshot: 'only-on-failure',
    video: 'off',
    trace: 'off',
    // viewport: null,// { width: 800, height: 600 },
    // browserName: 'chromium',
  },
projects: [  
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  }
]
};

export default config;