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
	private emailInputField = By.xpath(
		'//input[@aria-describedby="e-mail-helper-text"]'
	);
	private prijaviSeButton = By.className(
		"MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-disableElevation MuiButton-fullWidth MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-disableElevation MuiButton-fullWidth appshell-fp-j8aej8"
	);

	async loadSubscribeBanner() {
		await this.waitForElement(this.subscribeBanner, 10000);
	}

	async clickSubscribeBanner() {
		await this.scrollElementIntoViewAndClick(this.subscribeBanner);
	}

	async enterEmail() {
		await this.fillInputField(this.emailInputField, testData.data.email);
	}

	async clickPrijaviSeButton() {
		await this.findElementAndClickEnsuringVisible(this.prijaviSeButton);
	}
}
