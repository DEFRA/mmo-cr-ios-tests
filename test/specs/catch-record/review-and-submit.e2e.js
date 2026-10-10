import { expect } from '@wdio/globals'
import { launchApp, Seam } from '#support/app.js'
import { byText } from '#support/selectors.js'
import { seededDraft } from '#support/test-data.js'
import home from '#screens/home.screen.js'
import {
  checkYourAnswers,
  selectVessel,
  submissionConfirmation,
  submissionSuccess
} from '#screens/catch-record.screens.js'

describe('Catch record - review and submit', () => {
  describe('Check your answers', () => {
    beforeEach(async () => {
      await launchApp(Seam.catchRecordCheckYourAnswers)
    })

    it('shows the trip, gear and species-not-landed sections', async () => {
      await expect(checkYourAnswers.heading).toBeDisplayed()
      await expect(checkYourAnswers.section('trip')).toExist()
      await expect(checkYourAnswers.section('gear.SX')).toExist()
      await expect(checkYourAnswers.section('speciesNotLanded')).toExist()
    })

    it('shows the answers captured in the draft', async () => {
      await expect(checkYourAnswers.heading).toBeDisplayed()
      for (const value of Object.values(seededDraft)) {
        await expect(byText(value)).toExist()
      }
    })

    it('goes to the vessel screen from its Change link', async () => {
      await checkYourAnswers.changeLink('trip.vessel').click()

      await expect(selectVessel.radioGroup).toBeDisplayed()
      await expect(checkYourAnswers.heading).not.toExist()
    })

    it('continues to the confirmation screen', async () => {
      await checkYourAnswers.saveAndContinue()

      await expect(submissionConfirmation.heading).toBeDisplayed()
    })
  })

  describe('Submission confirmation', () => {
    beforeEach(async () => {
      await launchApp(Seam.catchRecordSubmissionConfirmation)
    })

    it('shows an error and stays put when the declaration is not ticked', async () => {
      await submissionConfirmation.acceptButton.click()

      await expect(submissionConfirmation.error).toBeDisplayed()
      await expect(submissionConfirmation.heading).toBeDisplayed()
    })

    it('submits once the declaration is ticked', async () => {
      await submissionConfirmation.confirmCheckbox.click()
      await submissionConfirmation.acceptButton.click()

      await expect(submissionSuccess.panel).toBeDisplayed()
    })
  })

  describe('Submission success', () => {
    beforeEach(async () => {
      await launchApp(Seam.catchRecordSubmissionSuccess)
    })

    it('shows the confirmation panel and what happens next', async () => {
      await expect(submissionSuccess.panel).toBeDisplayed()
      await expect(submissionSuccess.whatHappensNextHeading).toExist()
      await expect(submissionSuccess.bulletList).toExist()
    })

    it('returns to Home from "View your catch records"', async () => {
      await submissionSuccess.viewRecordsButton.click()

      await expect(home.warningBox).toBeDisplayed()
    })
  })
})
