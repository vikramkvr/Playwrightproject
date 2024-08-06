const base = require('@playwright/test');

exports.customtest = base.test.extend(
{

    testDataForOrder : {
    username : "vikramkandi4151@gmail.com",
    password : "Test1234",
    productName : "ADIDAS ORIGINAL"
    }
}



)