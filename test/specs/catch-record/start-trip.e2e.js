import { expect } from '@wdio/globals'
import { launchApp, Seam } from '#support/app.js'
import { vessel } from '#support/test-data.js'
import home from '#screens/home.screen.js'
import { header } from '#screens/navigation.screen.js'
import {
  addPort,
  departureDate,
  draftAction,
  returnDate,
  selectVessel,
  submissionNudge,
  tripToday
} from '#screens/catch-record.screens.js'

const vesselKey = vessel.toLowerCase()

describe('Catch record - start a trip', () => {
  describe('Draft action (Unsent record)', () => {
    it('opens an Unsent draft from the Home records table', async () => {
      await launchApp(Seam.home)
      await home.createRecord()
      await selectVessel.choose(vesselKey)
      await selectVessel.saveAndContinue()
      await expect(tripToday.radioGroup).toBeDisplayed()

      await header.goBack()
      await expect(selectVessel.radioGroup).toBeDisplayed()
      await header.goBack()

      // The new draft is the most recently edited, so it sorts first
      await home.rowDate(0).click()

      await expect(draftAction.radioGroup).toBeDisplayed()
    })

    describe('from a seeded draft', () => {
      beforeEach(async () => {
        await launchApp(Seam.catchRecordDraft)
      })

      it('shows an error when continuing without a choice', async () => {
        await draftAction.saveAndContinue()

        await expect(draftAction.error).toBeDisplayed()
        await expect(draftAction.radioGroup).toBeDisplayed()
      })

      it('resumes the journey at Select vessel when completing', async () => {
        await draftAction.choose('complete')
        await draftAction.saveAndContinue()

        await expect(selectVessel.radioGroup).toBeDisplayed()
      })

      it('returns to Home after confirming delete', async () => {
        await draftAction.choose('delete')
        await draftAction.saveAndContinue()
        await draftAction.deleteConfirmButton.click()

        await expect(home.warningBox).toBeDisplayed()
      })

      it('stays on Draft action after cancelling delete', async () => {
        await draftAction.choose('delete')
        await draftAction.saveAndContinue()
        await draftAction.deleteCancelButton.click()

        await expect(draftAction.radioGroup).toBeDisplayed()
      })
    })
  })

  describe('Select vessel and trip dates', () => {
    beforeEach(async () => {
      await launchApp(Seam.catchRecordNew)
    })

    it('shows an error when continuing without a vessel', async () => {
      await selectVessel.saveAndContinue()

      await expect(selectVessel.error).toBeDisplayed()
    })

    it('asks whether the trip was today and shows the reference number', async () => {
      await selectVessel.choose(vesselKey)
      await selectVessel.saveAndContinue()

      await expect(tripToday.radioGroup).toBeDisplayed()
      await expect(tripToday.referenceNumber).toBeDisplayed()
    })

    it('shows an error when continuing without answering trip today', async () => {
      await selectVessel.choose(vesselKey)
      await selectVessel.saveAndContinue()
      await tripToday.saveAndContinue()

      await expect(tripToday.error).toBeDisplayed()
      await expect(tripToday.radioGroup).toBeDisplayed()
    })

    it('goes straight to Add port when the trip was today', async () => {
      await selectVessel.choose(vesselKey)
      await selectVessel.saveAndContinue()
      await tripToday.choose('yes')
      await tripToday.saveAndContinue()

      await expect(addPort.heading).toBeDisplayed()
    })

    it('asks for departure and return dates when the trip was not today', async () => {
      await selectVessel.choose(vesselKey)
      await selectVessel.saveAndContinue()
      await tripToday.choose('no')
      await tripToday.saveAndContinue()

      // Both pickers default to today, which is inside the 24-hour window (no nudge)
      await expect(departureDate.heading).toBeDisplayed()
      await expect(departureDate.picker).toExist()
      await departureDate.saveAndContinue()

      await expect(returnDate.heading).toBeDisplayed()
      await expect(returnDate.picker).toExist()
      await returnDate.saveAndContinue()

      await expect(addPort.heading).toBeDisplayed()
    })
  })

  describe('Late submission nudge', () => {
    beforeEach(async () => {
      await launchApp(Seam.catchRecordSubmissionNudge)
    })

    it('shows the heading, reference number and check-date link', async () => {
      await expect(submissionNudge.heading).toBeDisplayed()
      await expect(submissionNudge.referenceNumber).toExist()
      await expect(submissionNudge.checkDateLink).toExist()
    })

    it('continues to Add port', async () => {
      await submissionNudge.saveAndContinue()

      await expect(addPort.heading).toBeDisplayed()
    })

    it('goes back from "Check the trip end date"', async () => {
      await submissionNudge.checkDateLink.click()

      await expect(home.warningBox).toBeDisplayed()
      await expect(submissionNudge.heading).not.toExist()
    })
  })
})
