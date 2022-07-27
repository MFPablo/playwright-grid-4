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
  maxFailures: process.env.CI ? 1 : undefined,
  retries: process.env.CI ? 0 : 0,
  use: {
    channel: 'chrome',
    headless: true,
    baseURL: "about.blank",    
    permissions: [    
      'notifications',
      'microphone',
      'camera',
      'geolocation'],
    //ignoreHTTPSErrors: true,
    //viewport: { width: 1, height: 1 },
     //video: 'on-first-retry',
     // trace: 'on-first-retry',
     // browserName: 'chromium',
     //screenshot: 'only-on-failure',
  },
projects: [  
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  }
]
};

export default config;