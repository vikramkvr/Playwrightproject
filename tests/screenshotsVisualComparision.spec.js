const {test,expect}= require('@playwright/test'); 

test ('screenshots and visual comparision', async ({page})=>
    {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
   //for navigation
   // await page.pause();
   // await page.goto("https://www.google.com/");
   // await page.goBack();
   // await page.goForward();
    await page.pause();
   await expect(page.locator("#displayed-text")).toBeVisible();
   //partial screenshot
   await page.locator("#displayed-text").screenshot({path: 'partialscreenshot.png'});
   await page.locator("//input[@id='hide-textbox']").click();
   //complete page screenshot
   await page.screenshot({path: 'screenshot.png'});

   await expect(page.locator("//input[@id='displayed-text']")).toBeHidden();
    
    }
);

test('visual comparision test', async({page})=>
{
    await page.goto("https://www.google.com/");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
}

)