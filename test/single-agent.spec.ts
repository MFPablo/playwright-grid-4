require("dotenv").config();
import { test, expect, Page } from '@playwright/test';
import { createChrome, get, getByText, sleep} from './utils';
import { cerrarSesion, logIn, seleniumUserList, seleniumUserListCero } from './webpad-utils';

const user: string[] = seleniumUserListCero();
//const user: string[] = seleniumUserList();
const URL: any = "https://mitct-int-web-ar.mitrol.net/webpad/login";

let page: Page;

test.beforeAll(async () => {
    page = await createChrome();
});

test.beforeEach(async () => {
    await page.goto(URL);
});

test.afterAll(async () => {
    //await page.pause();
});

test("Landing comprobation",async () => {
	// Landing Comprobation.
	expect(await get(page, "#logo-aguila")).toBeDefined();
	expect(await (await get(page, "h4"))?.innerText()).toEqual("WebPad");
	expect(
			await (await get(page, "#username"))?.getAttribute("placeholder")
	).toEqual("Usuario");
	expect(
			await (await get(page, "#shown-password"))?.getAttribute("placeholder")
	).toEqual("Contraseña");
	expect(
			await (await get(page, "#btn-submit"))?.innerText()
	).toEqual("INGRESAR");
});
test("Login in and Login out",async () => {
	// Iniciando con un usuario y contraseña validos.
	await logIn(page, user[0]);
	// Chequeo inicio sesion correcto.
	expect(
			await (await get(page, "span.user-name.ng-binding"))?.innerText()
	).toEqual("selenium1");

	// Cerrando sesion - Abriendo dropdown
	await cerrarSesion(page);

	await sleep(3000);
	// Chequeo cierre de sesion correcto
	expect(await (await get(page, "h4"))?.innerText())?.toEqual("WebPad");
});
test("Login con un usuario invalido",async () => {
	// Iniciando con un usuario y contraseña invalidos.
	await logIn(page, "invalidUser");

	// Chequeo error
	expect(
	await getByText(page,"Bad credentials")
	).toBeDefined;
});
