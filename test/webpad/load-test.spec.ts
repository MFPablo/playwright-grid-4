import { BrowserContext, expect, test, Page, Browser } from "@playwright/test";
import { get, sleep, chrome, chromeContext } from "../utils";
import { cambiarEstado, logIn, seleniumUserListCero } from "../webpad-utils";

const URL = process.env.WEBPAD_URL3 // "http://google.com.ar";
const user: string[] = seleniumUserListCero();
let browser: Browser;
let context: BrowserContext;
let page: Page;

test.beforeAll(async () => {
  browser = await chrome();
  //context = await chromeContext(browser);
  page = await browser.newPage();
});

test.afterEach(async () => {
  //await context.close();
  await browser.close();
});

for (let i = 0; i < 10; i++) {
  test("Selenium " + `${i+1}`.padStart(3, "0"), async () => {

    await page.goto(URL || "http://about.blank/");

    await sleep(500 * i);

    let interval = setInterval(async () => {
      try {
        if (await  page.locator("#logo-aguila").first().elementHandle({ timeout: 500})) {
          await logIn(page, user[i]);
          await sleep(1000);
        }
      } catch (err) {}
      try {
        if (await  page.locator("#dropdown1 >> text=No Disponible").first().elementHandle({ timeout: 500})) {
          await cambiarEstado(page);
        }
      } catch (err) {}
    }, 20 * 1000);

    await sleep(20 * 1000);
    clearInterval(interval);
  });
}
