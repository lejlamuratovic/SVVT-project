import { Builder, By, WebDriver } from "selenium-webdriver";
import { HomePage } from "../core/page-objects/home-page";
import { createDriver, quitDriver } from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";
import { LoginPage } from "../core/page-objects/login-page";
import { ChangePasswordPage } from "../core/page-objects/change-password-page";

const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

let driver: WebDriver;
let homePage: HomePage;
let loginPage: LoginPage;
let changePasswordPage: ChangePasswordPage;

beforeAll(async () => {
	driver = await createDriver(testData.url.homepage);
	homePage = new HomePage(driver);
	loginPage = new LoginPage(driver);
	changePasswordPage = new ChangePasswordPage(driver);
}, 10000);

test("Should change the user's password", async () => {
	await homePage.closePopUp();
	await homePage.selectEurope();
	await homePage.selectArea();
	await homePage.clickSignIn();
	await loginPage.waitForMenu();
	await loginPage.enterNumber();
	await loginPage.enterPassword();
	await loginPage.clickSignIn();
	await loginPage.checkInformation();
	// await changePasswordPage.clickProfileSettings();
}, 60000);

afterAll(async () => {
	await quitDriver(driver);
}, 60000);
