import "cypress-wait-until"
import InventoryPage from "../pages/inventoryPage"
import LoginPage from "../pages/loginPage"

describe("Login page", () => {
    const loginPage = new LoginPage()
    const inventoryPage = new InventoryPage()

    beforeEach(() => {
        loginPage.visit()
    })

    it("Logging in as valid user should render inventory page", () => {
        loginPage.fillCredentials("standard_user", "secret_sauce")
        loginPage.submitCredentials()

        inventoryPage.getMenu().should("be.visible")
    })

    it("Logging in as locked out user renders popup error message", () => {
        loginPage.fillCredentials("locked_out_user", "secret_sauce")
        loginPage.submitCredentials()

        loginPage.getLockOutError()
            .should("contain.text", "Sorry, this user has been locked out")
    })

    it("Logging in as problem user renders inventory with fallback images", () => {
        loginPage.fillCredentials("problem_user", "secret_sauce")
        loginPage.submitCredentials()

        inventoryPage.getInventoryItems()
            .find("img")
            .should("have.attr", "src", "/static/media/sl-404.168b1cce.jpg")
    })

    it("Logging in as performance glitch user should eventually render inventory page", () => {
        loginPage.fillCredentials("performance_glitch_user", "secret_sauce")
        loginPage.submitCredentials()

        cy.waitUntil(() => {
            cy.reload()
            return inventoryPage.getMenu().then((menu) => menu.length > 0)
        })

        inventoryPage.getMenu().should("be.visible")
    })
})
