require('dotenv').config();
import { exit } from "process";
import { Builder, By, until,WebElement,WebDriver } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import "selenium-webdriver/chrome";

/*------------------------------------------------------- HUB CONFIGURATION-----------------------------------------------------------------*/

// const gridUrl = "http://localhost:30001/";

// AR-SEL-HUB-001
const gridUrl = "http://192.168.40.40:30001/";

/*-------------------------------------------------------SELENIUM CONFIGURATION--------------------------------------------------------------*/

// Para windows y unix
const audioDir = `${process.env.AUDIODIR}`;
export const urlValidation = async (url?: string)=>{
  if (url) { return url } else { throw new Error("ERROR") }
  }  

const defaultTimeout = 15000;
jest.setTimeout(24 * 60 * 60 * 1000);

export const createChromeGrid = async (custom?: string) => {
    const chromeOptions = new chrome.Options();

    const capabilities = {
        platform: "Ubuntu",
        browserName: "chrome",
        version: "102.0",
        resolution: "1x1",
        network: true,
        console: true,
        name: "Test", // name of the test
        build: "NodeJS build", // name of the build
    };

    if (custom) {
      chromeOptions.addArguments(custom, "--no-sandbox", "--no-first-run");
    }

    // TODO: LOGS DE LOS NODOS / MEJORAR LA PERFORMANCE DEL GRID
    // ChromeOptions optn= new ChromeOptions();
    // optn.AddArgument("verbose");
    // optn.AddArgument("log-path=D:\\chromedriver.log");
    // var driver = new ChromeDriver(@"D:\Driver\",optn);
    // driver.Navigate().GoToUrl("https://www.google.co.in/?gfe_rd=cr&ei=aWh0U7WHEJGAuASTuYHIAQ");
    // driver.setFileDetector(new LocalFileDetector()); // Files will be uploaded from local machine via the selenium grid.
    // driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);

    chromeOptions.addArguments(
        // "--start-maximized",
        //"--disable-crash-reporter",
        "--single-process",
        "--disable-accelerated-2d-canvas",
        "--disable-image-animation-resync",
        "--disable-modal-animations",
        "--disable-low-res-tiling",
        "--disable-login-animations",
        "--enable-begin-frame-control",
        "--deadline-to-synchronize-surfaces",
        "--allow-pre-commit-input",
        "--enable-automation",
        "--disable-gpu",
        "--disable-extensions",
        "--disable-sync",
        "--disable-dev-shm-usage",
        "--use-fake-device-for-media-stream",
        "--use-fake-ui-for-media-stream",
        "--allow-file-access-from-files",
        "--use-file-for-fake-audio-capture=./samples/audio.wav",
    );
    chromeOptions.setUserPreferences({
        "profile.managed_default_content_settings.notifications": 1,
    });

    return new Builder()
        .usingServer(gridUrl)
        .withCapabilities(capabilities)
        .setChromeOptions(chromeOptions)
        .build();
};

export const createChrome = async () => {
    require("chromedriver");
    const chromeOptions = new chrome.Options();
    chromeOptions.addArguments(
       // "--no-sandbox",
        "enable-automation",
        "--disable-gpu",
        "--disable-extensions",
        "--disable-sync",
        "--autoplay-policy=no-user-gesture-required",
        "--allow-file-access-from-files",
        "--use-fake-device-for-media-stream",
        "--use-fake-ui-for-media-stream",
       `--use-file-for-fake-audio-capture=${audioDir}`,
       
    );
    chromeOptions.setUserPreferences({
        "profile.managed_default_content_settings.notifications": 1,
    });
    return new Builder()
    
        .forBrowser("chrome")
        .setChromeOptions(chromeOptions)
        .build();
        
};

/*----------------------------------------------------------------------------------------------------------------------------------------*/


export const get = async (
    driver: WebDriver,
    selector: string,
    timeout = defaultTimeout
  ) => {
    const el = await driver.wait(
      until.elementLocated(By.css(selector)),
      timeout || defaultTimeout
    );
    return driver.wait(until.elementIsVisible(el), timeout || defaultTimeout);
  };

  export const scroll = async (
    driver: WebDriver,
    selector: string,
    x: number | null,
    y: number | null
  ) => {
    await driver.executeScript(
      `document.querySelector("${selector}").scroll(${x ?? 0}, ${y ?? 0})`
    );
  };

  export const getScroll = async (driver: WebDriver, selector: string) =>
  driver.executeScript<{ scrollLeft: number; scrollTop: number }>(
    `var c = document.querySelector("${selector}"); return {scrollLeft: c.scrollLeft, scrollTop: c.scrollTop}`
  );

export const sleep = async (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

export const click = async (
    driver: WebDriver,
    selector: string,
    timeout?: number
    ) => {
    const found = await get(driver, selector, timeout);
    await found.click();
    };
      
export const getByXPath = async (
driver: WebDriver,
xpath: string,
timeout = defaultTimeout
): Promise<WebElement> =>
driver.wait(until.elementLocated(By.xpath(xpath)), timeout || defaultTimeout);

export const getByText = async (
    driver: WebDriver,
    text: string,
    timeout = defaultTimeout
  ): Promise<WebElement> =>
    getByXPath(driver, `//*[normalize-space() = '${text}']`, timeout);

export const clickByText = async (
    driver: WebDriver,
    text: string,
    timeout = defaultTimeout
    ): Promise<void> => {
    const found = await getByText(driver, text, timeout);
    await found.click();
    };

export const clickByXPath = async (
    driver: WebDriver,
    xpath: string,
    timeout = defaultTimeout
    ): Promise<void> => {
    const found = await getByXPath(driver, xpath, timeout);
    await found.click();
    };

export const close = async(driver: WebDriver, control: any[]) =>{
  try {
    if(driver) await driver.quit(); 
  } catch (err) {
    return control.push(driver);
  }
}

export const mensajeError = (i: number) =>{
 const message = [
  "La ejecución local solo permite 1 browser activo.",
  "La cantidad máxima de usuarios no es par!",
 ]
 return console.error(`ERROR:  ${message[i]}`), exit(1);
}