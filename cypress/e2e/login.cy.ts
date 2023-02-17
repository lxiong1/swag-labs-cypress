import 'cypress-wait-until';

describe("Login page", () => {
    beforeEach(() => {
        cy.visit("https://www.saucedemo.com")
    })

    it("Logs in as user successfully to user page", () => {
        cy.get("[data-test=username]").type("standard_user")
        cy.get("[data-test=password]").type("secret_sauce")
        cy.get("[data-test=login-button]").click()

        cy.contains("Open Menu").should("be.visible")
    })

    it("Logging in as locked out user renders error message", () => {
        cy.get("[data-test=username]").type("locked_out_user")
        cy.get("[data-test=password]").type("secret_sauce")
        cy.get("[data-test=login-button]").click()

        cy.get("[data-test=error]")
            .should("contain.text", "Sorry, this user has been locked out")
    })

    it("Logging in as problem user renders list of items with fallback image", () => {
        cy.get("[data-test=username]").type("problem_user")
        cy.get("[data-test=password]").type("secret_sauce")
        cy.get("[data-test=login-button]").click()

        cy.get("[class=inventory_list]")
            .first()
            .find("img")
            .should("have.attr", "src", "/static/media/sl-404.168b1cce.jpg")
    })

    it("Logs in as performance glitch user should eventually render user page", () => {
        cy.get("[data-test=username]").type("performance_glitch_user")
        cy.get("[data-test=password]").type("secret_sauce")
        cy.get("[data-test=login-button]").click()

        cy.waitUntil(() => {
            cy.reload()
            return cy.contains("Open Menu").then((menu) => menu.length > 0)
        })
        cy.contains("Open Menu").should("be.visible")
    })
})
