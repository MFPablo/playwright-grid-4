require('dotenv').config();
import { exit } from "process";


const defaultTimeout = 15000;

export const sleep = async (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));


// export const get = async (
//     driver: WebDriver,
//     selector: string,
//     timeout = defaultTimeout
//   ) => {
//     const el = await driver.wait(
//       until.elementLocated(By.css(selector)),
//       timeout || defaultTimeout
//     );
//     return driver.wait(until.elementIsVisible(el), timeout || defaultTimeout);
//   };

//   export const scroll = async (
//     driver: WebDriver,
//     selector: string,
//     x: number | null,
//     y: number | null
//   ) => {
//     await driver.executeScript(
//       `document.querySelector("${selector}").scroll(${x ?? 0}, ${y ?? 0})`
//     );
//   };

//   export const getScroll = async (driver: WebDriver, selector: string) =>
//   driver.executeScript<{ scrollLeft: number; scrollTop: number }>(
//     `var c = document.querySelector("${selector}"); return {scrollLeft: c.scrollLeft, scrollTop: c.scrollTop}`
//   );


// export const click = async (
//     driver: WebDriver,
//     selector: string,
//     timeout?: number
//     ) => {
//     const found = await get(driver, selector, timeout);
//     await found.click();
//     };
      
// export const getByXPath = async (
// driver: WebDriver,
// xpath: string,
// timeout = defaultTimeout
// ): Promise<WebElement> =>
// driver.wait(until.elementLocated(By.xpath(xpath)), timeout || defaultTimeout);

// export const getByText = async (
//     driver: WebDriver,
//     text: string,
//     timeout = defaultTimeout
//   ): Promise<WebElement> =>
//     getByXPath(driver, `//*[normalize-space() = '${text}']`, timeout);

// export const clickByText = async (
//     driver: WebDriver,
//     text: string,
//     timeout = defaultTimeout
//     ): Promise<void> => {
//     const found = await getByText(driver, text, timeout);
//     await found.click();
//     };

// export const clickByXPath = async (
//     driver: WebDriver,
//     xpath: string,
//     timeout = defaultTimeout
//     ): Promise<void> => {
//     const found = await getByXPath(driver, xpath, timeout);
//     await found.click();
//     };
