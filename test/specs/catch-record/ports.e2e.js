import { expect } from '@wdio/globals'
import { launchApp, Seam } from '#support/app.js'
import { port } from '#support/test-data.js'
import {
  addGear,
  addPort,
  confirmSamePort,
  departurePort,
  returnPort
} from '#screens/catch-record.screens.js'

const portKey = port.toLowerCase()

describe('Catch record - ports', () => {
  describe('Add port (no favourites yet)', () => {
    beforeEach(async () => {
      await launchApp(Seam.catchRecordAddPort)
    })

    it('stays on Add port when continuing without a port', async () => {
      await addPort.saveAndContinue()

      await expect(addPort.heading).toBeDisplayed()
    })

    it('adds a port, then selects separate departure and return ports', async () => {
      await addPort.searchAndSelect(port)
      await addPort.saveAndContinue()

      await expect(confirmSamePort.heading).toBeDisplayed()
      await confirmSamePort.choose('no')
      await confirmSamePort.saveAndContinue()

      await expect(departurePort.heading).toBeDisplayed()
      await departurePort.saveAndContinue()
      await expect(departurePort.error).toBeDisplayed()
      await departurePort.choose(portKey)
      await departurePort.saveAndContinue()

      await expect(returnPort.heading).toBeDisplayed()
      await returnPort.choose(portKey)
      await returnPort.saveAndContinue()

      await expect(addGear.heading).toBeDisplayed()
    })
  })

  describe('Select port (favourites seeded)', () => {
    it('starts at departure port and "Add another port" opens the search', async () => {
      await launchApp(Seam.catchRecordSelectPort)

      await expect(departurePort.heading).toBeDisplayed()
      await departurePort.addAnotherButton.click()

      await expect(addPort.heading).toBeDisplayed()
    })
  })

  describe('Confirm same port', () => {
    beforeEach(async () => {
      await launchApp(Seam.catchRecordConfirmSamePort)
    })

    it('shows an error when continuing without an answer', async () => {
      await confirmSamePort.saveAndContinue()

      await expect(confirmSamePort.error).toBeDisplayed()
      await expect(confirmSamePort.heading).toBeDisplayed()
    })

    it('skips the departure and return screens when the port was the same', async () => {
      await confirmSamePort.choose('yes')
      await confirmSamePort.saveAndContinue()

      await expect(addGear.heading).toBeDisplayed()
      await expect(departurePort.heading).not.toExist()
      await expect(returnPort.heading).not.toExist()
    })

    it('continues to departure port when the port was different', async () => {
      await confirmSamePort.choose('no')
      await confirmSamePort.saveAndContinue()

      await expect(departurePort.heading).toBeDisplayed()
    })

    it('opens the port search from "Add another port"', async () => {
      await confirmSamePort.addAnotherButton.click()

      await expect(addPort.heading).toBeDisplayed()
    })
  })
})
