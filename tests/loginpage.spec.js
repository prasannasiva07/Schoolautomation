const{ test, expect } = require('@playwright/test');
const { LoginPage } = require('../page/loginpage');

test('Login Test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
  await loginPage.login('admin', 'netkampus@2025');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'login_success.png' });
  await expect(page).toHaveURL("http://smtnetkampuss.netcampus.in")
});