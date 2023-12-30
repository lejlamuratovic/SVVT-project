import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { HomePage } from "./home-page";
import { readFileSync } from "fs";
import * as path from "path";

const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class SubscribePage extends BasePage {
	constructor(driver: WebDriver) {
		super(driver);
	}

	private subscribeBanner = By.xpath('//div[@class="appshell-fp-99lllh"]');

	async loadSubscribeBanner() {
		await this.waitForElement(this.subscribeBanner, 10000);
	}

	async clickSubscribeBanner() {
		await this.findElementAndClickEnsuringVisible(this.subscribeBanner);
	}
}
