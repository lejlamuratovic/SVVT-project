import { Builder, By, WebDriver } from "selenium-webdriver";
import { HomePage } from "../core/page-objects/home-page";
import { createDriver, quitDriver } from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";
import { SubscribePage } from "../core/page-objects/subscribe-page";
import { OrderPage } from "../core/page-objects/order-page";
import { LoginPage } from "../core/page-objects/login-page";
import { CartPage } from "../core/page-objects/cart-page";

const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

let driver: WebDriver;
let homePage: HomePage;
let loginPage: LoginPage;
let cartPage: CartPage;
let orderPage: OrderPage;

beforeAll(async () => {
	driver = await createDriver(testData.url.homepage);
	homePage = new HomePage(driver);
    loginPage = new LoginPage(driver);
    cartPage = new CartPage(driver);
	orderPage = new OrderPage(driver);
}, 10000);

test("Should perform order", async () => {
    await homePage.closePopUp();
	await homePage.selectEurope();
	await homePage.selectArea();
	await homePage.clickSignIn();
    await homePage.closeCookies();
	await loginPage.waitForMenu();
	await loginPage.enterNumber();
	await loginPage.enterPassword();
	await loginPage.clickSignIn();
	await loginPage.checkInformation();
    await homePage.clickHomepage();
    await cartPage.findNovitetiSection();
    await cartPage.retrieveProductName();
    await cartPage.clickProductItem();
    await cartPage.clickAddToCart();
    await cartPage.clickCart();
    await cartPage.checkCartProductName();
    await orderPage.clickObrada();
    await orderPage.clickNastavi();
    await orderPage.clickPromjena();
    await orderPage.clickNovaAdresa();
    await orderPage.enterCity();
    await orderPage.waitForMenu();
    await orderPage.selectCity();
    await orderPage.enterAddress();
    await orderPage.clickPrimaryAddress();
    await orderPage.clickSave();
    await orderPage.checkEnteredPostalCode();
    await orderPage.checkEnteredCity();
    await orderPage.clickNastavi2();
    // await orderPage.clickPaymentOption();
    // await orderPage.clickNastavi2();
}, 100000);

afterAll(async () => {
	await quitDriver(driver);
}, 10000);
