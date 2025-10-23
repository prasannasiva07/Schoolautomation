class AddEnquiry {
  constructor(page) {
    this.page = page;
    this.addEnquiryMenu = page.locator("(//span[@class='menu-text'][normalize-space()='Enquiry & Admission'])[1]");
    this.addEnquiryOption = page.locator("//span[normalize-space()='Add New Enquiry']");
    this.academicyear = page.locator("//select[@name='ddlBatch']");
    this.stages = page.locator("//select[@id='course_id']");
    this.classes = page.locator("//select[@id='semester_id']");
  }

  async navigateToAddEnquiry() {
    await this.addEnquiryMenu.click();
    await this.addEnquiryOption.click();
    
  }

  async fillEnquiryForm(year = '2025-2026', stage = '1', classOption = '1') {
    await this.academicyear.waitFor({ state: 'visible' });
    await this.academicyear.selectOption(year);
    await this.page.waitForLoadState('networkidle');

    await this.stages.waitFor({ state: 'visible' });
    await this.stages.selectOption(stage);
    await this.page.waitForLoadState('networkidle');

    await this.classes.waitFor({ state: 'visible' });
    await this.classes.selectOption(classOption);
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = { AddEnquiry };
