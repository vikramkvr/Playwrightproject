const {test,expect, request}= require('@playwright/test'); 
const {APiUtils} = require('../utils/APiUtils');

const loginPayLoad = {userEmail: "vikramkandi4151@gmail.com", userPassword: "Test1234"};
const orderPayLoad = {orders:[{country: "India", productOrderedId: "6581ca399fd99c85e8ee7f45"}]};

let response;

test.beforeAll( async()=>
{
    const apiContext =  await request.newContext();
    const apiUtils = new APiUtils(apiContext,loginPayLoad);
   response = await apiUtils.createOrder(orderPayLoad);
   
}
);
test.beforeEach( ()=>
{

}

);




test ('APIand WebTC', async ({page})=>
    {
        
        page.addInitScript(value =>
            {
             window.localStorage.setItem('token', value);
         
            }, response.token);

    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    
    //click on orders tab
    //validating orderid from orderspage
    await page.locator("li [routerlink='/dashboard/myorders']").click();
    await page.locator("tbody").waitFor();
    const items= await page.locator("tbody tr");
    console.log(await items.count());
    for(let i=0; i< await items.count(); ++i)
    {
        const orderidcheck = await items.nth(i).locator("th").textContent();
        console.log("orderid looped is "+orderidcheck)
        if(response.orderid.includes(orderidcheck))
        {
            console.log("in the if loop"+i)
           await items.nth(i).locator(".btn-primary").click();
           break;
    
        }
    
    }
    await page.locator(".email-wrapper").waitFor();
           const orderid_summary = await page.locator(".col-text").textContent();
           console.log("orderid in summary is "+orderid_summary);
           console.log("orderid is "+response.orderid);
           expect(await response.orderid.includes(orderid_summary)).toBeTruthy();
           console.log("order id is matching");
    
    await page.pause();
    }
    );