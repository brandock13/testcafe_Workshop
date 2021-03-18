import LoginPage from '../pages/LoginPage'
import ProductPage from '../pages/ProductPage'
import ShoppingCart from '../pages/ShoppingCart'
import { Selector } from 'testcafe'
import CheckoutPage from '../pages/CheckoutPage'
import OverviewPage from '../pages/OverviewPage'
import clickItems from '../pages/ProductPage'
import {CREDENTIALS} from '../data/Constant'


fixture('Login feature testing')
    .page`https://www.saucedemo.com/`

test('TC1 -User can login using valid credentials', async t => {
    await t
        .typeText(LoginPage.userName, CREDENTIALS.VALID_USER.USERNAME)
        .typeText(LoginPage.password, CREDENTIALS.VALID_USER.PASSWORD)
        .click(LoginPage.loginButton)
    await t.expect(ProductPage.pageTitle.exists).ok()
})

test('TC2a -User can not log in with an invalid user name', async t => {
    await t
        .typeText(LoginPage.userName, CREDENTIALS.INVALID_UER.USERNAME)
        .typeText(LoginPage.password, CREDENTIALS.VALID_USER.PASSWORD)
        .click(LoginPage.loginButton)
    await t.expect(LoginPage.errorMessage.exists).ok()
    })

test('TC2b -User can not log in with an invalid password', async t => {
    await t
        .typeText(LoginPage.userName, CREDENTIALS.VALID_USER.USERNAME)
        .typeText(LoginPage.password, CREDENTIALS.INVALID_UER.PASSWORD)
        .click(LoginPage.loginButton)
    await t.expect(LoginPage.errorMessage.exists).ok()
})

test('TC3 -User can logout the app', async t => {
    await t
        .typeText(LoginPage.userName, CREDENTIALS.VALID_USER.USERNAME)
        .typeText(LoginPage.password, CREDENTIALS.VALID_USER.PASSWORD)
        .click(LoginPage.loginButton)
        .click(ProductPage.burgerMenu)
        .click(ProductPage.logoutButton)
    await t.expect(LoginPage.loginButton.exists).ok()
})

test('TC4 -User can navigate to the shopping cart', async t => {
    await t
        .typeText(LoginPage.userName, CREDENTIALS.VALID_USER.USERNAME)
        .typeText(LoginPage.password, CREDENTIALS.VALID_USER.PASSWORD)
        .click(LoginPage.loginButton)
        .click(ProductPage.shoppingCart)
    await t.expect(ShoppingCart.pageTitle.exists).ok()
})

test('TC5 -User can add a single item to the shopping cart', async t => {

    await t
        .typeText(LoginPage.userName, CREDENTIALS.VALID_USER.USERNAME)
        .typeText(LoginPage.password, CREDENTIALS.VALID_USER.PASSWORD)
        .click(LoginPage.loginButton)

    var selectElements = Selector('div > div.pricebar > button')
    var count = await selectElements.count
    var itemNameList =[]

    for (var i = 0; i < 1; i++) {
        if (i < count) {
            await t.click(selectElements.nth(i))
            const name = await Selector('#item_'+i+'_title_link > div').innerText
            itemNameList.push(name)
        }
    }

    await t.click(ProductPage.shoppingCart)
    await t.expect(ShoppingCart.pageTitle.exists).ok()

    for (var i = 0; i < 1; i++) {
        if (i < count) {
            const name = await Selector('.inventory_item_name').withText(itemNameList[i]).innerText
            await t.expect(name).eql(itemNameList[i])
        }
    }
})

