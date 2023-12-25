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

	private secirityButton = By.xpath(
		`//div[@class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation0 MuiCard-root profile-spa-4qj97g"]//a[@href="#/security"]`
	); 

	private oldPasswordInput = By.name("oldPassword");

	private newPasswordInput = By.name("newPassword");

	private confirmButton = By.xpath('//button[@data-testid="Acquisition-react-profile-change-password-save-button"]'
	);

	async clickProfileSettings() {
		await this.findElementAndClick(this.profileSettingsButton);
	}

	async clickSecurity() {
		await this.findElementAndClick(this.secirityButton);
	}

	async enterOldPassword() {
		await this.fillInputField(
			this.oldPasswordInput,
			testData.changePassword.oldPassword
		);
	}

	async enterNewPassword() {
		await this.fillInputField(
			this.newPasswordInput,
			testData.changePassword.newPassword
		);
	}

	async clickConfirm() {
		await this.findElementAndClickEnsuringVisible(this.confirmButton);
	}
}
