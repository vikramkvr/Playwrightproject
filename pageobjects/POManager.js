const { DashboardPage } = require("./DashboardPage");
const { LoginPage } = require("./LoginPage");
const { CartPage } = require("./CartPage");
const { OrdersHistoryPage } = require("./OrdersHistoryPage");
const { OrdersReviewPage } = require("./OrdersReviewPage");


class POManager
{
constructor(page)
{
    this.page = page;
    this.loginPage = new LoginPage(page);
     this.dashboardPage = new DashboardPage(page);
     this.cartPage = new CartPage(page);
     this.ordersHistoryPage = new OrdersHistoryPage(page);
     this.ordersReviewPage = new OrdersReviewPage(page);
}

getLoginPage()
{
    return this.loginPage;
}
getDashboardPage()
{
    return this.dashboardPage;
}
getCarPage()
{
    return this.cartPage;
}
getOrdersHistoryPage()
{
    return this.ordersHistoryPage;
}

getOrdersReviewPage()
{
    return this.ordersReviewPage;
}

}
module.exports = {POManager};