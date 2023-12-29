import { Builder, By, WebDriver } from "selenium-webdriver";
import { HomePage } from "../core/page-objects/home-page";
import { createDriver, quitDriver } from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";
import { CartPage } from "../core/page-objects/cart-page";

const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

let driver: WebDriver;
let cartPage: CartPage;
let homePage: HomePage;

beforeAll(async () => {
	driver = await createDriver(testData.url.homepage);
    homePage = new HomePage(driver);
	cartPage = new CartPage(driver);
}, 10000);

test("Should add an item to cart", async () => {
	await homePage.closePopUp();
	await homePage.selectEurope();
	await homePage.selectArea();
	await homePage.closeCookies();
    await cartPage.findNovitetiSection();
    await cartPage.retrieveProductName();
    await cartPage.clickProductItem();
    await cartPage.clickAddToCart();
    await cartPage.clickCart();
    await cartPage.checkCartProductName();
}, 50000);

test("Should remove an item from cart", async () => {
    await cartPage.clickRemoveFromCart();
    await cartPage.checkCartEmpty();
}, 50000);	

afterAll(async () => {
	await quitDriver(driver);
}, 50000);
