import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { HomePage } from "./home-page";
import { readFileSync } from "fs";
import * as path from "path";

const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class ChangePasswordPage extends BasePage {
	constructor(driver: WebDriver) {
		super(driver);
	}

	private profileSettingsButton = By.xpath(
		'//li[@class="personal-menu-1c7raqz"]//a[@href="/mypages/profile"]'
	);

	async clickProfileSettings() {
		await this.findElementAndClick(this.profileSettingsButton);
	}
}
