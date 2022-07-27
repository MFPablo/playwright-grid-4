import { test } from '@playwright/test'

for(let i=0; i<100; i++) {
	test(`${i}`, async ({ page }) => {	;
		await page.goto("http://google.com.ar");
	})
}
