import {Selector} from 'testcafe'

class CheckoutPage {
    constructor(){
        this.pageTitle = Selector ('.subheader')
        this.continueButton = Selector ('#checkout_info_container > div > form > div.checkout_buttons > input')
        this.firstName = Selector ('#first-name')
        this.lastName = Selector ('#last-name')
        this.zipCode = Selector ('#postal-code')
        this.errorMessage = Selector ('.error-button')
    }
}

export default new CheckoutPage ()