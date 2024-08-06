const {test,expect}= require('@playwright/test'); 

test('First Playwright test', async ({browser,page})=>
{

 //const context = await browser.newContext();
 //const page = await context.newPage();
 await page.goto("https://www.google.com/")
 await page.title()
 console.log(await page.title());
 await expect(page).toHaveTitle("Google");
});

test  ('Second Playwright test', async ({browser,page})=>
    {
    
     //const context = await browser.newContext();
     //const page = await context.newPage();
     const username = page.locator('#username');
     const password = page.locator('#password');
     const submitbutton = page.locator('#signInBtn');
     const cardTitles = page.locator(".card-body a");
     await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
     await page.title()
     console.log(await page.title());
     //await expect(page).toHaveTitle("Google");
     await username.fill("kalki movie");
     await password.fill("kalki movie");
     await submitbutton.click();
      console.log(await page.locator("[style*='block']").textContent());
     await expect(page.locator("[style*='block']")).toContainText('Incorrect');

     await username.fill("");
     await username.fill("rahulshettyacademy");
     await password.fill("learning");
     await submitbutton.click();
    // traversing from parent to child
     console.log(await cardTitles.nth(0).textContent()); //or console.log(await page.locator(".card-body a").first().textContent())

     //get all the titles
      const allTitles = await cardTitles.allTextContents();  
      console.log(allTitles)

    }
);