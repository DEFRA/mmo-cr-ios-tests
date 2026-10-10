import { expect } from '@wdio/globals'
import { launchApp } from '#support/app.js'
import { byText } from '#support/selectors.js'
import {
  credentials,
  gear,
  port,
  species,
  subArea,
  vessel
} from '#support/test-data.js'
import signIn from '#screens/sign-in.screen.js'
import home from '#screens/home.screen.js'
import { tabBar } from '#screens/navigation.screen.js'
import {
  addGear,
  addPort,
  addSpecies,
  catchLocation,
  catchLocationManualEntry,
  checkYourAnswers,
  confirmSamePort,
  gearMeasurements,
  landingStorage,
  recordSpeciesWeights,
  selectGear,
  selectVessel,
  submissionConfirmation,
  submissionSuccess,
  tripToday
} from '#screens/catch-record.screens.js'

// Drives the real app from Sign in to a submitted record with no UI-test seams
describe('Create a catch record end to end', () => {
  before(async () => {
    await launchApp()
  })

  it('signs in and starts a new record', async () => {
    await signIn.signIn(credentials)
    await home.createRecord()

    await selectVessel.choose(vessel.toLowerCase())
    await selectVessel.saveAndContinue()
  })

  it('records a same-day trip from a single port', async () => {
    await tripToday.choose('yes')
    await tripToday.saveAndContinue()

    await addPort.searchAndSelect(port)
    await addPort.saveAndContinue()

    await confirmSamePort.choose('yes')
    await confirmSamePort.saveAndContinue()
  })

  it('adds the gear and its measurements', async () => {
    await addGear.searchAndSelect(gear.searchTerm, gear.name)
    await addGear.saveAndContinue()

    await gearMeasurements.field('meshSize').setValue(gear.meshSize)
    await gearMeasurements.dismissKeyboard()
    await gearMeasurements.saveAndContinue()

    await selectGear.choose(gear.id)
    await selectGear
      .variableMeasurement(gear.id, 'timesShot')
      .setValue(gear.timesShot)
    await selectGear.dismissKeyboard()
    await selectGear.saveAndContinue()
  })

  it('enters the catch location by sub-area code', async () => {
    await catchLocation.otherButton.click()
    await catchLocationManualEntry.searchAndSelect(
      subArea.searchTerm,
      subArea.code
    )
    await catchLocationManualEntry.saveAndContinue()
  })

  it('records the species caught and that all catch was landed', async () => {
    await addSpecies.searchAndSelect('Atlantic cod', species.cod)
    await addSpecies.saveAndContinue()

    await recordSpeciesWeights.speciesOption(species.cod).click()
    await recordSpeciesWeights.weightAbove(species.cod).setValue('250')
    await recordSpeciesWeights.dismissKeyboard()
    await recordSpeciesWeights.saveAndContinue()

    await landingStorage.choose('no')
    await landingStorage.saveAndContinue()
  })

  it('shows every answer on Check your answers', async () => {
    await expect(checkYourAnswers.heading).toBeDisplayed()
    for (const answer of [vessel, port, gear.name, subArea.code]) {
      await expect(byText(answer)).toExist()
    }
    await expect(byText(species.cod)).toExist()

    await checkYourAnswers.saveAndContinue()
  })

  it('submits the record and returns to Home', async () => {
    await submissionConfirmation.confirmCheckbox.click()
    await submissionConfirmation.acceptButton.click()
    await expect(submissionSuccess.panel).toBeDisplayed()

    await submissionSuccess.viewRecordsButton.click()

    // Home keeps its earlier scroll position, so check presence rather than visibility
    await expect(submissionSuccess.panel).not.toExist()
    await expect(home.warningBox).toExist()
    await expect(home.createRecordButton).toExist()
    await expect(tabBar.home).toBeDisplayed()
  })
})
