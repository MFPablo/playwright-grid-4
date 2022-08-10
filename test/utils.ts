require("dotenv").config();
import {
  Page,
  Browser,
  BrowserContext,
  chromium,
  BrowserType,
  Locator,
} from "@playwright/test";

const audioDir = `${process.env.AUDIODIR}`;
const defaultTimeout = 15000;

export const chrome = async (): Promise<Browser> => {
  return await chromium.launch({
    args: [
      "--use-fake-device-for-media-stream",
      "--use-fake-ui-for-media-stream",
      "--allow-file-access-from-files",
      `--use-file-for-fake-audio-capture=${audioDir}`,
    ],
  });
};

export const chromeContext = async (
  browser: Browser
): Promise<BrowserContext> => {
  const context = await browser.newContext();
  await context.grantPermissions([
    "notifications",
    "microphone",
    "camera",
    "geolocation",
  ]);
  return context;
};

export const sleep = async (ms: number) => {
  await new Promise(async (resolve) => setTimeout(resolve, ms));
};

export const get = async (
  page: Page,
  selector: string,
  ms?: number
): Promise<any> =>
    await page.locator(selector).first().elementHandle({ timeout: ms || defaultTimeout })


export const getByText = async (page: Page, text: string) =>
  await page.locator(`text=${text}`).first();

export const click = async (page: Page, selector: string, ms?: number) => {
  const found = await page.locator(selector).first();
  await found.click({ timeout: ms || defaultTimeout });
};
