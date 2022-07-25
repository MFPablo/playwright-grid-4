import { test, expect, Page } from '@playwright/test';
import { get, sleep} from './utils';
import { cambiarEstado, logIn, seleniumUserList } from './webpad-utils';

const user: string[] = seleniumUserList();
const URL: any = process.env.WEBPAD_URL2;
const MAX = 1;

for(let i=0; i<MAX; i++){
	test.describe(`Test: ${[i]}`, () => {	

		test.beforeEach(async ({ page }, testInfo) => {
			console.log(`Running ${testInfo.title}`);
		});

		test.afterAll(async ({ page }) => {
			//await page.pause();
		});

		test('test de carga', async ({ page }) => {
			await page.goto(URL);
			await page.pause();

			await sleep(500 * i);

			let interval = setInterval(async () => {
				try {
					if( await get(page,"#logo-aguila", 500)) {
						await logIn(page, user[i]);
						await sleep(3 * 1000);
					}
				} catch (err) {}
				try {
					if ( await get(page, "#dropdown1 >> text=No Disponible", 500)) {
						await cambiarEstado(page);
					}
				} catch (err) {}
			}, 20 * 1000);

			await sleep(2 * 1000 * 60);
			clearInterval(interval);

		});
	});	
}