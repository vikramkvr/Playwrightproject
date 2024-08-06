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

await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route=>
    {
        const response = await page.request.fetch(route.request());
        let body = JSON.stringify(fakePayLoadOrders);
        route.fulfill(
            {
                response,
                body,

            }
        )
    }

)
//click on orders tab
//validating orderid from orderspage
await page.pause();
await page.locator("li [routerlink='/dashboard/myorders']").click();
await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
console.log(await page.locator(".mt-4").textContent());
//await page.locator("tbody").waitFor();
//const items= await page.locator("tbody tr");

}


)