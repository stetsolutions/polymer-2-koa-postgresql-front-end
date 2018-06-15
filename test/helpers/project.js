const utilities = require('./utilities.js')

module.exports = {
  /**
   * Sign in
   *  @async
   *  @param  {object} page object
   *  @param  {string} username value
   *  @param  {string} password value
   */
  signin: async(page, usernameValue, passwordValue) => {
    const username = await utilities.waitForShadowSelector(page, '#username')
    const password = await utilities.waitForShadowSelector(page, '#password')
    const passwordInput = await page.evaluateHandle(
      (password) => {
        const el = password.shadowRoot.querySelector('paper-input')
        return el
      },
      password
    )

    const buttons = await utilities.shadowSelectorAll(page, 'paper-button')
    const submitButton = await page.evaluateHandle(
      buttons => buttons[1],
      buttons
    )

    await username.type(usernameValue)
    await passwordInput.type(passwordValue)

    await page.evaluate(
      submitButton => submitButton.click(),
      submitButton
    )

    await page.waitForNavigation({ waitUntil: 'networkidle2' })
  },

  /**
   * Signout
   *  @async
   *  @param  {object} page object
   */
  signout: async(page) => {
    const headerMenu = await utilities.shadowSelector(page, '.header__menu')

    await page.evaluateHandle(
      (headerMenu) => {
        headerMenu.children[0].click()
      },
      headerMenu
    )

    await page.evaluateHandle(
      (headerMenu) => {
        headerMenu.children[1].children[2].click()
      },
      headerMenu
    )
  }
}
