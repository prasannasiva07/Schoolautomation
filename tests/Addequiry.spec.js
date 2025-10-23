import { test, expect } from '@playwright/test';
import { LoginPage } from '../page/loginpage';
import { AddEnquiry } from '../page/addequiry';

test('Add Enquiry Test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
  await loginPage.login('admin', 'netkampus@2025');
  await page.waitForLoadState('networkidle');

  const enquiryPage = new AddEnquiry(page);
  await enquiryPage.navigateToAddEnquiry();
  await enquiryPage.fillEnquiryForm('2025-2026');
  await page.screenshot({ path: 'addequiry.png' });
});
