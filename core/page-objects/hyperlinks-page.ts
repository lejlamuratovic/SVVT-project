import { By, WebDriver, until, Key } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";

const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class HyperlinksPage extends BasePage {
	constructor(driver: WebDriver) {
		super(driver);
	}

	private hyperlinksSection = By.className('appshell-fp-1d3yqbi');
	private instagramIcon = By.className('MuiOriSocialIcon-root MuiOriSocialIcon-sizeSmall MuiOriSocialIcon-kindInstagram appshell-fp-1ats04p');

	async scrollToBottomPage() {
		await this.scrollToBottom();
	}

	async findHyperlinksSection() {
		await this.scrollElementIntoView(this.hyperlinksSection);
	}

	async clickInstagramIcon() {
		await this.scrollElementIntoViewAndClick(this.instagramIcon);
	}

	// async clickInstagramIcon() {
	// 	await this.findElementAndClickEnsuringVisible(this.instagramIcon);
	// }

	async compareUrls() {
		await this.checkCurrentUrl(testData.hyperlinks.instagram);
	}
}
