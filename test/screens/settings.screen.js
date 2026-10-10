import { byId, byText } from '#support/selectors.js'

class SettingsScreen {
  get title() {
    return byText('Settings')
  }

  get analyticsToggle() {
    return byId('Settings.analyticsToggle')
  }

  get myAccountLink() {
    return byId('Settings.link.myAccount')
  }

  get privacyNoticeLink() {
    return byId('Settings.link.privacyNotice')
  }

  get supportInformationLink() {
    return byId('Settings.link.supportInformation')
  }

  get signOutLink() {
    return byId('Settings.link.signOut')
  }

  get gearUsedChange() {
    return byId('Settings.gearUsed.change')
  }
}

class ManageAccountScreen {
  get title() {
    return byId('ManageAccount.title')
  }

  get faceIdToggle() {
    return byId('ManageAccount.faceIDToggle')
  }

  get faceIdEnableFailed() {
    return byId('ManageAccount.faceIDEnableFailed')
  }

  /** @param {'firstName'|'lastName'|'address'|'email'|'contactNumber'} field */
  changeLink(field) {
    return byId(`ManageAccount.change.${field}`)
  }
}

export const settings = new SettingsScreen()
export const manageAccount = new ManageAccountScreen()
