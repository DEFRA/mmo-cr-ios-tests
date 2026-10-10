import { browser, expect } from '@wdio/globals'
import { launchApp, Seam } from '#support/app.js'
import { byButtonText, byText } from '#support/selectors.js'
import { account } from '#support/test-data.js'
import { header, tabBar } from '#screens/navigation.screen.js'
import { manageAccount, settings } from '#screens/settings.screen.js'

describe('Settings', () => {
  beforeEach(async () => {
    await launchApp(Seam.settings)
  })

  it('shows the title and the analytics section', async () => {
    await expect(settings.title).toBeDisplayed()
    await expect(byText('Optional analytics data')).toExist()
    await expect(byButtonText('How we use your data')).toExist()
    await expect(settings.analyticsToggle).toBeDisplayed()
  })

  it('flips the analytics toggle', async () => {
    const initial = await settings.analyticsToggle.getAttribute('value')

    await settings.analyticsToggle.click()

    await browser.waitUntil(
      async () =>
        (await settings.analyticsToggle.getAttribute('value')) !== initial,
      { timeoutMsg: 'Analytics toggle value did not change' }
    )
  })

  it('lists the account and help links', async () => {
    await expect(settings.myAccountLink).toBeDisplayed()
    await expect(byText('My account')).toExist()
    await expect(settings.privacyNoticeLink).toExist()
    await expect(byText('Privacy notice')).toExist()
    await expect(settings.supportInformationLink).toExist()
    await expect(byText('Support information')).toExist()
    await expect(settings.signOutLink).toExist()
    await expect(byText('Sign out')).toExist()
  })

  it('shows "Not yet recorded" for gear used', async () => {
    await expect(byText('Gear used')).toExist()
    await expect(byText('Not yet recorded')).toExist()
    await expect(settings.gearUsedChange).toExist()
  })

  it('stays on Settings when tapping the inert Sign out link', async () => {
    await settings.signOutLink.click()

    await expect(settings.title).toBeDisplayed()
  })

  it('opens Manage your account from My account', async () => {
    await settings.myAccountLink.click()

    await expect(manageAccount.title).toBeDisplayed()
  })
})

describe('Manage your account', () => {
  beforeEach(async () => {
    await launchApp(Seam.manageAccount)
  })

  it('shows your details and the Face ID section', async () => {
    await expect(manageAccount.title).toBeDisplayed()
    await expect(byText('Your details')).toExist()
    for (const value of Object.values(account)) {
      await expect(byText(value)).toExist()
    }
    await expect(byText('Face ID sign-in')).toExist()
    await expect(manageAccount.faceIdToggle).toExist()
  })

  it('has a Change link for every detail', async () => {
    for (const field of Object.keys(account)) {
      await expect(manageAccount.changeLink(field)).toExist()
    }
  })

  it('stays on the screen when tapping an inert Change link', async () => {
    await manageAccount.changeLink('firstName').click()

    await expect(manageAccount.title).toBeDisplayed()
  })

  it('starts with Face ID sign-in turned off', async () => {
    await expect(manageAccount.faceIdToggle).toHaveAttribute('value', '0')
  })

  it('keeps the tab bar visible', async () => {
    await expect(tabBar.home).toBeDisplayed()
    await expect(tabBar.settings).toBeDisplayed()
  })

  it('returns to Settings with Back', async () => {
    await header.goBack()

    await expect(settings.title).toBeDisplayed()
  })
})
