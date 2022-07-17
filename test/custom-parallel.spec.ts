import { test, expect, Page } from '@playwright/test';
import { sleep } from './utils';

test.describe.configure({ mode: 'parallel' });

for(let i=0; i<7; i++){
	test(`runs ${[i]}`, async ({ page }) => {
		await page.goto('https://playwright.dev/');
		await page.click('text=Get Started');
		await sleep(10000);
	});
}

// let data: string[] = <DATA>;

// data.forEach( (data, i) => {
// 	test(`runs first ${pages[i]}`, async ({ page }) => {
// 				await page.goto('https://playwright.dev/');
// 				await page.click('text=Get Started');
// 				await sleep(10000);
// 	});
// })

