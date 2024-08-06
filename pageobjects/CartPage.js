const {test,expect} = require('@playwright/test');
class CartPage
{

constructor(page)
{
this.page = page;
this.cartProducts = page.locator("div li").nth(0);
this.prodcutsText = page.locator(".card-body b");
this.cart = page.locator("[routerlink*='cart']");
this.orders = page.locator("li [routerlink='/dashboard/myorders']");
this.checkout = page.locator("text =Checkout");

}
async VerifyProductsIsDisplayed(productName)
{
    await this.cartProducts.waitFor();
   /*const bool = await this.getProductLocator(productName).isVisible();
    expect(bool).toBeTruthy();*/
    const bool = await this.page.locator("h3:has-text('"+productName+"')").isVisible();
    expect(bool).toBeTruthy();

}
async Checkout()
{
    await this.checkout.click();
}
async getProductLocator(productName)
{
    return this.page.locator("h3:has-text('"+productName+"')");
}

}

module.exports = {CartPage};