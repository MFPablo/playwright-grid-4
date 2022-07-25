import { test, expect, Page } from '@playwright/test';
import { getByText, sleep } from './utils';


for(let i=0; i<1; i++){
	test.describe(`Test: ${[i]}`, () => {	
		test.beforeEach(async ({ page }, testInfo) => {
			console.log(`Running ${testInfo.title}`);
			await page.goto('https://playwright.dev/');
		});

		test.afterAll(async () => {
		
		});

		test('my test', async ({ page }) => {
			await page.pause();
			expect(page.url()).toBe('https://playwright.dev/');
			let asd = await getByText(page,'Get Started');
			asd.click(),
			await sleep(3000);
		});
	});	
}