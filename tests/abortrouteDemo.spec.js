const {test,expect}= require('@playwright/test'); 



test  ('Abort option in route demo and print request & response calls and status in a page', async ({browser})=>
    {
        const context = await browser.newContext();
        const page = await context.newPage();
    //the below command will block all the images from loading, which might be usefull for faster exeuction and when no validations on images
    //page.route('**/*.{jpg,png,jpeg}',route=> route.abort());
     
     const username = page.locator('#username');
     const password = page.locator('#password');
     const submitbutton = page.locator('#signInBtn');
     const cardTitles = page.locator(".card-body a");
     //to get request and response of all the calls made in the page, so that it can be used for debugging when an issue occured
     page.on('request',request=> console.log(request.url()));
     page.on('response',response=>console.log(response.url(),response.status()))
     await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
     await page.title()
     console.log(await page.title());

     await username.fill("");
     await username.fill("rahulshettyacademy");
     await password.fill("learning");
     await submitbutton.click();
    // traversing from parent to child
     console.log(await cardTitles.nth(0).textContent()); //or console.log(await page.locator(".card-body a").first().textContent())
     await page.pause();

     //get all the titles
      const allTitles = await cardTitles.allTextContents();  
      console.log(allTitles)

    }
);