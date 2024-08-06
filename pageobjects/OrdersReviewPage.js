const {test,expect} = require('@playwright/test');

class OrdersReviewPage
{

constructor(page)
{

    this.page = page;
    this.country = page.locator("[placeholder='Select Country']");
    this.dropdopwn = page.locator(".ta-results");
    this.emailId = page.locator("label[type='text']");
    this.submit = page.locator("text =Place Order ");
    this.orderConfirmationText = page.locator(".hero-primary");
    this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");



}

async searchCountryAndSelect(countryCode,countryName)
{
    await this.country.pressSequentially(countryCode);
    await this.dropdopwn.waitFor();
    const options = this.dropdopwn.locator("[type='button']");
console.log(options.count())

for(let i=0;i < await options.count(); ++i)
{
if((await options.nth(i).textContent()).trim() === countryName)
{
    await options.nth(i).click();
    break;
}
}

}
async SubmitAndGetOrderId()
{
    this.submit.click();
    return await this.page.locator(".em-spacer-1 .ng-star-inserted").textContent();
}


}
module.exports = {OrdersReviewPage};