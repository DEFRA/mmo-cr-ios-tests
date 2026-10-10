import { expect } from '@wdio/globals'
import { launchApp } from '#support/app.js'
import { byText } from '#support/selectors.js'
import { credentials } from '#support/test-data.js'
import signIn from '#screens/sign-in.screen.js'
import home from '#screens/home.screen.js'

describe('Sign in', () => {
  beforeEach(async () => {
    await launchApp()
  })

  it('shows the heading, sign in button and help links', async () => {
    await expect(signIn.heading).toBeDisplayed()
    await expect(signIn.heading).toHaveAttribute('label', 'Sign in')
    await expect(signIn.emailField).toBeDisplayed()
    await expect(signIn.passwordField).toBeDisplayed()
    await expect(signIn.signInButton).toBeDisplayed()
    await expect(signIn.troubleHeading).toBeDisplayed()
    await expect(signIn.forgottenPasswordLink).toBeDisplayed()
    await expect(signIn.createAccountLink).toBeDisplayed()
  })

  // Demo bypass in the app: there is no real authentication yet
  it('continues to Home with an empty form', async () => {
    await signIn.signIn()

    await expect(home.warningBox).toBeDisplayed()
  })

  it('continues to Home with an email and password entered', async () => {
    await signIn.signIn(credentials)

    await expect(home.warningBox).toBeDisplayed()
  })

  it('switches the copy to Welsh with the language toggle', async () => {
    await signIn.languageToggle.click()

    await expect(byText('Mewngofnodi')).toBeDisplayed()
  })

  it('keeps the user on Sign in when tapping the inert help links', async () => {
    await signIn.forgottenPasswordLink.click()
    await expect(signIn.heading).toBeDisplayed()

    await signIn.createAccountLink.click()
    await expect(signIn.heading).toBeDisplayed()
  })

  it('masks the password by default and toggles its visibility', async () => {
    await expect(signIn.passwordVisibilityToggle).toHaveAttribute(
      'label',
      'Show password'
    )
    await expect(signIn.passwordField).toHaveAttribute(
      'type',
      'XCUIElementTypeSecureTextField'
    )
    await signIn.passwordField.setValue(credentials.password)

    await signIn.passwordVisibilityToggle.click()
    await expect(signIn.passwordVisibilityToggle).toHaveAttribute(
      'label',
      'Hide password'
    )
    await expect(signIn.passwordField).toHaveAttribute(
      'type',
      'XCUIElementTypeTextField'
    )
    await expect(signIn.passwordField).toHaveAttribute(
      'value',
      credentials.password
    )

    await signIn.passwordVisibilityToggle.click()
    await expect(signIn.passwordVisibilityToggle).toHaveAttribute(
      'label',
      'Show password'
    )
    await expect(signIn.passwordField).toHaveAttribute(
      'type',
      'XCUIElementTypeSecureTextField'
    )
  })
})
