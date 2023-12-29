import { By, WebDriver, WebElement, until, Key } from "selenium-webdriver";
export default class BasePage {
	protected driver: WebDriver;

	constructor(driver: WebDriver) {
		this.driver = driver;
	}

	async getTitle() {
		return await this.driver.getTitle();
	}

	async checkMatchingElements(selector: By, matchingItem: string) {
		const element = await this.findElement(selector);
		const elementText = await element.getText();
		expect(elementText).toMatch(matchingItem);
	}

	async retrieveText(selector: By) {
		const element = await this.findElement(selector);
		return await element.getText();
	}

	async findElement(selector: By) {
		return await this.driver.findElement(selector);
	}

	async checkTitle(
		page: { getTitle: () => Promise<string> },
		page_title: string
	) {
		let title = await page.getTitle();
		expect(title).toMatch(page_title);
	}

	async findElementAndClick(selector: By) {
		await this.driver.wait(until.elementLocated(selector), 10000).click();
	}

	async waitAndClick(elementLocator, timeout) {
		await this.driver
			.wait(until.elementLocated(elementLocator), timeout)
			.click();
	}

	async waitForElement(elementLocator, timeout) {
		return this.driver.wait(until.elementLocated(elementLocator), timeout);
	}

	async hoverElement(element: WebElement) {
		const actions = this.driver.actions({ bridge: true });
		await actions
			.move({ duration: 2000, origin: element, x: 0, y: 0 })
			.perform();
	}

	async fillInputField(inputField: By, text: string) {
		await (await this.findElement(inputField)).sendKeys(text);
	}

	// to ensure there is no overlay on top of the element
	async findElementAndEnsureVisible(selector: By) {
		const element = await this.waitForElement(selector, 10000);
		await this.driver.executeScript(
			"arguments[0].scrollIntoView(true);",
			element
		);
		await this.driver.sleep(1000); // sleep to ensure any overlays have time to disappear
		return element;
	}

	async findElementAndClickEnsuringVisible(selector: By) {
		const element = await this.findElementAndEnsureVisible(selector);
		await this.hoverElement(element);
		await element.click();
	}
}
