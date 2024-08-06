const {test,expect}= require('@playwright/test'); 

test ('differenttypes of identifiers/locators', async ({page})=>
{
await page.goto("https://rahulshettyacademy.com/angularpractice/");
await page.getByLabel("Check me out if you Love IceCreams!").click();
await page.getByLabel("Employed").check(); // for radio or check box ,either check or click can be used
await page.getByLabel("Gender").selectOption("Male");

await page.getByPlaceholder("Password").fill("test1234");

await page.getByRole("button",{name:'Submit'}).click(); //here you can give the name that is visible in the page instead of what is there in properties
await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

await page.getByRole("link",{name:"Shop"}).click();
// you can click on available options without looping, and can chain the locator and click another associated element
console.log("here I am")
page.locator(".col-lg-9").waitFor();
//await page.locator("app-card").filter({hasText: 'iphone X'}).getByRole("button",{name:'Add '}).click();  //not working correct it

await page.pause();

}
);

test ('calendar selection', async ({page})=>
{
const month = "6";
const date = "20"
const year = "2027"

await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
await page.locator(".react-date-picker__inputGroup").click();

await page.locator(".react-calendar__navigation__label").click();
await page.locator(".react-calendar__navigation__label").click();
await page.getByText(year).click();

await page.locator(".react-calendar__year-view__months button").nth(Number(month)-1).click();

await page.locator("//abbr[text()="+date+"]").click();
await page.pause();
}
);

test ('validations hidden-visible', async ({page})=>
    {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
   //for navigation
   // await page.pause();
   // await page.goto("https://www.google.com/");
   // await page.goBack();
   // await page.goForward();
    await page.pause();
   await expect(page.locator("#displayed-text")).toBeVisible();
   await page.locator("//input[@id='hide-textbox']").click();
   await expect(page.locator("//input[@id='displayed-text']")).toBeHidden();
    
    }
    );

    test ('handling dialouge-javapopups, mousehover and Frames', async ({page})=>
        {
        await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
       
       await page.pause();
       await page.on('dialog',dialog => dialog.accept());
       await page.locator("#confirmbtn").click();

       //mousehovering
       await page.locator("#mousehover").hover();

       //handling frames--------------
       const framespage = await page.frameLocator("#courses-iframe");
        //when two elements are identified in element validation in f12 and second one is not visible, use the below keyword :visible
       await framespage.locator("li a[href='lifetime-access']:visible").click();
       const totalsubscribers = await framespage.locator(".text h2").textContent();
       const text = totalsubscribers.split(" ");
       console.log(text[1]);

        }
        );