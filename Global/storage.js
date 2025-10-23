// // global-setup.js
// const { chromium } = require('@playwright/test');

// module.exports = async () => {
//   const browser = await chromium.launch();
//   const page = await browser.newPage();

//   // Go to login page
//   await page.goto('http://smtnetkampuss.netcampus.in/',{
//     waitUntil: 'networkidle',
//     timeout: 60000
//   });

//   // Fill credentials and login
//   await page.locator("//input[@placeholder='Username']").fill('admin');
//   await page.locator("//input[@id='passwordInput']").fill('netkampus@2025');
//   await page.locator("//button[normalize-space()='Login']").click();

//   // Wait until dashboard is loaded
//   await page.waitForURL('http://smtnetkampuss.netcampus.in/');
//   // Save login session
//   await page.context().storageState({ path: 'storageState.json' });

//   await browser.close();
// };
