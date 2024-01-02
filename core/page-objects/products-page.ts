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
    private makeUpOption = By.xpath('//li[contains(., "Make-up")]');
    private faceOption = By.xpath('//a[@href="/makeup/face"]//div[@class="heading js-cut-short"]');
    private foundationOption = By.xpath('//li[@data-testid="Presentation-navlink-_makeup_face_foundation"]');
    private filterButton = By.className('filter-button-content');
    private priceFilter = By.xpath('//label[@for="pricelow"]');
    private prirodniEfekatCheckbox = By.xpath('//label[@for="control-f7d4dd1a-e633-4958-85b9-5ebd25d21b2e"]');
    private giordaniGoldFoundation = By.xpath('//label[@for="control-e7d539c9-1c57-4e83-af62-35fdebcf6360"]');
    private productPrices = By.className("product-box-spa-wsqiaw");

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
        await this.findElementAndClick(this.makeUpOption);
    }

    async findFaceOption() {
        await this.waitForElement(this.faceOption, 5000);
    }

    async clickFace() {
        await this.findElementAndClick(this.faceOption);
    }

    async findFoundationOption() {
        await this.waitForElement(this.foundationOption, 5000);
    }

    async clickFoundation() {
        await this.findElementAndClick(this.foundationOption);
    }

    async clickFilterButton() {
        await this.findElementAndClick(this.filterButton);
    }

    async clickPrirodniEfekatCheckbox() {
        await this.scrollElementIntoViewAndClick(this.prirodniEfekatCheckbox);
    }

    async clickGiordaniGoldFoundation() {
        await this.scrollElementIntoViewAndClick(this.giordaniGoldFoundation);
    }

    async clickPriceFilter() {
        await this.findElementAndClick(this.priceFilter);
        await this.driver.sleep(5000); // sleep to allow the page to refresh
    }

    async arePricesSortedLowToHigh() {
        // to retrieve the price elements
        const priceElements = await this.driver.findElements(this.productPrices);
        
        // parse the prices into numbers
        let prices: number[] = [];
        for (const element of priceElements) {
            const priceText = await element.getText();
            const price = parseFloat(priceText.replace(/[^0-9.]/g, "")); // to remove non-numeric characters
            prices.push(price);
        }

        // check if sorted in ascending order
        for (let i = 0; i < prices.length - 1; i++) {
            if (prices[i] > prices[i + 1]) {
                return false;
            }
        }
        
        return true;
    }
}

