// page/loginpage.js
export class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator("//input[@placeholder='Username']");
        this.passwordInput = page.locator("//input[@id='passwordInput']");
        this.loginButton = page.locator("//button[@id='kt_login_signin_submit']");
    }

    async goToLoginPage() {
        await this.page.goto("http://smtnetkampuss.netcampus.in/");
        await this.page.waitForLoadState('networkidle');
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}

module.exports = { LoginPage }; 
