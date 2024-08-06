const {test,expect}= require('@playwright/test'); 


test.describe.configure({mode:'parallel'});
test ('First Playwright test', async ({page})=>
{

await page.goto("https://rahulshettyacademy.com/client");
await page.locator('#userEmail').fill('vikramkandi4151@gmail.com');
await page.locator('#userPassword').fill('Test1234');
await page.locator('#login').click();

//await page.waitForLoadState('networkidle');//this is decouraged by playwright as it is bit flaky

await page.locator(".card-body b").first().waitFor();
// this dont work as playwright dont know whether all the contents are loaded or not so used above method
console.log(await page.locator(".card-body b").allTextContents());


}
);
test('UI Controls', async ({page})=>
    {

        const blinklink = await page.locator('.blinkingText');
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    
    //selecting static dropdown
    const dropdown = page.locator('select.form-control');
    await dropdown.selectOption("consult");
    
    
    //selecting radio button
   await page.locator('.radiotextsty').last().click();
   await page.locator('#okayBtn').click();
   console.log(await page.locator('.radiotextsty').last().isChecked());
   await expect(page.locator('.radiotextsty').last()).toBeChecked(); // validations
   //await page.pause(); // this pauses the page before close

   //checkbox, validation
   await page.locator('#terms').click();
   await expect(page.locator('#terms')).toBeChecked();
   await page.locator('#terms').uncheck();
    expect(await page.locator('#terms').isChecked()).toBeFalsy();

    //validate blinking text
    await expect(blinklink).toHaveAttribute("class","blinkingText");
    }
    );


    
    test('handling child windows', async ({browser})=>
        {
            //this test is used to handle child windows and tabs
        const context = await browser.newContext();
        const page = await context.newPage();
        
            
            await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
            await page.pause();
            const blinklink =  page.locator('.blinkingText');
            const [newPage] =  await Promise.all([
                
            context.waitForEvent('page'),
            blinklink.click(),
                
            ])
            //await page.pause(); 
            
            //split function
           const text = await newPage.locator(".red").textContent();
           const arrayText = text.split("@");
          const resttext = arrayText[1].split(" "); 
          const emailid = arrayText[1].split(" ")[0];
           console.log(resttext[0]);
           console.log(emailid);
           //split function

           //switch to parent window
           await page.pause();
           await page.locator('#username').fill(emailid);
           await page.pause();

           console.log(await page.locator("#username").textContent());
           

        
        }
        );
        