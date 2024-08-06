const ExcelJS = require('exceljs');
const {test, expect} = require('@playwright/test');

//Print row and column number based on the selected value
async function writeExcelTest(searchText,replaceText,filePath)
{
    
const workbook = new ExcelJS.Workbook();
await workbook.xlsx.readFile(filePath);

const worksheet = await workbook.getWorksheet('Sheet1');
const output = await readExcel(worksheet,searchText);

//replace the identified cell value with intended value
const cell = await worksheet.getCell(output.row,output.column);
cell.value =replaceText;
await workbook.xlsx.writeFile(filePath);


}
async function readExcel(worksheet,searchText)
{
    let output = {row:-1,column:-1};
    worksheet.eachRow((row,rowNumber) =>
        {
            row.eachCell( (cell,colNumber) =>
            {
                if(cell.value === searchText)
                {
                    output.row=rowNumber;
                    output.column=colNumber;
                    console.log("row number is "+rowNumber);
                    console.log("column number is "+colNumber);
                    console.log(cell.value);
                }
            }
        
                        )
        })
        return output;
        
}

//writeExcelTest("Papaya","Dragon Fruit","/Users/vikramkandi/Downloads/exceldownloadTest.xlsx");

test('Upload and download excel validation', async ({page})=>
{

    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    await page.pause();
    const downloadPromise = page.waitForEvent('download');
    //await page.getByRole('button', {name:'Download'}).click();
    await page.locator("#downloadButton").click();
    await downloadPromise;
    writeExcelTest("Papaya","Dragon Fruit","/Users/vikramkandi/Downloads/download.xlsx");
    await page.locator(".upload").click();
    await page.locator(".upload").setInputFiles("/Users/vikramkandi/Downloads/download.xlsx");



}


)