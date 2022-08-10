import { expect, test } from "@playwright/test";

for (let i = 0; i < 10; i++) {
  test(`${i}`, async ({ page }) => {
    await page.goto("http://google.com" || "http://about.blank/", {waitUntil: "domcontentloaded"});
    let btn = await page.locator(`text=English`).first();
    expect(await btn.innerText()).toBe("English");
    await btn.click();
  });
}
