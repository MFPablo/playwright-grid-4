import { BrowserContext, expect, test, Page, Browser } from "@playwright/test";
import { get, sleep, chrome} from "./utils";


const URL = "http://google.com.ar";
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

for (let i = 0; i < 100; i++) {
  test("Selenium " + `${i+1}`.padStart(3, "0"), async () => {

    await page.goto(URL || "http://about.blank/");

    await sleep(500 * i);

    let interval = setInterval(async () => {
      try {
         // SOME COMMAND
      } catch (err) {}
      try {
       // SOME OTHER THING
      } catch (err) {}
    }, 20 * 1000); // Repeat every 20 seconds

    await sleep(2 * 60 * 1000); // Sleep two minutes
    clearInterval(interval);
  });
}
