import fs from 'node:fs'

const oneMinute = 60 * 1000
const failures = []

// Variables already set in the shell take precedence over the file
const envFile = process.env.ENV_FILE || '.env'
if (fs.existsSync(envFile)) {
  process.loadEnvFile(envFile)
}

if (!process.env.BROWSERSTACK_USERNAME || !process.env.BROWSERSTACK_KEY) {
  throw new Error(
    `Set BROWSERSTACK_USERNAME and BROWSERSTACK_KEY in your shell or in ${envFile}`
  )
}

export const config = {
  runner: 'local',

  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_KEY,

  specs: ['./test/app/specs/**/*.js'],
  maxInstances: 1,

  capabilities: [
    {
      platformName: 'ios',
      'appium:automationName': 'XCUITest',
      'bstack:options': {
        // App requires iOS 18+
        deviceName: process.env.BROWSERSTACK_DEVICE || 'iPhone 17',
        platformVersion: process.env.BROWSERSTACK_OS_VERSION || '26',
        projectName: 'mmo-cr-ios-tests',
        buildName: 'mmo-cr-ios-app',
        sessionName: 'Sign in button',
        debug: true,
        networkLogs: true
      }
    }
  ],

  services: [
    [
      'browserstack',
      {
        app:
          process.env.BROWSERSTACK_APP_ID ||
          'bs://ec38a1277cc28dec6c7b6f1d8a9b8a8985d20064',
        // Tunnel device traffic through this machine (and its VPN)
        browserstackLocal: true,
        opts: {
          forceLocal: true
        },
        testObservability: false
      }
    ]
  ],

  logLevel: 'info',
  bail: 0,
  waitforTimeout: 20000,
  waitforInterval: 500,
  connectionRetryTimeout: 2 * oneMinute,
  connectionRetryCount: 2,

  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 3 * oneMinute
  },

  afterTest: async function (test, context, { error }) {
    if (error) {
      failures.push(`${test.title}: ${error.message}`)
      await browser.takeScreenshot()
    }
  },

  // The service fails to detect the app session, so mark status here
  after: async function () {
    const status = failures.length ? 'failed' : 'passed'
    const reason = failures.join('; ').slice(0, 250) || 'All tests passed'
    await browser.execute(
      `browserstack_executor: ${JSON.stringify({
        action: 'setSessionStatus',
        arguments: { status, reason }
      })}`
    )
  }
}
