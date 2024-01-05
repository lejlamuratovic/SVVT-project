import { Builder, By, WebDriver } from "selenium-webdriver";
import { HomePage } from "../core/page-objects/home-page";
import { createDriver, quitDriver } from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";
import { RegistrationPage } from "../core/page-objects/registration-page";

const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

let driver: WebDriver;
let homePage: HomePage;
let registrationPage: RegistrationPage;

beforeAll(async () => {
	driver = await createDriver(testData.url.homepage);
	homePage = new HomePage(driver);
	registrationPage = new RegistrationPage(driver);
}, 10000);

test("Should register user", async () => {
	await homePage.closePopUp();
	await homePage.selectEurope();
	await homePage.selectArea();
	await homePage.closeCookies();
	await registrationPage.clickJoin();
	await registrationPage.inputPhone();
	await registrationPage.inputPassword();
	await registrationPage.clickRegister();
	await registrationPage.inputNumbers();
	await registrationPage.inputName();
	await registrationPage.inputSurname();
	await registrationPage.clickNext();
	await registrationPage.clickCheckbox();
	await registrationPage.clickFinish();
	await registrationPage.checkWelcomeHeader();
}, 50000);

afterAll(async () => {
	await quitDriver(driver);
}, 10000);
