const { chromium } = require('@playwright/test');

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Go to login page
  await page.goto('http://smtnetkampuss.netcampus.in/',{
    waitUntil: 'networkidle',
    timeout: 60000
  });

  
  await page.locator("//input[@placeholder='Username']").fill('admin');
  await page.locator("//input[@id='passwordInput']").fill('netkampus@2025');
  await page.locator("//button[normalize-space()='Login']").click();


  await page.waitForURL('http://smtnetkampuss.netcampus.in/');
  
 
  await page.waitForTimeout(2000);
  
  
  await page.context().storageState({ path: './Global/storageState.json' });
  
  
  const fs = require('fs');
  if (!fs.existsSync('./Global/storageState.json')) {
    throw new Error('Storage state file was not created');
  }
  
  
  await browser.close();
}


if (require.main === module) {
  globalSetup()
    .then(() => {
      console.log('Storage state saved successfully');
      process.exit(0);
    })
    .catch(error => {
      console.error('Error saving storage state:', error);
      process.exit(1);
    });
} else {
  module.exports = globalSetup;
}
