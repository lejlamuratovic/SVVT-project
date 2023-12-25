import { Builder, By, WebDriver } from "selenium-webdriver";
import { HomePage } from "../core/page-objects/home-page";
import { createDriver, quitDriver } from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";
import { SearchPage } from "../core/page-objects/search-page";

const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

let driver: WebDriver;
let homePage: HomePage;
let searchPage: SearchPage;

beforeAll(async () => {
	driver = await createDriver(testData.url.homepage);
	homePage = new HomePage(driver);
	searchPage = new SearchPage(driver);
}, 10000);

test("Should search for an item", async () => {
	await homePage.closePopUp();
	await homePage.selectEurope();
	await homePage.selectArea();
	await homePage.closeCookies();
	await searchPage.enterSearchTerm();
	await searchPage.clickViewAllButton();
	await searchPage.findSearchResult();
}, 50000);

afterAll(async () => {
	await quitDriver(driver);
}, 50000);
