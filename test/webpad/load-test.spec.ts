import { BrowserContext, expect, test, Page, Browser } from "@playwright/test";
import { get, sleep, chrome, chromeContext } from "../utils";
import { cambiarEstado, logIn, seleniumUserListCero } from "../webpad-utils";

const URL = /*process.env.WEBPAD_URL3*/ "http://google.com.ar";
const user: string[] = seleniumUserListCero();
let browser: Browser;
let context: BrowserContext;
let page: Page;

test.beforeAll(async () => {
  browser = await chrome();
  context = await chromeContext(browser);
  page = await browser.newPage();
});

test.afterEach(async () => {
  await context.close();
  await browser.close();
});

for (let i = 0; i < 3; i++) {
  test("Selenium " + `${i}`.padStart(3, "0"), async () => {
    await page.goto(URL || "http://about.blank/", {
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
    }, 30 * 1000);

    await sleep(4 * 60 * 1000);
    clearInterval(interval);
  });
}
