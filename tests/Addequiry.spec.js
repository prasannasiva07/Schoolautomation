
const { test, expect } = require('@playwright/test');
const { AddNewEmployeePage } = require('../page/addequiry');

test('Add New Employee Test', async ({ page }) => {
    const addEmployee = new AddNewEmployeePage(page);

    
    const ctxCookiesBefore = await page.context().cookies();
    console.log('Context cookies before navigation:', JSON.stringify(ctxCookiesBefore, null, 2));

    await addEmployee.gotoAddEmployeePage();
    
   
    await page.waitForTimeout(2000);
    
    // Log the current URL for debugging
    console.log('Current URL after goto:', page.url());

    // Check if login form is present (common selectors used in the app)
    // const loginVisible = await page.locator("//input[@placeholder='Username']").isVisible().catch(() => false);
    // console.log('Is login form visible after navigation?', loginVisible);

    // Print cookies again to see if anything changed
    // const ctxCookiesAfter = await page.context().cookies();
    // console.log('Context cookies after navigation:', JSON.stringify(ctxCookiesAfter, null, 2));

    // Take a screenshot for debugging
    await page.screenshot({ path: 'debug-screenshot.png', fullPage: true });

    // Log the page content for debugging (first 1500 chars to avoid huge output)
    // const pageContent = (await page.content()).slice(0, 1500);
    // console.log('Page content snippet:', pageContent);

    // If the login form is visible, fail early with helpful message
    // if (loginVisible) {
    //     console.error('Navigation ended up at login page. The saved storage state might not be loaded or session expired.');
    //     // Save another screenshot and stop the test so we can inspect
    //     await page.screenshot({ path: 'login-detected.png', fullPage: true });
    //     throw new Error('Login page detected after navigation — storage state not applied or session expired.');
    // }

    // Continue with clicking Add New only when not redirected to login
    await addEmployee.clickAddNew();
});