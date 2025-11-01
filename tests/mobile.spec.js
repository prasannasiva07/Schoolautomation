import { test, expect, devices } from '@playwright/test';


const iPhone13 = devices['iPhone 7'];


test.use({ ...iPhone13 });

test('Mobile login flow on iPhone 13', async ({ page }) => {
  
  await page.goto('http://localhost:3000 ');

  
  await page.fill('input[name="username"]', 'admin');
  await page.fill('input[name="password"]', 'netkampus@2025');

  
  await page.click("//button[@id='kt_login_signin_submit']");

 
  await expect(page).toHaveURL("http://smtnetkampuss.netcampus.in/")

  await page.waitForTimeout(5000);
});
