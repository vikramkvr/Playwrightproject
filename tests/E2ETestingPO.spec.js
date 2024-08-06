const {test,expect}= require('@playwright/test'); 
const {POManager}= require('../pageobjects/POManager');
const { customtest } = require('../utils/test-base');
const dataset = JSON.parse(JSON.stringify(require('../utils/placeorderTestData.json')));


for(const data of dataset)
{
test (`Client App Login ${data.productName}`, async ({page})=>
{
    const poManager = new POManager(page);
   // const username = "vikramkandi4151@gmail.com";
   // const password = "Test1234";
   // const productName = "ZARA COAT 3";
//const products = page.locator(".card-body");
const loginPage = poManager.getLoginPage();
await loginPage.goTo();
await loginPage.validLogin(data.username,data.password);
const dashboardPage = poManager.getDashboardPage();
await dashboardPage.searchProductAddCart(data.productName);
await dashboardPage.navigateTOCart(); 

const cartPage = poManager.getCarPage();
await cartPage.VerifyProductsIsDisplayed(data.productName);
await cartPage.Checkout();

const ordersReviewPage = poManager.getOrdersReviewPage();
await ordersReviewPage.searchCountryAndSelect("ind","India");
const orderId = await ordersReviewPage.SubmitAndGetOrderId();
console.log(orderId);

await dashboardPage.navigateToOrders();
const ordersHistoryPage = poManager.getOrdersHistoryPage();
ordersHistoryPage.searchOrderAndSelect(orderId);
expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

  console.log("order id is matching");
await page.pause();
}

);
}


// this is other way , where we provide the data as fixture to customtest -- example for customizing test behaviour
customtest(`CLient App Login`,async({page,testDataForOrder})=>
{
    const poManager = new POManager(page);
    const username = "vikramkandi4151@gmail.com";
    const password = "Test1234";
const productName = "ZARA COAT 3";
//const products = page.locator(".card-body");
const loginPage = poManager.getLoginPage();
await loginPage.goTo();
await loginPage.validLogin(testDataForOrder.username,testDataForOrder.password);
const dashboardPage = poManager.getDashboardPage();
await dashboardPage.searchProductAddCart(testDataForOrder.productName);
await dashboardPage.navigateTOCart(); 




}




)