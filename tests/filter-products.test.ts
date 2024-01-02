import { Builder, By, WebDriver } from "selenium-webdriver";
import { HomePage } from "../core/page-objects/home-page";
import { createDriver, quitDriver } from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";
import { HyperlinksPage } from "../core/page-objects/hyperlinks-page";
import { ProductPage } from "../core/page-objects/products-page";

const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

let driver: WebDriver;
let homePage: HomePage;
let productsPage: ProductPage;

beforeAll(async () => {
	driver = await createDriver(testData.url.homepage);
	homePage = new HomePage(driver);
    productsPage = new ProductPage(driver);
}, 10000);

test("Should filter products on search", async () => {
    await homePage.closePopUp();
    await homePage.selectEurope();
    await homePage.selectArea();
    await homePage.closeCookies();
    await productsPage.clickHamburgerMenu();
    await productsPage.findMenu();
    await productsPage.findMakeUpOption();
    await productsPage.clickMakeUp();
    await productsPage.findFaceOption();
    await productsPage.clickFace();
    await productsPage.findFoundationOption();
    await productsPage.clickFoundation();
    await productsPage.clickFilterButton();
    await productsPage.clickPriceFilter();
    await productsPage.arePricesSortedLowToHigh();
}, 50000);

afterAll(async () => {
	await quitDriver(driver);
}, 50000);
