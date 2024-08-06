class DashboardPage
{
    constructor(page)
    {
       this.products = page.locator(".card-body");
       this.prodcutsText = page.locator(".card-body b");
       this.cart = page.locator("[routerlink*='cart']");
       this.orders = page.locator("li [routerlink='/dashboard/myorders']");
    }

    async searchProductAddCart(productName)
    {

        const titles =console.log(await this.products.allTextContents());

        //select the product Zata coat 3
        const count = await this.products.count();
        for(let i =0; i < count; ++i)
        {
            
        if(await this.products.nth(i).locator("b").textContent() === productName)
        {
            
            await this.products.nth(i).locator("text= Add To Cart").click();
            break;
        }
        }
        
    }
    async navigateTOCart()
    {
        await this.cart.click();
    }
    async navigateToOrders()
    {
        this.orders.click();
    }
}
module.exports = {DashboardPage};