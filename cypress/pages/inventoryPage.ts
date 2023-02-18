class InventoryPage {
    private readonly menu = "Open Menu"
    private readonly inventoryItems = "[class=inventory_item]"
    private readonly cartBadge = "[class=shopping_cart_badge]"
    private readonly pricebar = "[class=pricebar]"
    private readonly price  = "[class=inventory_item_price]"

    getMenuButton() {
        return cy.contains(this.menu)
    }

    getInventoryItems() {
        return cy.get(this.inventoryItems)
    }

    getAddToCartButtons() {
        return cy.get(this.pricebar).find("button")
    }

    getRemoveButtons() {
        return cy.get(this.pricebar).find("button")
    }

    getItemPrices() {
        return cy.get(this.pricebar).find(this.price)
    }

    getCartBadge() {
        return cy.get(this.cartBadge)
    }
}

export default InventoryPage
