import { By, WebDriver, until, Key } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";

const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class CartPage extends BasePage {
	constructor(driver: WebDriver) {
		super(driver);
	}

    private novitetiSection = By.xpath('//section[@class="appshell-fp-11cwd70"]//div[@class="appshell-fp-dd57ph"]//div[@class="MuiTypography-root MuiTypography-h3 appshell-fp-xy50po"]'
    );
    private productItem = By.xpath('//a[@data-testid="Presentation-product-box-46217"]');
    private productName = By.xpath('//a[@data-testid="Presentation-product-box-46217"]//div[@data-testid="Presentation-product-box-name-46217"]'
    );
    private actualProductName;
    private addToCartButton = By.xpath('//button[@class="MuiButtonBase-root OriMuiSplitButton-button product-detail-c3kzf"]');
    private cartButton = By.xpath('//a[@data-testid="Presentation-top-area-shopping-bag-icon-root"]');
    private cartProductName = By.className("MuiTypography-root MuiTypography-body1 MuiTypography-noWrap shopping-bag-step-one-tg83iq");
    private removeFromCartButton = By.xpath('//button[@data-testid="Checkout-shopping-bag-step-1-products-item-46217-P-image-remove"]');
    private emptyCart = By.className("MuiTypography-root MuiTypography-h4 MuiTypography-gutterBottom shopping-bag-step-one-1fkeb6");


    async findNovitetiSection() {
        await this.findElementAndEnsureVisible(this.novitetiSection);
    }

    async retrieveProductName() {
        this.actualProductName = await this.retrieveText(this.productName);
    }

    async clickProductItem() {
        await this.findElementAndClick(this.productItem);
    }

    async clickAddToCart() {
        await this.findElementAndClick(this.addToCartButton);
    }

    async clickCart() {
        await this.findElementAndClick(this.cartButton);
    }

    async checkCartProductName() {
        await this.checkMatchingElements(this.cartProductName, this.actualProductName);
    }

    async clickRemoveFromCart() {
        await this.findElementAndClick(this.removeFromCartButton);
    }

    async checkCartEmpty() {
        await this.checkMatchingElements(this.emptyCart, testData.cart.emptyCart);
    }
}
