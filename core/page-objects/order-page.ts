import { Builder, By, WebDriver, WebElement, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";
import { HomePage } from "./home-page";

const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class OrderPage extends BasePage {
    constructor(driver: WebDriver) {
		super(driver);
	}

    private obradaButton = By.className("w-buttons summary-panel-buttons js-summary-panel-buttons centered-summary-buttons");
    private nastaviButton = By.className("w-buttons summary-panel-buttons js-summary-panel-buttons centered-summary-buttons");
    private promjenaButton = By.className("checkout-delivery-emotion-cache-key-759u60");      
    private novaAdresaButton = By.xpath('//div[@data-testid="Checkout-checkout-delivery-new-delivery"]');
    private searchCityInput = By.name("address-form-autocomplete");
    private citySelectionMenu = By.className("MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiAutocomplete-paper address-form-1il90rz");
    private citySelection = By.xpath("//li[.//div/span[contains(text(), '71000')]]");
    private primaryAddressCheckBox = By.name("isPrimary");
    private addressInput = By.name("streetAddress");
    private saveButton = By.className("MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 address-form-15zaolx");
    private enteredAddress = By.xpath('//span[@data-testid="Checkout-checkout-delivery-delivery-box-street-address"]');
    private enteredPostalCode = By.xpath('//span[@data-testid="Checkout-checkout-delivery-delivery-box-zip-code"]');
    private enteredCity = By.xpath('//span[@data-testid="Checkout-checkout-delivery-delivery-box-city"]');
    private deliveryOption = By.xpath("//div[@data-testid='Checkout-checkout-delivery-courier-box'][.//figcaption[contains(text(), 'X Express')]]");
    private nastaviButton2 = By.xpath("//span[contains(text(), 'Plaćanje')]");
    private paymentOption = By.xpath("checkout-payment-1fhhsfl");
    private nastaviButton3 = By.className("w-buttons summary-panel-buttons js-summary-panel-buttons centered-summary-buttons");


    async clickObrada() {
        await this.findElementAndClick(this.obradaButton);
    }

    async clickNastavi() {
        await this.findElementAndClick(this.nastaviButton);
    }

    async clickPromjena() {
        await this.findElementAndClick(this.promjenaButton);
    }

    async clickNovaAdresa() {
        await this.waitAndClick(this.novaAdresaButton, 10000);
    }

    async enterCity() {
        await this.fillInputField(this.searchCityInput, testData.order.city);
    }

    async enterAddress() {
        await this.fillInputField(this.addressInput, testData.order.address);
        await this.driver.sleep(5000); // warning message?
    }

    async waitForMenu() {
        await this.waitForElement(this.citySelectionMenu, 10000);
    }

    async selectCity() {
        await this.findElementAndClick(this.citySelection);
    }

    async clickPrimaryAddress() {
        await this.findElementAndClickEnsuringVisible(this.primaryAddressCheckBox);
    }

    async clickSave() {
        await this.findElementAndClickEnsuringVisible(this.saveButton);
    }

    async checkEnteredAddress() {
        await this.checkMatchingElements(this.enteredAddress, testData.order.address);
    }

    async checkEnteredPostalCode() {
        await this.checkMatchingElements(this.enteredPostalCode, testData.order.postalCode);
    }

    async checkEnteredCity() {
        await this.checkMatchingElements(this.enteredCity, testData.order.city.toUpperCase());
    }

    async clickDeliveryOption() {
        await this.findElementAndClickEnsuringVisible(this.deliveryOption);
    }

    async clickNastavi2() {
        await this.waitAndClick(this.nastaviButton2, 10000);
    }

    async clickPaymentOption() {
        await this.findElementAndClick(this.paymentOption);
    }

    async clickNastavi3() {
        await this.waitAndClick(this.nastaviButton3, 10000);
    }
}