test('TC6 -User can add multiple items to the shopping cart', async t => {

    await t
        .typeText(LoginPage.userName, CREDENTIALS.VALID_USER.USERNAME)
        .typeText(LoginPage.password, CREDENTIALS.VALID_USER.PASSWORD)
        .click(LoginPage.loginButton)

    var selectElements = Selector('div > div.pricebar > button')
    var count = await selectElements.count
    var itemNameList =[]

    for (var i = 0; i < 7; i++) {
        if (i < count) {
            await t.click(selectElements.nth(i))
            const name = await Selector('#item_'+i+'_title_link > div').innerText
            itemNameList.push(name)
        }
    }

    await t.click(ProductPage.shoppingCart)
    await t.expect(ShoppingCart.pageTitle.exists).ok()

    for (var i = 0; i < 7; i++) {
        if (i < count) {
            const name = await Selector('.inventory_item_name').withText(itemNameList[i]).innerText
            await t.expect(name).eql(itemNameList[i])
        }
    }
})

test('TC7 -User can not continue with missing checkout information', async t => {
    await t
        .typeText(LoginPage.userName, CREDENTIALS.VALID_USER.USERNAME)
        .typeText(LoginPage.password, CREDENTIALS.VALID_USER.PASSWORD)
        .click(LoginPage.loginButton)
        .click(ProductPage.shoppingCart)
        .click(ShoppingCart.checkoutButton)
        .click(CheckoutPage.continueButton)
    await t.expect(CheckoutPage.errorMessage.exists).ok()
})

test('TC8 -User can fill and continue checkout information', async t => {
    await t
        .typeText(LoginPage.userName, CREDENTIALS.VALID_USER.USERNAME)
        .typeText(LoginPage.password, CREDENTIALS.VALID_USER.PASSWORD)
        .click(LoginPage.loginButton)
        .click(ProductPage.shoppingCart)
        .click(ShoppingCart.checkoutButton)
        .typeText(CheckoutPage.firstName, 'test')
        .typeText(CheckoutPage.lastName, 'test')
        .typeText(CheckoutPage.zipCode, 'test')
        .click(CheckoutPage.continueButton)
    await t.expect(OverviewPage.pageTitle.exists).ok()
 })

test('TC9 -User can fill and continue checkout information', async t => {
    await t
        .typeText(LoginPage.userName, CREDENTIALS.VALID_USER.USERNAME)
        .typeText(LoginPage.password, CREDENTIALS.VALID_USER.PASSWORD)
        .click(LoginPage.loginButton)

    var selectElements = Selector('div > div.pricebar > button')
    var count = await selectElements.count
    var itemNameList = []

    for (var i = 0; i < 7; i++) {
        if (i < count) {
            await t.click(selectElements.nth(i))
            const name = await Selector('#item_' + i + '_title_link > div').innerText
            itemNameList.push(name)
        }
    }

    await t
        .click(ProductPage.shoppingCart)
        .click(ShoppingCart.checkoutButton)
        .typeText(CheckoutPage.firstName, 'test')
        .typeText(CheckoutPage.lastName, 'test')
        .typeText(CheckoutPage.zipCode, 'test')
        .click(CheckoutPage.continueButton)
    await t.expect(OverviewPage.pageTitle.exists).ok()

    for (var i = 0; i < 7; i++) {
        if (i < count) {
            const name = await Selector('#item_' + i + '_title_link > div').innerText
            await t.expect(name).eql(itemNameList[i])
        }
    }
})

 test('TC10 -User can complete a purchase', async t => {
    await t
        .typeText(LoginPage.userName, CREDENTIALS.VALID_USER.USERNAME)
        .typeText(LoginPage.password, CREDENTIALS.VALID_USER.PASSWORD)
        .click(LoginPage.loginButton)
        .click(ProductPage.shoppingCart)
        .click(ShoppingCart.checkoutButton)
        .typeText(CheckoutPage.firstName, 'test')
        .typeText(CheckoutPage.lastName, 'test')
        .typeText(CheckoutPage.zipCode, 'test')
        .click(CheckoutPage.continueButton)
        .click(OverviewPage.finishButton)
    await t.expect(OverviewPage.completed.exists).ok()
 })