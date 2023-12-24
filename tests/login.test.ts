import { Builder, By, WebDriver } from "selenium-webdriver";
import { HomePage } from "../core/page-objects/home-page";
import { createDriver, quitDriver } from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";
import { LoginPage } from "../core/page-objects/login-page";

const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

let driver: WebDriver;
let homePage: HomePage;
let loginPage: LoginPage;

beforeAll(async () => {
	driver = await createDriver(testData.url.homepage);
	homePage = new HomePage(driver);
	loginPage = new LoginPage(driver);
}, 10000);

test("Should login the user", async () => {
	await homePage.closePopUp();
	await homePage.selectEurope();
	await homePage.selectArea();
	await homePage.clickSignIn();
	await loginPage.waitForMenu();
	await loginPage.enterNumber();
	await loginPage.enterPassword();
	await loginPage.clickSignIn();
	await loginPage.checkInformation();
}, 50000);

afterAll(async () => {
	await quitDriver(driver);
}, 50000);
