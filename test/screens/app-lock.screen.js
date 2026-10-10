import { byId } from '#support/selectors.js'

class AppLockScreen {
  get heading() {
    return byId('AppLock.heading')
  }

  get unlockButton() {
    return byId('AppLock.unlockButton')
  }

  get passwordFallbackLink() {
    return byId('AppLock.passwordFallbackLink')
  }

  get faceIdHint() {
    return byId('AppLock.faceIDHint')
  }

  get error() {
    return byId('AppLock.error')
  }
}

export default new AppLockScreen()
