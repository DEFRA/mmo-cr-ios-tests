import { expect } from '@wdio/globals'
import { launchApp, Seam } from '#support/app.js'
import { byText } from '#support/selectors.js'
import home from '#screens/home.screen.js'
import { header } from '#screens/navigation.screen.js'
import { selectVessel } from '#screens/catch-record.screens.js'

describe('Home - Your trips', () => {
  beforeEach(async () => {
    await launchApp(Seam.home)
  })

  it('shows the warning, create button and records table', async () => {
    await expect(home.warningBox).toBeDisplayed()
    await expect(home.createRecordButton).toExist()
    await expect(home.rowDate(0)).toExist()
  })

  it('shows a single page of records without previous or next links', async () => {
    await expect(home.paginationPage(1)).toBeDisplayed()
    await expect(home.paginationPrevious).not.toExist()
    await expect(home.paginationNext).not.toExist()
    await expect(byText('Showing 1 to 3 of 3')).toExist()
  })

  it('starts a new catch record from the create button', async () => {
    await home.createRecord()

    await expect(selectVessel.radioGroup).toBeDisplayed()
  })

  it('expands "How to record" when tapped', async () => {
    await expect(byText('What you need to do')).not.toExist()

    await home.howToRecord.click()

    await expect(byText('What you need to do')).toBeDisplayed()
    await expect(byText('When to create your record')).toExist()
    await expect(byText('Special cases: ICES areas')).toExist()
    await expect(byText('Get help with your record')).toExist()
  })

  it('expands the status help independently of "How to record"', async () => {
    await home.statusHelp.click()

    await expect(byText('Unsent:')).toBeDisplayed()
    await expect(byText('What you need to do')).not.toExist()
  })

  describe('header', () => {
    it('labels the branding image GOV.UK', async () => {
      await expect(header.branding).toHaveAttribute('label', 'GOV.UK')
    })

    it('hides Back on Home but keeps the language toggle usable', async () => {
      await expect(header.branding).toBeDisplayed()
      await expect(header.backButton).not.toBeDisplayed()
      await expect(header.languageToggle).toBeDisplayed()
    })
  })
})
