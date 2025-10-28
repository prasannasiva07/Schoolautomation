
class AddNewEmployeePage {
    constructor(page) {
        this.page = page;
        
        this.addnew = page.locator("//i[@class='fa fa-plus']");
    }

    async gotoAddEmployeePage() {
        
        await this.page.goto("http://smtnetkampuss.netcampus.in/employee/new_empregislist", {
            waitUntil: 'networkidle',
            timeout: 60000
        });
        
        // Log page title for debugging
        console.log('Page title:', await this.page.title());
        
        // Check if we need to handle any alerts
        try {
            const alert = await this.page.waitForSelector('.alert', { timeout: 5000 });
            if (alert) {
                console.log('Alert found:', await alert.textContent());
            }
        } catch (e) {
            // No alert found, continue
        }
    }

    async clickAddNew() {
      await this.page.waitForTimeout(2000);  
      await this.addnew.click();
      await this.page.waitForTimeout(2000);
        
        }
    }


module.exports = { AddNewEmployeePage };

