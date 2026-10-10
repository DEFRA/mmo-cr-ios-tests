import { byId, tabBarButton } from '#support/selectors.js'

class HeaderScreen {
  get branding() {
    return byId('ViewHeader.branding')
  }

  get backButton() {
    return byId('ViewHeader.backButton')
  }

  get languageToggle() {
    return byId('Header.languageToggle')
  }

  async goBack() {
    await this.backButton.click()
  }
}

class TabBarScreen {
  get home() {
    return tabBarButton('Home')
  }

  get notifications() {
    return tabBarButton('Notifications')
  }

  get settings() {
    return tabBarButton('Settings')
  }
}

export const header = new HeaderScreen()
export const tabBar = new TabBarScreen()
