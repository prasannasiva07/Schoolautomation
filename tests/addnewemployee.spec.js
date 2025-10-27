const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../page/loginpage');
const { AddNewEmployeePage } = require('../page/addnewemployee');
const { readExcel } = require('../utilis/readexcel');
const { fstat } = require('fs');

const employeeData = readExcel('D:\\New\\school-automation\\Erp_school\\Excel\\Book2.xlsx', 'Sheet1');

test.describe('Add multiple employees - mandatory field validation', () => {
   tag :'@fast'
  for (const data of employeeData) {
    test(`Validate mandatory fields for: ${data.firstname || 'Missing Firstname'} ${data.lastname || ''}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const addEmployee = new AddNewEmployeePage(page);

      // Step 1: Logn
      await loginPage.goToLoginPage();
      await loginPage.login('admin', 'netkampus@2025');
      await expect(page).toHaveURL('http://smtnetkampuss.netcampus.in/');

      
      await addEmployee.navigateToAddNewEmployee();

      
      await addEmployee.fillEmployeeForm(data);

     
      await addEmployee.submitForm();

      
      const errorElements = page.locator('.invalid-feedback, .text-danger, .error');
      const count = await errorElements.count();

      if (count === 0) {
        console.log(`✅ Employee data passed validation for: ${data.firstname || 'N/A'} ${data.lastname || 'N/A'}`);
      } else {
        console.log(`❌ Validation errors for employee: ${data.firstname || 'N/A'} ${data.lastname || 'N/A'}`);

        for (let i = 0; i < count; i++) {
          const errorEl = errorElements.nth(i);
          const message = await errorEl.textContent();

          
          let fieldName = 'Unknown Field';
          try {
          
            const input = await errorEl.locator('xpath=preceding::input[1]').first();
            if (await input.count()) {
              const name = await input.getAttribute('name');
              const id = await input.getAttribute('id');
              fieldName = name || id || fieldName;
            } else {
              const label = await errorEl.locator('xpath=preceding::label[1]').first();
              if (await label.count()) {
                const labelText = await label.textContent();
                fieldName = labelText?.trim() || fieldName;
              }
            }
          } catch (e) {
            
          }

          console.log(`   → Field: ${fieldName} | Message: ${message?.trim()}`);
        }
      }
    });
  }
});
