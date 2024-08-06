// @ts-check
const { devices, expect } = require('@playwright/test');

const config = {
  testDir: './tests',
  //retries :1,
 // workers :1, //workers decides parallel execution of test files - if not mentioned it will be parallel execution
  timeout: 30*1000,
  expect: {

    timeout: 5000
  },
  reporter: 'html',
  projects : [
    {
      name : 'safari',
      use: {

        browserName : 'webkit',
        headless : false,
        screenshot : 'on',
        trace: 'retain-on-failure', // trace : 'on' - this will give trace for all the test cases, 'off' will off all the traces, 'retain-on-failure' will give only failed traces
        ...devices['iPhone 14']
      }
    },
    {
      name : 'chrome',
      use: {

        browserName : 'chromium',
        headless : false,
        screenshot : 'on',
        video : 'retain-on-failure',
        ignoreHttpsErrors:true,
        permissions: ['geolocation'],
        trace: 'retain-on-failure', // trace : 'on' - this will give trace for all the test cases, 'off' will off all the traces, 'retain-on-failure' will give only failed traces
       // viewport : {width:72,height:720}

      }
    }

  ]
 ,

};

module.exports = config;
    