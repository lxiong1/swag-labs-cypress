class LoginPage {
    private readonly url =  "https://www.saucedemo.com"
    private readonly username =  "[data-test=username]"
    private readonly password =  "[data-test=password]"
    private readonly loginButton =  "[data-test=login-button]"
    private readonly lockOutError =  "[data-test=error]"

    visit(): void {
        cy.visit(this.url)
    }

    fillCredentials(username: string, password: string): void {
        cy.get(this.username).type(username)
        cy.get(this.password).type(password)
    }

    submitCredentials(): void {
        cy.get(this.loginButton).click()
    }

    getLockOutError(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.lockOutError)
    }
}

export default LoginPage
