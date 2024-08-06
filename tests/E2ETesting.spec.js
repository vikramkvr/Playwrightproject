const {test,expect}= require('@playwright/test'); 

test ('First Playwright test', async ({page})=>
{
const productName = 'ZARA COAT 3';
const products = page.locator(".card-body");
await page.goto("https://rahulshettyacademy.com/client");
await page.locator('#userEmail').fill('vikramkandi4151@gmail.com');
await page.locator('#userPassword').fill('Test1234');
await page.locator('#login').click();

//await page.waitForLoadState('networkidle');//this is decouraged by playwright as it is bit flaky

await page.locator(".card-body").first().waitFor();
// this dont work as playwright dont know whether all the contents are loaded or not so used above method
const titles =console.log(await page.locator(".card-body").allTextContents());

//select the product Zata coat 3
const count = await products.count();
for(let i =0; i < count; ++i)
{
    
if(await products.nth(i).locator("b").textContent() === productName)
{
    
    await products.nth(i).locator("text= Add To Cart").click();
    break;
}
}
await page.locator("[routerlink*='cart']").click();
await page.locator("div li").nth(0).waitFor();
const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
expect(bool).toBeTruthy();
await page.locator("text =Checkout").click();

//validations
//validating email id

const displayedid = await page.locator("label[type='text']").textContent();
if(displayedid === "vikramkandi4151@gmail.com")
{
    console.log("mailid's are matching "+displayedid)
}
expect(displayedid.includes("vikramkandi4151@gmail.com"));

//handling auto suggestion dropdown
await page.locator("[placeholder='Select Country']").pressSequentially("ind");
await page.locator(".ta-results").waitFor();
const selectionoption =  await page.locator(".ta-results");
await selectionoption.waitFor();
const options = selectionoption.locator("[type='button']");
console.log(options.count())

for(let i=0;i < await options.count(); ++i)
{
if(await options.nth(i).textContent() === " India")
{
    await options.nth(i).click();
    break;
}
}

//click on place order button
await page.locator("text =Place Order ").click();

//validate data in order success page

const successmessage = await page.locator(".hero-primary").textContent();
console.log(successmessage);
await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
console.log("order played successfully")

page.locator(".em-spacer-1 .ng-star-inserted").waitFor();
//getting order id and checking in orders page
const orderid = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
console.log("order id is "+orderid);
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
    if(orderid.includes(orderidcheck))
    {
        console.log("in the if loop"+i)
       await items.nth(i).locator(".btn-primary").click();
       break;

    }

}
await page.locator(".email-wrapper").waitFor();
       const orderid_summary = await page.locator(".col-text").textContent();
       console.log("orderid in summary is "+orderid_summary);
       console.log("orderid is "+orderid);
       expect(await orderid.includes(orderid_summary)).toBeTruthy();
       console.log("order id is matching");

await page.pause();
}
);