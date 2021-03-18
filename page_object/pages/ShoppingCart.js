import {Selector} from 'testcafe'

class ShoppingCart {
    constructor(){
        this.checkoutButton = Selector ('#cart_contents_container > div > div.cart_footer > a.btn_action.checkout_button')
        this.pageTitle = Selector ('.subheader')
    }
}

export default new ShoppingCart ()