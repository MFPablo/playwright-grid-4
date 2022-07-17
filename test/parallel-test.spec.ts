import { test, expect, Page } from '@playwright/test';
import { sleep } from './utils';

test.describe.configure({ mode: 'parallel' });

let page: Page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async () => {
  await page.close();
});

test('runs first', async () => {
  await page.goto('https://playwright.dev/');
  await page.click('text=Get Started');
  await sleep(20000);
});

test('runs second', async () => {
  await page.goto('https://playwright.dev/');
  await page.click('text=Get Started');
  await sleep(20000);
});