import { byId, firstTextField, textFieldById } from '#support/selectors.js'
import { speciesKey } from '#support/test-data.js'

/**
 * Every "Create a catch record" screen namespaces its identifiers as `CatchRecord.<screen>.*`,
 * so one class covers the shared parts and subclasses add screen-specific elements.
 */
class JourneyScreen {
  constructor(prefix) {
    this.prefix = prefix
  }

  element(suffix) {
    return byId(`${this.prefix}.${suffix}`)
  }

  input(suffix) {
    return textFieldById(`${this.prefix}.${suffix}`)
  }

  get heading() {
    return this.element('heading')
  }

  get referenceNumber() {
    return this.element('referenceNumber')
  }

  get radioGroup() {
    return this.element('radioGroup')
  }

  get error() {
    return this.element('error')
  }

  get saveContinueButton() {
    return this.element('saveContinue')
  }

  get addAnotherButton() {
    return this.element('addAnother')
  }

  option(key) {
    return this.element(`option.${key}`)
  }

  async choose(key) {
    await this.option(key).click()
  }

  async saveAndContinue() {
    await this.saveContinueButton.click()
  }

  // Number pads have no return key, so tap the heading to dismiss them
  async dismissKeyboard() {
    await this.heading.click()
  }
}

class SearchScreen extends JourneyScreen {
  get searchField() {
    return firstTextField()
  }

  searchResult(label) {
    return byId(`SearchDropdownField.result.${label}`)
  }

  async search(term) {
    await this.searchField.setValue(term)
  }

  async searchAndSelect(term, result = term) {
    await this.search(term)
    await this.searchResult(result).click()
  }
}

class DraftActionScreen extends JourneyScreen {
  get deleteConfirmButton() {
    return this.element('deleteConfirm')
  }

  get deleteCancelButton() {
    return this.element('deleteCancel')
  }
}

class TripDateScreen extends JourneyScreen {
  get picker() {
    return this.element('picker')
  }
}

class SubmissionNudgeScreen extends JourneyScreen {
  get checkDateLink() {
    return this.element('checkDateLink')
  }
}

class GearMeasurementsScreen extends JourneyScreen {
  field(measurementId) {
    return this.input(`field.${measurementId}`)
  }
}

class SelectGearScreen extends JourneyScreen {
  variableMeasurement(gearId, measurementId) {
    return this.input(`variable.${gearId}.${measurementId}`)
  }
}

class CatchLocationScreen extends JourneyScreen {
  get map() {
    return this.element('map')
  }

  get otherButton() {
    return this.element('otherButton')
  }

  get selectedArea() {
    return this.element('selectedArea')
  }
}

class AddSpeciesScreen extends SearchScreen {
  get mistakenLink() {
    return this.element('mistakenLink')
  }

  get contactLink() {
    return this.element('contactLink')
  }
}

class RecordSpeciesWeightsScreen extends JourneyScreen {
  get selectionError() {
    return this.element('selectionError')
  }

  get addSpeciesLink() {
    return this.element('addSpecies')
  }

  get removeSpeciesLink() {
    return this.element('removeSpecies')
  }

  speciesOption(name) {
    return this.option(speciesKey(name))
  }

  weightAbove(name) {
    return this.input(`weightAbove.${speciesKey(name)}`)
  }

  weightBelow(name) {
    return this.input(`weightBelow.${speciesKey(name)}`)
  }

  weightDiscarded(name) {
    return this.input(`weightDiscarded.${speciesKey(name)}`)
  }

  addBelowLink(name) {
    return this.element(`addBelow.${speciesKey(name)}`)
  }

  addDiscardedLink(name) {
    return this.element(`addDiscarded.${speciesKey(name)}`)
  }
}

class RemoveSpeciesScreen extends JourneyScreen {
  get deleteButton() {
    return this.element('delete')
  }

  get cancelButton() {
    return this.element('cancel')
  }

  get confirmDeleteButton() {
    return this.element('confirmDelete')
  }

  get cancelDeleteConfirmButton() {
    return this.element('cancelDeleteConfirm')
  }

  speciesOption(name) {
    return this.option(speciesKey(name))
  }
}

class LandingStorageSpeciesScreen extends JourneyScreen {
  speciesOption(name) {
    return this.option(speciesKey(name))
  }

  weight(name) {
    return this.input(`weight.${speciesKey(name)}`)
  }
}

class CheckYourAnswersScreen extends JourneyScreen {
  section(id) {
    return this.element(`section.${id}`)
  }

  changeLink(rowId) {
    return this.element(`change.${rowId}`)
  }
}

class SubmissionConfirmationScreen extends JourneyScreen {
  get confirmCheckbox() {
    return this.element('confirmCheckbox')
  }

  get acceptButton() {
    return this.element('accept')
  }

  get notice() {
    return this.element('notice')
  }
}

class SubmissionSuccessScreen extends JourneyScreen {
  get panel() {
    return this.element('panel')
  }

  get whatHappensNextHeading() {
    return this.element('whatHappensNextHeading')
  }

  get bulletList() {
    return this.element('bulletList')
  }

  get viewRecordsButton() {
    return this.element('viewRecords')
  }
}

export const draftAction = new DraftActionScreen('CatchRecord.draftAction')
export const selectVessel = new JourneyScreen('CatchRecord.selectVessel')
export const tripToday = new JourneyScreen('CatchRecord.tripToday')
export const departureDate = new TripDateScreen(
  'CatchRecord.tripDate.departure'
)
export const returnDate = new TripDateScreen('CatchRecord.tripDate.return')
export const submissionNudge = new SubmissionNudgeScreen(
  'CatchRecord.submissionNudge'
)
export const addPort = new SearchScreen('CatchRecord.addPort')
export const confirmSamePort = new JourneyScreen('CatchRecord.confirmSamePort')
export const departurePort = new JourneyScreen(
  'CatchRecord.selectPort.departure'
)
export const returnPort = new JourneyScreen('CatchRecord.selectPort.return')
export const addGear = new SearchScreen('CatchRecord.addGear')
export const gearMeasurements = new GearMeasurementsScreen(
  'CatchRecord.gearMeasurements'
)
export const selectGear = new SelectGearScreen('CatchRecord.selectGear')
export const catchLocation = new CatchLocationScreen(
  'CatchRecord.catchLocation'
)
export const catchLocationManualEntry = new SearchScreen(
  'CatchRecord.catchLocationManualEntry'
)
export const addSpecies = new AddSpeciesScreen('CatchRecord.addSpecies')
export const recordSpeciesWeights = new RecordSpeciesWeightsScreen(
  'CatchRecord.recordSpeciesWeights'
)
export const removeSpecies = new RemoveSpeciesScreen(
  'CatchRecord.removeSpecies'
)
export const landingStorage = new JourneyScreen('CatchRecord.landingStorage')
export const landingStorageSpecies = new LandingStorageSpeciesScreen(
  'CatchRecord.landingStorageSpecies'
)
export const checkYourAnswers = new CheckYourAnswersScreen(
  'CatchRecord.checkYourAnswers'
)
export const submissionConfirmation = new SubmissionConfirmationScreen(
  'CatchRecord.submissionConfirmation'
)
export const submissionSuccess = new SubmissionSuccessScreen(
  'CatchRecord.submissionSuccess'
)
