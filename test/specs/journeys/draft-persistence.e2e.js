import { $$, expect } from '@wdio/globals'
import { freshInstall, restartApp } from '#support/app.js'
import { byText } from '#support/selectors.js'
import signIn from '#screens/sign-in.screen.js'
import home from '#screens/home.screen.js'
import {
  draftAction,
  selectVessel,
  tripToday
} from '#screens/catch-record.screens.js'

// Stubbed server records all use ACHILLES, so HERCULES identifies the draft created here
const draftVessel = 'HERCULES'
const draftVesselKey = draftVessel.toLowerCase()

const unsentRowCount = async () =>
  (
    await $$(
      '-ios predicate string:type == "XCUIElementTypeStaticText" AND label == "Unsent"'
    )
  ).length

async function createDraft() {
  await signIn.signIn()
  await home.createRecord()
  await selectVessel.choose(draftVesselKey)
  await selectVessel.saveAndContinue()
  await expect(tripToday.radioGroup).toBeDisplayed()
}

async function reopenAppAtHome() {
  await restartApp()
  await signIn.signIn()
  await expect(home.warningBox).toBeDisplayed()
}

async function openFirstDraft(action) {
  // Drafts are listed most recently edited first
  await home.rowDate(0).click()
  await draftAction.choose(action)
  await draftAction.saveAndContinue()
}

// Uses the app's real on-device storage: no -uiTest launch arguments anywhere in this spec
describe('Unsent drafts persist across app restarts', () => {
  describe('saving and deleting', () => {
    before(async () => {
      await freshInstall()
    })

    it('keeps the draft as Unsent after the app is closed and reopened', async () => {
      await createDraft()

      await reopenAppAtHome()

      await expect(byText(draftVessel)).toExist()
      expect(await unsentRowCount()).toBe(1)
    })

    it('removes the draft for good once deleted', async () => {
      await openFirstDraft('delete')
      await draftAction.deleteConfirmButton.click()
      await expect(home.warningBox).toBeDisplayed()

      await reopenAppAtHome()

      await expect(byText(draftVessel)).not.toExist()
      expect(await unsentRowCount()).toBe(0)
    })
  })

  describe('resuming', () => {
    before(async () => {
      await freshInstall()
      await createDraft()
      await reopenAppAtHome()
    })

    it('reopens the draft with the vessel already selected', async () => {
      await openFirstDraft('complete')

      await expect(selectVessel.option(draftVesselKey)).toBeSelected()
      await selectVessel.saveAndContinue()
      await expect(tripToday.radioGroup).toBeDisplayed()
    })

    it('updates the same draft rather than creating a duplicate', async () => {
      await reopenAppAtHome()

      expect(await unsentRowCount()).toBe(1)
    })
  })
})
