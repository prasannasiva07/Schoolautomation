const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../page/loginpage');
const { AddNewEmployeePage } = require('../page/addnewemployee');
const { readExcel } = require('../utilis/readexcel');

const employeeData = readExcel('D:\\New\\school-automation\\Erp_school\\Excel\\Book2.xlsx', 'Sheet1');

test.describe('Add multiple employees', () => {
  for (const data of employeeData) {
    test(`Add employee: ${data.firstname} ${data.lastname}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const addEmployee = new AddNewEmployeePage(page);

      await loginPage.goToLoginPage();
      await loginPage.login('admin', 'netkampus@2025');
      await expect(page).toHaveURL('http://smtnetkampuss.netcampus.in/');

      await addEmployee.navigateToAddNewEmployee();
      await addEmployee.fillEmployeeForm(data);
      // await addEmployee.submitForm();
    });
  }
});
