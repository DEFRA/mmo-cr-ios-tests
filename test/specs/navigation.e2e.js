import { expect } from '@wdio/globals'
import { launchApp, Seam } from '#support/app.js'
import { byText } from '#support/selectors.js'
import home from '#screens/home.screen.js'
import { header, tabBar } from '#screens/navigation.screen.js'
import { settings } from '#screens/settings.screen.js'
import { selectVessel } from '#screens/catch-record.screens.js'

describe('Tab bar navigation', () => {
  beforeEach(async () => {
    await launchApp(Seam.tabBar)
  })

  it('shows all tabs and switches between them', async () => {
    await expect(tabBar.home).toBeDisplayed()
    await expect(tabBar.notifications).toBeDisplayed()
    await expect(tabBar.settings).toBeDisplayed()
    await expect(home.warningBox).toBeDisplayed()

    await tabBar.notifications.click()
    await expect(byText('Notifications')).toBeDisplayed()
    await expect(tabBar.home).toBeDisplayed()

    await tabBar.settings.click()
    await expect(settings.analyticsToggle).toBeDisplayed()
    await expect(tabBar.home).toBeDisplayed()

    await tabBar.home.click()
    await expect(home.warningBox).toBeDisplayed()
  })

  it('hides the tab bar during the catch record journey and restores it on Home', async () => {
    await home.createRecord()
    await expect(selectVessel.radioGroup).toBeDisplayed()
    await expect(tabBar.home).not.toBeDisplayed()
    await expect(tabBar.notifications).not.toBeDisplayed()
    await expect(tabBar.settings).not.toBeDisplayed()

    await header.goBack()

    await expect(home.createRecordButton).toBeDisplayed()
    await expect(tabBar.home).toBeDisplayed()
  })
})

describe('Notifications', () => {
  it('shows the placeholder heading and body', async () => {
    await launchApp(Seam.notifications)

    await expect(byText('Notifications')).toBeDisplayed()
    await expect(
      byText(
        "There are no notifications yet. This is where you'll see updates about your catch records."
      )
    ).toBeDisplayed()
    await expect(tabBar.notifications).toBeDisplayed()
  })
})
