import { test, expect, Page, Browser } from '@playwright/test';
import { chrome, chromeContext, get, sleep} from './utils';
import { cambiarEstado, logIn, seleniumUserListCero } from './webpad-utils';

const user: string[] = seleniumUserListCero();
const URL: any = "http://google.com";
const MAX =200;
let pages: Page[] = [];
let browsers: Browser[] = []
let control: any[] = [];

test.beforeAll(async () => {
	browsers = await Promise.all(Array.from({ length: MAX }, async () => await chrome()));
	pages = await Promise.all(browsers.map(async (browser) => await (await chromeContext(browser)).newPage()));
});

test.afterAll(async () => {
	await Promise.all(
    browsers.map(async (browser) => {
			try {
				if(browser) await browser.close(); 
			} catch (err) {
				return control.push(browser);
			}
    })
  );
  for (var i in control) {
    if (control[i]) await control[i].close();
  }
});

test.describe.configure({ mode: 'serial' });

test('test de carga', async () => {
	await Promise.all(
		pages.map(async (page, i) => {
			await page.goto(URL,{timeout: 1 * 1000})
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

			await sleep(1000 * 10);
			clearInterval(interval);

		}))
});
