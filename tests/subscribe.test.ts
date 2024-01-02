import { Builder, By, WebDriver } from "selenium-webdriver";
import { HomePage } from "../core/page-objects/home-page";
import { createDriver, quitDriver } from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";
import { SubscribePage } from "../core/page-objects/subscribe-page";

const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

let driver: WebDriver;
let homePage: HomePage;
let subscribePage: SubscribePage;

beforeAll(async () => {
	driver = await createDriver(testData.url.homepage);
	homePage = new HomePage(driver);
	subscribePage = new SubscribePage(driver);
}, 100000);

test("Should subscribe", async () => {
	await homePage.closePopUp();
	await homePage.selectEurope();
	await homePage.selectArea();
	await homePage.closeCookies();
	await subscribePage.scrollToBottom();
	await subscribePage.loadSubscribeBanner();
	await subscribePage.clickSubscribeBanner();
	await subscribePage.enterEmail();
	await subscribePage.clickPrijaviSeButton();
}, 100000);

afterAll(async () => {
	await quitDriver(driver);
}, 100000);
