class LoginPage
{
constructor(page)
{
    this.page = page;
    this.signInbutton = page.locator('#login');
    this.userName = page.locator('#userEmail');
    this.password = page.locator('#userPassword');
}
async goTo()
{
    await this.page.goto("https://rahulshettyacademy.com/client");
    
}
async validLogin(username,password)
{
    await this.userName.fill(username);//vikramkandi4151@gmail.com
    await this.password.fill(password);//Test1234
    await this.signInbutton.click();
    await this.page.waitForLoadState('networkidle');
}

}
module.exports = {LoginPage};