import { byId, firstTextField } from '#support/selectors.js'

class SignInScreen {
  get heading() {
    return byId('SignIn.heading')
  }

  // The email field's own identifier is swallowed by the composite TextInputField
  get emailField() {
    return firstTextField()
  }

  get passwordField() {
    return byId('TextInputField.secureInput')
  }

  get passwordVisibilityToggle() {
    return byId('TextInputField.secureToggle')
  }

  get signInButton() {
    return byId('SignIn.signInButton')
  }

  get troubleHeading() {
    return byId('SignIn.troubleHeading')
  }

  get forgottenPasswordLink() {
    return byId('SignIn.forgottenPasswordLink')
  }

  get createAccountLink() {
    return byId('SignIn.createAccountLink')
  }

  get languageToggle() {
    return byId('Header.languageToggle')
  }

  async signIn({ email, password } = {}) {
    await this.heading.waitForDisplayed()
    if (email) await this.emailField.setValue(email)
    if (password) await this.passwordField.setValue(password)
    // The keyboard can cover the Sign in button
    await this.heading.click()
    await this.signInButton.click()
  }
}

export default new SignInScreen()
