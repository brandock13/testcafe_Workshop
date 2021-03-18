import { Selector } from 'testcafe'

class ProductPage {

    constructor() {
        this.burgerMenu = Selector('#react-burger-menu-btn')
        this.logoutButton = Selector('#logout_sidebar_link')
        this.shoppingCart = Selector('#shopping_cart_container')
        this.pageTitle = Selector('.product_label')
        this.firstItem = Selector('#inventory_container > div > div:nth-child(1) > div.pricebar > button')
        this.items = Selector('.btn_primary btn_inventory')

    }
    
    // async selectProducts(itemsToSelect){

    //     var totalElements = Selector('div > div.pricebar > button')
    //     var count = await totalElements.count
    //     var itemNameList = []

    //     for (var i = 0; i < itemsToSelect; i++) {
    //         if (i < count) {
    //             await t.click(totalElements.nth(i))
    //             const name = await Selector('#item_' + i + '_title_link > div').innerText
    //             itemNameList.push(name)
    //         }
    //     }
    // }
}

export default new ProductPage()
