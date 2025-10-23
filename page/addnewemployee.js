export class AddNewEmployeePage {
    // Define selectors using getter methods
    constructor(page) {
        this.page = page;
        this.employee =page.locator("(//span[@class='menu-text'][normalize-space()='Employee Module'])[1]");
        this.newemployee =page.locator("//span[normalize-space()='New Employee']");
        this.addnew =page.locator("//a[@class='btn btn-sm btn-outline-secondary mF']");
        this.category=page.locator("//select[@id='Emp_Category2']");
        this.role=page.locator("//select[@id='Emp_role_1']");
        this.firstname=page.locator("//input[@id='firstname']");
        this.lastname=page.locator("//input[@id='lastname']");
        this.employeecode=page.locator("//input[@id='employee_code']");
        this.dob=page.locator("//input[@id='dob']");
        this.gender=page.locator("//select[@id='gender']");
        this.mobilenumber=page.locator("//input[@id='mobileNumber']");
        this.email=page.locator("//input[@id='emailId']");
        this.designation =page.locator("//select[@id='designation_id']");
        this.doj=page.locator("//input[@id='doj']");
        this.state=page.locator("//select[@id='state_id']");
        this.city=page.locator("//select[@id='city_id']");
        this.pincode=page.locator("//input[@id='pincode']");
        this.submit=page.locator("//button[@id='btnSubmit']");
    } 
    //click on employee module and navigate to add new employee page
    async navigateToAddNewEmployee() {
        await this.employee.click();
        await this.page.waitForTimeout(2000);
        await this.newemployee.click();
        await this.addnew.click();
    }
    
    async fillEmployeeForm(data) {
  if (data.category) {
    await this.category.waitFor({ state: 'visible', timeout: 5000 });
    await this.category.selectOption(data.category);
  }

  if (data.role) {
    await this.role.waitFor({ state: 'visible', timeout: 5000 });
    await this.role.selectOption(data.role);
  }

  if (data.firstname) {
    await this.firstname.waitFor({ state: 'visible', timeout: 5000 });
    await this.firstname.fill(data.firstname);
  }

  if (data.lastname) {
    await this.lastname.waitFor({ state: 'visible', timeout: 5000 });
    await this.lastname.fill(data.lastname);
  }

  if (data.employeecode !== undefined && data.employeecode !== null) {
    await this.employeecode.waitFor({ state: 'visible', timeout: 5000 });
    await this.employeecode.fill(data.employeecode.toString());
  }

  if (data.dob) {
    await this.dob.waitFor({ state: 'visible', timeout: 5000 });
    await this.dob.fill(data.dob);
  }

  if (data.gender) {
    await this.gender.waitFor({ state: 'visible', timeout: 5000 });
    await this.gender.selectOption(data.gender);
  }

  if (data.mobilenumber !== undefined && data.mobilenumber !== null) {
    await this.mobilenumber.waitFor({ state: 'visible', timeout: 5000 });
    await this.mobilenumber.fill(data.mobilenumber.toString());
  }

  if (data.email) {
    await this.email.waitFor({ state: 'visible', timeout: 5000 });
    await this.email.fill(data.email);
  }

  if (data.designation) {
    await this.designation.waitFor({ state: 'visible', timeout: 5000 });
    await this.designation.selectOption(data.designation);
  }

  if (data.doj) {
    await this.doj.waitFor({ state: 'visible', timeout: 5000 });
    await this.doj.fill(data.doj);
  }

  if (data.state) {
    await this.state.waitFor({ state: 'visible', timeout: 5000 });
    await this.state.selectOption(data.state);
  }

  if (data.city) {
    await this.city.waitFor({ state: 'visible', timeout: 5000 });
    await this.city.selectOption(data.city);
  }

  if (data.pincode !== undefined && data.pincode !== null) {
    await this.pincode.waitFor({ state: 'visible', timeout: 5000 });
    await this.pincode.fill(data.pincode.toString());
  }
}




    
    async submitForm() {
        await this.submit.click();
    }

}
module.exports = { AddNewEmployeePage };
