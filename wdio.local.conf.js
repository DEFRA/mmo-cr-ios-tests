import fs from 'node:fs'
import path from 'node:path'

const oneMinute = 60 * 1000

const appPath = path.resolve(process.env.APP_PATH || './apps/record-catch.app')
if (!fs.existsSync(appPath)) {
  throw new Error(
    `No simulator app at ${appPath}. Run ./bin/build-simulator-app.sh or set APP_PATH`
  )
}

export const config = {
  runner: 'local',

  specs: ['./test/specs/**/*.e2e.js'],
  maxInstances: 1,

  capabilities: [
    {
      platformName: 'iOS',
      'appium:automationName': 'XCUITest',
      'appium:deviceName': process.env.SIMULATOR_DEVICE || 'iPhone 17',
      'appium:platformVersion': process.env.SIMULATOR_OS_VERSION || '27.0',
      'appium:app': appPath,
      'appium:newCommandTimeout': 240,
      // Building WebDriverAgent on the first run can take a few minutes
      'appium:wdaLaunchTimeout': 5 * oneMinute,
      'appium:wdaConnectionTimeout': 5 * oneMinute
    }
  ],

  services: [
    [
      'appium',
      {
        // Uses the globally installed Appium and its XCUITest driver
        command: 'appium',
        args: { relaxedSecurity: true }
      }
    ]
  ],

  logLevel: 'warn',
  bail: 0,
  waitforTimeout: 20000,
  waitforInterval: 500,
  connectionRetryTimeout: 6 * oneMinute,
  connectionRetryCount: 1,

  framework: 'mocha',

  reporters: [
    ['spec', { addConsoleLogs: true }],
    ['allure', { outputDir: 'allure-results' }]
  ],

  mochaOpts: {
    ui: 'bdd',
    timeout: 3 * oneMinute
  },

  afterTest: async function (test, context, { error }) {
    if (error) {
      await browser.takeScreenshot()
    }
  }
}
