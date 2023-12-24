import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { HomePage } from "./home-page";
import { readFileSync } from "fs";
import * as path from "path";

const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class LoginPage extends BasePage {
	constructor(driver: WebDriver) {
		super(driver);
	}

	private loginMenu = By.className("appshell-fp-fm5moe");

	private phoneInputField = By.xpath('//input[@name="Username"]');
	private passwordInputField = By.xpath('//input[@name="Password"]');
	private signInButton = By.className(
		"MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-disableElevation MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-disableElevation appshell-fp-1yhvu9i"
	);
	private nameText = By.className(
		"MuiTypography-root MuiTypography-h6 MuiTypography-noWrap MuiOriConsultantInfo-consultantName jss18 consultant-info-kjef4p"
	);

	async waitForMenu() {
		await this.waitForElement(this.loginMenu, 10000);
	}

	async enterNumber() {
		await this.fillInputField(this.phoneInputField, testData.data.phoneNumber);
	}

	async enterPassword() {
		await this.fillInputField(this.passwordInputField, testData.data.password);
	}

	async clickSignIn() {
		await this.findElementAndClick(this.signInButton);
	}

	async checkInformation() {
		await this.checkMatchingElements(this.nameText, testData.data.fullName);
	}
}
