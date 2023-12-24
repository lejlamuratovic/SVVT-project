import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { HomePage } from "./home-page";
import { readFileSync } from "fs";
import * as path from "path";

const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class Logout extends BasePage {
	constructor(driver: WebDriver) {
		super(driver);
	}

	private logoutButton = By.xpath(
		'//div[@class="personal-menu-trpuzo"]//button[@class="personal-menu-s9rhn2"]'
	);

	async clickLogout() {
		await this.findElementAndClick(this.logoutButton);
	}
}
