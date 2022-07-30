require("dotenv").config();
import { test, expect, Page, BrowserContext, Browser } from "@playwright/test";
import { get, getByText, sleep, chrome, chromeContext } from "./utils";
import {
  cerrarSesion,
  logIn,
  seleniumUserList,
  seleniumUserListCero,
} from "./webpad-utils";

const user: string[] = seleniumUserListCero();
//const user: string[] = seleniumUserList();
const URL: any = process.env.WEBPAD_URL3;

let browser: Browser;
let context: BrowserContext;
let page: Page;

test.beforeAll(async () => {
  browser = await chrome();
  context = await chromeContext(browser);
  page = await context.newPage();
});

test.beforeEach(async () => {
  await page.goto(URL);
});

test.afterAll(async () => {
  //await page.pause();
  await browser.close();
});

test.describe.configure({ mode: "serial" });

test(`Landing comprobation`, async () => {
  // Landing Comprobation.
  expect(await get(page, "#logo-aguila")).toBeDefined();
  expect(await (await get(page, "h4"))?.innerText()).toEqual("WebPad");
  expect(
    await (await get(page, "#username"))?.getAttribute("placeholder")
  ).toEqual("Usuario");
  expect(
    await (await get(page, "#shown-password"))?.getAttribute("placeholder")
  ).toEqual("Contraseña");
  expect(await (await get(page, "#btn-submit"))?.innerText()).toEqual(
    "INGRESAR"
  );
});
test(`Login in and Login out`, async () => {
  // Iniciando con un usuario y contraseña validos.
  await logIn(page, user[0]);
  // Chequeo inicio sesion correcto.
  expect(
    await (await get(page, "span.user-name.ng-binding"))?.innerText()
  ).toEqual(user[0]);

  // Cerrando sesion - Abriendo dropdown
  await cerrarSesion(page);

  await sleep(3000);
  // Chequeo cierre de sesion correcto
  expect(await (await get(page, "h4"))?.innerText())?.toEqual("WebPad");
});
test(`Login con un usuario invalido`, async () => {
  // Iniciando con un usuario y contraseña invalidos.
  await logIn(page, "invalidUser");

  // Chequeo error
  expect(await getByText(page, "Bad credentials")).toBeDefined;
});
