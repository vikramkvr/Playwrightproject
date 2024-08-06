// @ts-check
const { devices, expect } = require('@playwright/test');

const config = {
  testDir: './tests',
  timeout: 30*1000,
  expect: {

    timeout: 5000
  },
  reporter: 'html',
  use: {

    browserName : 'chromium',
    headless : false,
    screenshot : 'on',
    trace: 'retain-on-failure', // trace : 'on' - this will give trace for all the test cases, 'off' will off all the traces, 'retain-on-failure' will give only failed traces
  },

};

module.exports = config;
    