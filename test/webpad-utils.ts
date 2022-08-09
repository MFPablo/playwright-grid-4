// import { WebDriver } from "selenium-webdriver";
// import {get, clickByText} from "./utils";

import { sleep } from "./utils";

/*-------------------------------------------------------UTILS--------------------------------------------------------------*/

// selenium1 a selenium200
export const seleniumUserList = () => {
  const MAX: any = process.env.AGENT_COUNT; 
  let user:string[] = [];
  for (let i=0;i<MAX;i++){
    user[i] = `selenium${i+1}`; 
  }
  return user;
}

// selenium001 a selenium300
export const seleniumUserListCero = () => {
  const MAX: any = process.env.AGENT_COUNT; 
  let user:string[] = [];
  for (let i=0;i<MAX;i++){
    user[i] = "selenium"+`${i+1}`.padStart(3, "0"); 
  }
  return user;
}

export const logIn = async (
  page: any,
  user: string
  ) =>{
  await page.locator("#username").first().fill(user);
  await page.locator("#shown-password").first().fill(user);
  await page.locator("#btn-submit").first().click();
  await sleep(10000);
}

export const cambiarEstado = async (
  page: any,
) => {
  await page.locator("#dropdown1").first().click();
  await page.locator("i.fa.fa-check-circle").first().click();
}

export const cerrarSesion = async(
  page: any,
) => {
  await (await page.locator("#dropdown1")).click();
  await sleep(1000);
  await page.click('text=Salir');
}

/*----------------------------------------------------WEBPAD API UTILS-------------------------------------------------------*/

/* 

WebPadAPI.js expone el cliente en mitrol.WebPadApiClient
asi que con llamar desde cualquier lado en el dominio del browser (como hacemos con el scroll) podemos llamar mitrol.WebPadApiClient
entonces, cuando el usuario está logueado, como primer paso antes de cambiar de estado, llamamos algo como

entonces, cuando quieras saber el estado de las interacciones, sólo llamas window.interactions.find(….) y sabes si está la interacción o si llegó una nueva o lo que sea (editado) 

*/
// declare global {
//   interface Window {
//   interactions:any;
//   }
// }

// export const nombreDelExport = () => {

//   window.interactions = [];

//   mitrol.WebPadApiClient.onInteractionCreated = (interaction) => {
//     // agregar a interactions
//   }
//   mitrol.WebPadApiClient.onInteractionUpdated = (interaction) => {
//     // actualizar interactions
//   }
//   mitrol.WebPadApiClient.onInteractionEnded = (interaction) => {
//     // borrar de interactions
//   }
  
// }
