import { expect } from '@wdio/globals'
import { launchApp, Seam } from '#support/app.js'
import appLock from '#screens/app-lock.screen.js'
import signIn from '#screens/sign-in.screen.js'
import home from '#screens/home.screen.js'

// The app-lock seams inject fake biometrics, so no real Face ID is used on the device
describe('App lock (biometric re-entry)', () => {
  describe('when re-entry is eligible', () => {
    beforeEach(async () => {
      await launchApp(Seam.appLockLocked)
    })

    it('shows the app lock screen with Face ID copy and a manual fallback', async () => {
      await expect(appLock.heading).toBeDisplayed()
      await expect(appLock.unlockButton).toHaveAttribute(
        'label',
        'Unlock with Face ID'
      )
      await expect(appLock.faceIdHint).toBeDisplayed()
      await expect(appLock.passwordFallbackLink).toBeDisplayed()
    })

    it('goes to Home when unlocking succeeds', async () => {
      await appLock.unlockButton.click()

      await expect(home.warningBox).toBeDisplayed()
    })

    it('goes to Sign in from the password fallback link', async () => {
      await appLock.passwordFallbackLink.click()

      await expect(signIn.heading).toBeDisplayed()
    })
  })

  describe('when re-entry is not eligible', () => {
    it('skips app lock and shows Sign in', async () => {
      await launchApp(Seam.appLockFallback)

      await expect(signIn.heading).toBeDisplayed()
      await expect(appLock.heading).not.toExist()
    })
  })
})
