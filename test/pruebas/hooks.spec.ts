import { test, expect, Page, Browser, BrowserContext } from '@playwright/test';
import { chrome, chromeContext, getByText, sleep } from '../utils';

let browser: Browser;
let context: BrowserContext;
let page: Page;

test.describe("Test:", () => {	

	test.describe.configure({ mode: 'serial' });

	test.beforeAll(async () => {
		browser = await chrome();
		context = await chromeContext(browser)
		page = await context.newPage();
	});
	
	test.beforeEach(async () => {
		console.log(`Running Test`);
		await page.goto('https://playwright.dev/');
	});

	test.afterAll(async () => {
		await context.close();
		await browser.close();
	});

	test('my test', async () => {
		expect(page.url()).toBe('https://playwright.dev/');
		let asd = await getByText(page,'Get Started');
		await asd?.click();
	});
});	
