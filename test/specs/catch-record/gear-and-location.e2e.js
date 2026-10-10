import { expect } from '@wdio/globals'
import { launchApp, Seam } from '#support/app.js'
import { byIdPrefix, byText } from '#support/selectors.js'
import { gear, subArea } from '#support/test-data.js'
import {
  addSpecies,
  catchLocation,
  catchLocationManualEntry,
  recordSpeciesWeights,
  selectGear
} from '#screens/catch-record.screens.js'

const timesShotField = () =>
  selectGear.variableMeasurement(gear.id, 'timesShot')

async function selectGearWithTimesShot(value) {
  await selectGear.choose(gear.id)
  await timesShotField().setValue(value)
  await selectGear.dismissKeyboard()
  await selectGear.saveAndContinue()
}

describe('Catch record - gear and catch location', () => {
  describe('Select gear', () => {
    beforeEach(async () => {
      await launchApp(Seam.catchRecordSelectGear)
    })

    it('reveals the times-shot field only once the gear is ticked', async () => {
      await expect(selectGear.option(gear.id)).toBeDisplayed()
      await expect(timesShotField()).not.toExist()

      await selectGear.choose(gear.id)

      await expect(timesShotField()).toBeDisplayed()
    })

    it('stays on Select gear when times shot is empty', async () => {
      await selectGear.choose(gear.id)
      await selectGear.saveAndContinue()

      await expect(selectGear.heading).toBeDisplayed()
      await expect(catchLocation.heading).not.toExist()
    })

    it('stays on Select gear when times shot is not a whole number', async () => {
      await selectGearWithTimesShot('5.5')

      await expect(selectGear.heading).toBeDisplayed()
      await expect(catchLocation.heading).not.toExist()
    })

    it('continues to catch location with a valid times shot', async () => {
      await selectGearWithTimesShot(gear.timesShot)

      await expect(catchLocation.heading).toBeDisplayed()
    })
  })

  describe('Catch location map', () => {
    beforeEach(async () => {
      await launchApp(Seam.catchRecordSelectGear)
      await selectGearWithTimesShot(gear.timesShot)
      await expect(catchLocation.heading).toBeDisplayed()
    })

    it('shows the interactive map and Save and continue', async () => {
      await expect(catchLocation.map).toBeDisplayed()
      await expect(catchLocation.saveContinueButton).toExist()
    })

    it('shows an error and stays put when no area is selected', async () => {
      await catchLocation.saveAndContinue()

      await expect(catchLocation.error).toBeDisplayed()
      await expect(catchLocation.heading).toBeDisplayed()
      await expect(recordSpeciesWeights.heading).not.toExist()
      await expect(addSpecies.heading).not.toExist()
    })

    it('opens manual sub-area entry from "Other"', async () => {
      await catchLocation.otherButton.click()

      await expect(catchLocationManualEntry.heading).toBeDisplayed()
    })
  })

  describe('Manual sub-area entry', () => {
    beforeEach(async () => {
      await launchApp(Seam.catchRecordCatchLocationManualEntry)
    })

    it('shows the heading, search field and Save and continue', async () => {
      await expect(catchLocationManualEntry.heading).toBeDisplayed()
      await expect(catchLocationManualEntry.searchField).toBeDisplayed()
      await expect(catchLocationManualEntry.saveContinueButton).toExist()
    })

    it('lists matching sub-areas after typing two or more characters', async () => {
      await catchLocationManualEntry.search(subArea.searchTerm)

      await expect(byIdPrefix('SearchDropdownField.result.')).toBeDisplayed()
    })

    it('fills the field from a result and continues to Add species', async () => {
      await catchLocationManualEntry.searchAndSelect(
        subArea.searchTerm,
        subArea.code
      )
      await expect(catchLocationManualEntry.searchField).toHaveAttribute(
        'value',
        subArea.code
      )

      await catchLocationManualEntry.saveAndContinue()

      await expect(addSpecies.heading).toBeDisplayed()
    })

    it('stays put when continuing without a sub-area', async () => {
      await catchLocationManualEntry.saveAndContinue()

      await expect(catchLocationManualEntry.heading).toBeDisplayed()
      await expect(addSpecies.heading).not.toExist()
    })

    it('shows an error for a code that does not exist', async () => {
      await catchLocationManualEntry.search('ZZ')
      await catchLocationManualEntry.saveAndContinue()

      await expect(byText('Select a statistical subrectangle')).toBeDisplayed()
      await expect(catchLocationManualEntry.heading).toBeDisplayed()
      await expect(addSpecies.heading).not.toExist()
    })
  })
})
