import { expect, test } from "@playwright/test";
import { get, getByText, sleep } from "./utils";

for (let i = 0; i < 150; i++) {
  test(`${i}`, async ({ page }) => {
    await page.goto("http://google.com.ar");
    let interval = setInterval(async () => {
      try {
        if (await page.locator(`text=English`).isVisible()) {
          let btn = await page.locator(`text=English`).first();
          expect(await btn.innerText()).toBe("English");
          await btn.click();
        }
        if (await page.locator(`text=Español (Latinoamérica)`).isVisible()) {
          let btn2 = await page.locator(`text=Español (Latinoamérica)`).first();
          expect(await btn2.innerText()).toBe("Español (Latinoamérica)");
          await btn2.click();
        }
      } catch (err) {}
    }, 30 * 1000);

    await sleep(5 * 1000 * 60);
    clearInterval(interval);
  });
}
