import InventoryPage from "../pages/inventoryPage"
import LoginPage from "../pages/loginPage"

describe("Inventory page", () => {
    const loginPage = new LoginPage()
    const inventoryPage = new InventoryPage()

    beforeEach(() => {
        loginPage.visit()
        loginPage.fillCredentials("standard_user", "secret_sauce")
        loginPage.submitCredentials()
    })

    it("Adding item to cart should update button text to remove", () => {
        inventoryPage.getAddToCartButtons().first().click()

        inventoryPage.getRemoveButtons().first().should("be.visible")
    })

    it("Adding item to cart should update cart badge to have one item", () => {
        inventoryPage.getAddToCartButtons().first().click()

        inventoryPage.getCartBadge().should("have.text", "1")
    })

    it("Adding all items to cart should update cart badge to have all item count", () => {  
        inventoryPage.getAddToCartButtons().click({multiple: true})

        inventoryPage.getAddToCartButtons().then((buttons) => {
            inventoryPage.getCartBadge().should("have.text", `${buttons.length}`)
        })
    })

    it("Cart should not have cart badge when cart items not added", () => {
        inventoryPage.getCartBadge().should("not.exist")
    })

    it("Inventory items should have prices listed", () => {
        inventoryPage.getItemPrices().each((itemPrice) => {
            const price = itemPrice[0].lastChild.textContent
            if (typeof parseFloat(price) !== "number") {
                throw new Error("One or more price listed is not a number")
            }
        })
    })
})