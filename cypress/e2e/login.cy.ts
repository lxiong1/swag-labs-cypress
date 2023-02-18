import "cypress-wait-until"
import InventoryPage from "../pages/inventoryPage"
import LoginPage from "../pages/loginPage"

describe("Login page", () => {
    const loginPage = new LoginPage()
    const inventoryPage = new InventoryPage()

    beforeEach(() => {
        loginPage.visit()
    })

    it("Logging in as user successfully to user page", () => {
        loginPage.fillCredentials("standard_user", "secret_sauce")
        loginPage.submitCredentials()

        inventoryPage.getMenu().should("be.visible")
    })

    it("Logging in as locked out user renders error message", () => {
        loginPage.fillCredentials("locked_out_user", "secret_sauce")
        loginPage.submitCredentials()

        loginPage.getLockOutError()
            .should("contain.text", "Sorry, this user has been locked out")
    })

    it("Logging in as problem user renders list of items with fallback image", () => {
        loginPage.fillCredentials("problem_user", "secret_sauce")
        loginPage.submitCredentials()

        inventoryPage.getInventoryItems()
            .find("img")
            .should("have.attr", "src", "/static/media/sl-404.168b1cce.jpg")
    })

    it("Logging in as performance glitch user should eventually render user page", () => {
        loginPage.fillCredentials("performance_glitch_user", "secret_sauce")
        loginPage.submitCredentials()

        cy.waitUntil(() => {
            cy.reload()
            return inventoryPage.getMenu().then((menu) => menu.length > 0)
        })

        inventoryPage.getMenu().should("be.visible")
    })
})
