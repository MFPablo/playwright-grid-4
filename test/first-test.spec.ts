import { test, expect } from '@playwright/test';
import { sleep } from './utils';

test('basic test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const title = page.locator('.navbar__inner .navbar__title');
  await expect(title).toHaveText('Playwright');

  await sleep(10000);
});



