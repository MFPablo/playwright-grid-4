import { BrowserContext, expect, test, Page, Browser } from "@playwright/test";
import { get, sleep, chrome, chromeContext } from "../utils";
import { cambiarEstado, logIn, seleniumUserListCero } from "../webpad-utils";

const user: string[] = seleniumUserListCero();
let browser: Browser;
let context: BrowserContext;
let page: Page;

test.beforeAll(async () => {
  browser = await chrome();
  context = await chromeContext(browser);
  page = await context.newPage();
});

test.afterAll(async () => {
  await context.close();
  await browser.close();
});

for (let i = 0; i < 15; i++) {
  test(`${i}`, async () => {
    await page.goto(process.env.WEBPAD_URL3 || "http://about.blank/", {
      waitUntil: "domcontentloaded",
    });

    await sleep(500 * i);

    let interval = setInterval(async () => {
      try {
        if (await get(page, "#logo-aguila", 500)) {
          await logIn(page, user[i]);
          await sleep(3 * 1000);
        }
      } catch (err) {}
      try {
        if (await get(page, "#dropdown1 >> text=No Disponible", 500)) {
          await cambiarEstado(page);
        }
      } catch (err) {}
    }, 40 * 1000);

    await sleep(3 * 60 * 1000);
    clearInterval(interval);
  });
}
