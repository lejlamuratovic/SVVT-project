import { By, WebDriver, until, Key } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";

const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class SearchPage extends BasePage {
	constructor(driver: WebDriver) {
		super(driver);
	}

	private searchInput = By.className("appshell-fp-1mubvyr");
	private viewAllButton = By.xpath(
		'//a[@data-testid="Presentation-top-area-search-results-query"]'
	);

	private searchResult = By.xpath(
		'//div[@data-testid="Presentation-product-box-name-39391"]'
	);

	async enterSearchTerm() {
		await this.fillInputField(this.searchInput, testData.search.searchText);
	}

	async clickViewAllButton() {
		await this.findElementAndClick(this.viewAllButton);
	}
	async findSearchResult() {
		await this.checkMatchingElements(
			this.searchResult,
			testData.search.searchResult
		);
	}
}
