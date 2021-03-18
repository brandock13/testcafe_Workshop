import {Selector} from 'testcafe'

class LoginPage {
    constructor(){
        this.loginButton = Selector ('#login-button')
        this.userName = Selector ('#user-name')
        this.password = Selector ('#password')
        this.errorMessage = Selector ('.error-button')
    }
}

export default new LoginPage()
