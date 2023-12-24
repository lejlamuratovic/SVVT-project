import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";

export class HomePage extends BasePage {
    private europeSelection = By.xpath("//span[@aria-controls='sect1']");
    public areaSelection = By.xpath("//a[@data-market='BA']/span[@class='upper']");
    private signInButton = By.className("MuiButtonBase-root appshell-fp-c4fa8z");
    private closePopUpButton = By.xpath("//span[@class='button secondary popup-close']");

    constructor(driver: WebDriver) {
        super(driver);
    }

    async closePopUp() {
        await this.findElementAndClick(this.closePopUpButton);
    }

    async selectEurope() {
        await this.findElementAndClick(this.europeSelection);
    }

    async selectArea() {
        await this.findElementAndClickEnsuringVisible(this.areaSelection);
    }

    async clickSignIn() {
        await this.findElementAndClick(this.signInButton);
    }
}
