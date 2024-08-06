const {test,expect,request}= require('@playwright/test'); 
const {APiUtils} = require('./utils/APiUtils');
const loginPayLoad = {userEmail: "vikramkandi4151@gmail.com", userPassword: "Test1234"};
const orderPayLoad = {orders:[{country: "India", productOrderedId: "6581ca399fd99c85e8ee7f45"}]};
const fakePayLoadOrders = {data:[],message:"No Orders"};
let response;

test.beforeAll( async()=>
{
    const apiContext =  await request.newContext();
    const apiUtils = new APiUtils(apiContext,loginPayLoad);
   response = await apiUtils.createOrder(orderPayLoad);
   
}
)

test('intercept concept test', async({page})=>
{
    page.addInitScript(value =>
        {
         window.localStorage.setItem('token', value);
     
        }, response.token);

const productName = 'ZARA COAT 3';
const products = page.locator(".card-body");
await page.goto("https://rahulshettyacademy.com/client");

await page.locator("li [routerlink='/dashboard/myorders']").click();

await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    async route=> route.continue({url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=669a42cdae2afd4c0b2af334'}))
await page.locator("button:has-text('View')").first().click();

await page.pause();
//can have assertion to validate the unauthorized message

}


)