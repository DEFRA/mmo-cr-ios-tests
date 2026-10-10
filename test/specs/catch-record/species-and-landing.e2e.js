import { expect } from '@wdio/globals'
import { launchApp, Seam } from '#support/app.js'
import { species } from '#support/test-data.js'
import {
  addSpecies,
  checkYourAnswers,
  landingStorage,
  landingStorageSpecies,
  recordSpeciesWeights,
  removeSpecies
} from '#screens/catch-record.screens.js'

describe('Catch record - species and landing', () => {
  describe('Record species weights', () => {
    beforeEach(async () => {
      await launchApp(Seam.catchRecordSpeciesWeights)
    })

    it('reveals the weight fields once a species is ticked', async () => {
      await expect(
        recordSpeciesWeights.speciesOption(species.cod)
      ).toBeDisplayed()
      await expect(recordSpeciesWeights.weightAbove(species.cod)).not.toExist()

      await recordSpeciesWeights.speciesOption(species.cod).click()

      await expect(
        recordSpeciesWeights.weightAbove(species.cod)
      ).toBeDisplayed()
      await expect(recordSpeciesWeights.addBelowLink(species.cod)).toExist()
      await expect(recordSpeciesWeights.addDiscardedLink(species.cod)).toExist()
    })

    it('shows an error when continuing without a species', async () => {
      await recordSpeciesWeights.saveAndContinue()

      await expect(recordSpeciesWeights.selectionError).toBeDisplayed()
      await expect(landingStorage.heading).not.toExist()
    })

    it('saves a species with only a legally discarded weight', async () => {
      await recordSpeciesWeights.speciesOption(species.cod).click()
      await recordSpeciesWeights.addDiscardedLink(species.cod).click()
      await recordSpeciesWeights.weightDiscarded(species.cod).setValue('12')
      await recordSpeciesWeights.dismissKeyboard()
      await recordSpeciesWeights.saveAndContinue()

      await expect(landingStorage.heading).toBeDisplayed()
    })

    it('adds another species from the search and returns to the weights', async () => {
      await recordSpeciesWeights.addSpeciesLink.click()
      await expect(addSpecies.heading).toBeDisplayed()

      await addSpecies.searchAndSelect('Atlantic herring', species.herring)
      await addSpecies.saveAndContinue()

      await expect(recordSpeciesWeights.heading).toBeDisplayed()
      await expect(
        recordSpeciesWeights.speciesOption(species.herring)
      ).toBeDisplayed()
    })
  })

  describe('Remove species', () => {
    it('opens Remove species from the weights screen and cancels without changes', async () => {
      await launchApp(Seam.catchRecordRecordSpeciesWeights)
      await recordSpeciesWeights.removeSpeciesLink.click()
      await expect(removeSpecies.heading).toBeDisplayed()

      await removeSpecies.cancelButton.click()

      await expect(recordSpeciesWeights.heading).toBeDisplayed()
      await expect(recordSpeciesWeights.removeSpeciesLink).toBeDisplayed()
    })

    describe('from two recorded species', () => {
      beforeEach(async () => {
        await launchApp(Seam.catchRecordRemoveSpecies)
      })

      it('shows an error when deleting with nothing selected', async () => {
        await removeSpecies.deleteButton.click()

        await expect(removeSpecies.error).toBeDisplayed()
        await expect(removeSpecies.confirmDeleteButton).not.toExist()
      })

      it('returns to the weights screen after removing one species', async () => {
        await removeSpecies.speciesOption(species.cod).click()
        await removeSpecies.deleteButton.click()
        await removeSpecies.confirmDeleteButton.click()

        await expect(recordSpeciesWeights.heading).toBeDisplayed()
      })

      it('goes to Add species after removing the last species', async () => {
        await removeSpecies.speciesOption(species.cod).click()
        await removeSpecies.speciesOption(species.bass).click()
        await removeSpecies.deleteButton.click()
        await removeSpecies.confirmDeleteButton.click()

        await expect(addSpecies.heading).toBeDisplayed()
      })

      it('keeps both species when the delete confirmation is cancelled', async () => {
        await removeSpecies.speciesOption(species.cod).click()
        await removeSpecies.deleteButton.click()
        await removeSpecies.cancelDeleteConfirmButton.click()

        await expect(removeSpecies.heading).toBeDisplayed()
        await expect(removeSpecies.speciesOption(species.cod)).toBeDisplayed()
      })
    })
  })

  describe('Landing storage', () => {
    beforeEach(async () => {
      await launchApp(Seam.catchRecordLandingStorage)
    })

    it('shows an error when continuing without an answer', async () => {
      await landingStorage.saveAndContinue()

      await expect(landingStorage.error).toBeDisplayed()
      await expect(landingStorage.heading).toBeDisplayed()
    })

    it('goes straight to Check your answers when all catch is landed', async () => {
      await landingStorage.choose('no')
      await landingStorage.saveAndContinue()

      await expect(checkYourAnswers.heading).toBeDisplayed()
      await expect(landingStorageSpecies.heading).not.toExist()
    })

    it('records the weight of catch not landed, then shows Check your answers', async () => {
      await landingStorage.choose('yes')
      await landingStorage.saveAndContinue()
      await expect(landingStorageSpecies.heading).toBeDisplayed()
      await expect(landingStorageSpecies.weight(species.cod)).not.toExist()

      await landingStorageSpecies.speciesOption(species.cod).click()
      await landingStorageSpecies.weight(species.cod).setValue('8')
      await landingStorageSpecies.dismissKeyboard()
      await landingStorageSpecies.saveAndContinue()

      await expect(checkYourAnswers.heading).toBeDisplayed()
    })
  })
})
