import { driver, $, expect } from '@wdio/globals'

// Matches any button whose label/name contains "sign in" (case-insensitive)
const signInButton = () =>
  $(
    '-ios predicate string:type == "XCUIElementTypeButton" AND (label CONTAINS[c] "sign in" OR name CONTAINS[c] "sign in")'
  )

describe('iOS app - Sign in', () => {
  it('Should show a working Sign in button', async () => {
    const button = signInButton()
    await button.waitForDisplayed()
    await expect(button).toBeEnabled()

    const sourceBefore = await driver.getPageSource()
    await button.click()

    // Tapping should move the app to a different screen/state
    await driver.waitUntil(
      async () => (await driver.getPageSource()) !== sourceBefore,
      { timeoutMsg: 'Nothing changed after tapping Sign in' }
    )
  })
})
