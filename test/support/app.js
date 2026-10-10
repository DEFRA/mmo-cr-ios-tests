import { driver } from '@wdio/globals'

export const BUNDLE_ID =
  process.env.APP_BUNDLE_ID || 'mmo.catchrecordingdev.ios'

// Mirrors `LaunchArguments.Flag` in DEFRA/mmo-cr-ios (record-catch/App/LaunchArguments.swift)
export const Seam = Object.freeze({
  appLockLocked: '-uiTestAppLockLocked',
  appLockFallback: '-uiTestAppLockFallback',
  home: '-uiTestHome',
  settings: '-uiTestSettings',
  manageAccount: '-uiTestManageAccount',
  notifications: '-uiTestNotifications',
  tabBar: '-uiTestTabBar',
  catchRecordDraft: '-uiTestCatchRecordDraft',
  catchRecordNew: '-uiTestCatchRecordNew',
  catchRecordAddPort: '-uiTestCatchRecordAddPort',
  catchRecordConfirmSamePort: '-uiTestCatchRecordConfirmSamePort',
  catchRecordSelectPort: '-uiTestCatchRecordSelectPort',
  catchRecordSelectGear: '-uiTestCatchRecordSelectGear',
  catchRecordCatchLocationManualEntry:
    '-uiTestCatchRecordCatchLocationManualEntry',
  catchRecordSpeciesWeights: '-uiTestCatchRecordSpeciesWeights',
  catchRecordLandingStorage: '-uiTestCatchRecordLandingStorage',
  catchRecordSubmissionNudge: '-uiTestCatchRecordSubmissionNudge',
  catchRecordRecordSpeciesWeights: '-uiTestCatchRecordRecordSpeciesWeights',
  catchRecordRemoveSpecies: '-uiTestCatchRecordRemoveSpecies',
  catchRecordCheckYourAnswers: '-uiTestCatchRecordCheckYourAnswers',
  catchRecordSubmissionConfirmation: '-uiTestCatchRecordSubmissionConfirmation',
  catchRecordSubmissionSuccess: '-uiTestCatchRecordSubmissionSuccess'
})

/**
 * Relaunches the app from a clean state. Without a seam it opens the real root (Sign in).
 * `-uiTestResetLanguage` forces English and keeps drafts in memory, so tests never share state.
 */
export async function launchApp(seam) {
  await driver.execute('mobile: terminateApp', { bundleId: BUNDLE_ID })
  await driver.execute('mobile: launchApp', {
    bundleId: BUNDLE_ID,
    arguments: ['-uiTestResetLanguage', ...(seam ? [seam] : [])]
  })
}

/**
 * Kills and reopens the app with no launch arguments, exactly as a user would,
 * so it uses its real on-device storage (SwiftData) instead of the in-memory test store.
 */
export async function restartApp() {
  await driver.execute('mobile: terminateApp', { bundleId: BUNDLE_ID })
  await driver.execute('mobile: launchApp', { bundleId: BUNDLE_ID })
}

/** Wipes all app data by reinstalling the app, then opens it as a first-time user. */
export async function freshInstall() {
  const app = driver.requestedCapabilities['appium:app']
  // BrowserStack installs the app on a clean device for every session already
  if (app && !app.startsWith('bs://')) {
    await driver.execute('mobile: removeApp', { bundleId: BUNDLE_ID })
    await driver.execute('mobile: installApp', { app })
  }
  await restartApp()
}
