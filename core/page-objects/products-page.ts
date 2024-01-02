import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";
import { HomePage } from "./home-page";

const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class ProductPage extends BasePage {
    constructor(driver: WebDriver) {
		super(driver);
	}

    private hamburgerMenu = By.xpath('//button[@data-testid="Presentation-top-area-burger-menu"]');
    private menu = By.className("appshell-fp-sobcg6");
    private makeUpOption = By.xpath('//a[@href="/makeup"]');
    private faceOption = By.xpath('//a[@href="/makeup/face"]');
    private filterButton = By.className('filter-button-content');

    async clickHamburgerMenu() {
        await this.findElementAndClick(this.hamburgerMenu);
    }

    async findMenu() {
        await this.waitForElement(this.menu, 10000);
    }

    async findMakeUpOption() {
        await this.waitForElement(this.makeUpOption, 5000);
    }

    async clickMakeUp() {
        await this.findElementAndClickEnsuringVisible(this.makeUpOption);
    }

    async findFaceOption() {
        await this.waitForElement(this.faceOption, 5000);
    }

    async clickFace() {
        await this.findElementAndClickEnsuringVisible(this.faceOption);
    }

    async clickFilterButton() {
        await this.findElementAndClick(this.filterButton);
    }
}

