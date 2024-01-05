import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { HomePage } from "./home-page";
import { readFileSync } from "fs";
import * as path from "path";

const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class Logout extends BasePage {
	constructor(driver: WebDriver) {
		super(driver);
	}

	private logoutButton = By.xpath(
		'//div[@class="personal-menu-trpuzo"]//button[@class="personal-menu-s9rhn2"]'
	);
	private logoutModal = By.className("MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiOriDialogBase-dialogGrid logout-confirm-dialog-1e8i0pe");
    private confirmLogoutButton = By.className("MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-disableElevation MuiButtonBase-root logout-confirm-dialog-18j3e94");

	async clickLogout() {
		await this.findElementAndClick(this.logoutButton);
	}

    async handleLogoutModal() {
        try {
            await this.waitForElement(this.logoutModal, 5000);
            await this.findElementAndClickEnsuringVisible(this.confirmLogoutButton);
        } catch (error) {
            console.log("Logout modal did not appear.");
        }
    }
}
