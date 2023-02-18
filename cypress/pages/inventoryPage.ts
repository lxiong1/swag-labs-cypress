class InventoryPage {
    private readonly menu = "Open Menu"
    private readonly inventoryItems = "[class=inventory_item]"

    getMenu() {
        return cy.contains(this.menu)
    }

    getInventoryItems() {
        return cy.get(this.inventoryItems)
    }
}

export default InventoryPage
