import { test, expect, Page, Browser } from '@playwright/test';
import { chrome, chromeContext, get, sleep} from './utils';
import { cambiarEstado, logIn, seleniumUserListCero } from './webpad-utils';

const user: string[] = seleniumUserListCero();
const URL: any = "http://google.com.ar";
const MAX =2;
let pages: Page[] = [];
let browsers: Browser[] = []


	test.beforeAll(async () => {
		browsers = await Promise.all(Array.from({ length: MAX }, async () => await chrome()));
		pages = await Promise.all(browsers.map(async (browser) => await (await chromeContext(browser)).newPage()));
	});

	test.afterAll(async () => {
		await Promise.all(
			browsers.map(async (browser) => {
				await browser.close();
			})
		);
	});

test.describe.configure({ mode: 'serial' });

test(`test de carga`, async () => {	
	await Promise.all(pages.map(async (page,i) => {

		

	}))
})

// for(let i=0;i<MAX; i++){
// 	test(`test de carga ${i}`, async () => {
// 		await eltest(pages[i],i);
// 	});
// }



const eltest = async (page: Page, i: number) => {
	await page.goto(URL);
	//await page.pause();

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

	await sleep(1000 * 1);
	clearInterval(interval);
}
