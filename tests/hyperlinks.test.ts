import { Builder, By, WebDriver } from "selenium-webdriver";
import { HomePage } from "../core/page-objects/home-page";
import { createDriver, quitDriver } from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";
import { HyperlinksPage } from "../core/page-objects/hyperlinks-page";

const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

let driver: WebDriver;
let homePage: HomePage;
let hyperlinksPage: HyperlinksPage;

beforeAll(async () => {
	driver = await createDriver(testData.url.homepage);
	homePage = new HomePage(driver);
	hyperlinksPage = new HyperlinksPage(driver);
}, 10000);

test("Should redirect from hyperlinks", async () => {
	await homePage.closePopUp();
	await homePage.selectEurope();
	await homePage.selectArea();
	await homePage.closeCookies();
	await hyperlinksPage.scrollToBottomPage();
	await hyperlinksPage.findHyperlinksSection();
	await hyperlinksPage.clickInstagramIcon();
	await hyperlinksPage.compareUrls();
}, 50000);

afterAll(async () => {
	await quitDriver(driver);
}, 50000);
