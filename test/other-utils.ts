import { sleep } from "./utils";

/*-------------------------------------------------------UTILS--------------------------------------------------------------*/

// selenium1 to selenium200
export const seleniumUserList = () => {
  const MAX: any = 300; 
  let user:string[] = [];
  for (let i=0;i<MAX;i++){
    user[i] = `selenium${i+1}`; 
  }
  return user;
}

// selenium001 to selenium300
export const seleniumUserListCero = () => {
  const MAX: any = 300; 
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

export const changeState = async (
  page: any,
) => {
  await page.locator("#dropdown1").first().click();
  await page.locator("i.fa.fa-check-circle").first().click();
}

export const logOff = async(
  page: any,
) => {
  await (await page.locator("#dropdown1")).click();
  await sleep(1000);
  await page.click('text=Exit');
}
