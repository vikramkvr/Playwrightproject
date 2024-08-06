const {test,expect} = require('@playwright/test');

class OrdersHistoryPage
{
constructor(page)
{
    this.page = page;
    this.ordersTable = page.locator("tbody");
    this.rows = page.locator("tbody tr");
    this.orderIdDetails = page.locator(".col-text");

}

async searchOrderAndSelect(orderId)
{
    await this.ordersTable.first().waitFor();
    for(let i=0; i< await this.rows.count(); ++i)
        {
            const orderidcheck = await this.rows.nth(i).locator("th").textContent();
            console.log("orderid looped is "+orderidcheck)
            if(orderId.includes(orderidcheck))
            {
                await this.rows.nth(i).locator(".btn-primary").click();
               break;
        
            }
        
        }
}
async getOrderId()
{
    return await this.orderIdDetails.textContent();
}

}

module.exports = {OrdersHistoryPage};