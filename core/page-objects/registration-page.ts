import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";
import { HomePage } from "./home-page";

const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class RegistrationPage extends BasePage {
    private joinButton = By.className("MuiTypography-root MuiTypography-body1 MuiLink-root MuiLink-underlineAlways appshell-fp-1w353el");
    private phoneInput = By.xpath("//input[@id='mui-2']");
    private passwordInput = By.xpath("//input[@id='mui-3']");
    private registerButton = By.xpath('//span[@data-key="Prestep_Button"]');
    private nameInput = By.xpath("//input[@id='mui-8']");
    private surnameInput = By.xpath('//input[@id="mui-12"]');
    private nextButton = By.className("MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-disableElevation MuiButtonBase-root simplified-registration-spa-1lfskin");
    private checkbox = By.xpath('//span[@data-testid="Acquisition-simplified-registration-termsAndConditions-checkbox-field"]//input[@class="PrivateSwitchBase-input simplified-registration-spa-1m9pwf3"]');
    private finishButton = By.xpath('//button[@data-testid="Acquisition-simplified-registration-submit-btn-legalForm"]');
    private welcomeHeader = By.xpath('//span[@data-key="Welcome_Header"]');

    private verificationInputs = [
        By.id("mui-1"),
        By.id("mui-2"),
        By.id("mui-3"),
        By.id("mui-4"),
        By.id("mui-5"),
        By.id("mui-6")
    ];

    async clickJoin() {
        await this.findElementAndClickEnsuringVisible(this.joinButton);
    }

    async inputPhone() {
        await this.fillInputField(this.phoneInput, testData.data.phoneNumber);
    }

    async inputPassword() {
        await this.fillInputField(this.passwordInput, testData.data.password);
    }

    async clickRegister() {
        await this.findElementAndClick(this.registerButton);
    }

    // async selectVerificationInput() {
    //     await this.findElementAndClick(this.verificationInput);
    // }

    async inputNumbers() {
        const verificationCodeStr = testData.data.verificationCode.toString();
        const digits = verificationCodeStr.split('');

        for (let i = 0; i < digits.length; i++) {
            await this.fillInputField(this.verificationInputs[i], digits[i]);
            await this.driver.sleep(500); // delay of 500 milliseconds between each digit
        }
    }

    async inputName() {
        await this.fillInputField(this.nameInput, testData.data.name);
    }

    async inputSurname() {
        await this.fillInputField(this.surnameInput, testData.data.surname);
    }

    async clickNext() {
        const nextButton = await this.waitForElement(this.nextButton, 10000);
        await this.driver.executeScript("arguments[0].scrollIntoView(true);", nextButton);
        await this.driver.sleep(10000);
        await this.hoverElement(nextButton);
        await nextButton.click();
    }

    async clickCheckbox() {
        await this.findElementAndClickEnsuringVisible(this.checkbox);
    }

    async clickFinish() {
        await this.findElementAndClickEnsuringVisible(this.finishButton);
    }

    async checkWelcomeHeader() {
        await this.findElement(this.welcomeHeader);
    }
}

