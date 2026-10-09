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

// Set on the CDP Portal; locally the tunnel uses this machine's network (and VPN)
const proxyUrl = process.env.HTTPS_PROXY || process.env.HTTP_PROXY
const proxy = proxyUrl ? new URL(proxyUrl) : null

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
          process.env.BROWSERSTACK_APP_ID,
        // Tunnel device traffic through this machine (and its VPN)
        browserstackLocal: true,
        opts: {
          forceLocal: true,
          ...(proxy && {
            proxyHost: proxy.hostname,
            proxyPort: Number(proxy.port)
          })
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

  reporters: [
    [
      // Spec reporter provides rolling output to the logger so you can see it in-progress
      'spec',
      {
        addConsoleLogs: true,
        realtimeReporting: true,
        color: false
      }
    ],
    [
      // Allure is used to generate the final HTML report
      'allure',
      {
        outputDir: 'allure-results'
      }
    ]
  ],

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
  },

  onComplete: function (exitCode, config, capabilities, results) {
    // !Do Not Remove! Required for test status to show correctly in portal.
    if (results?.failed && results.failed > 0) {
      fs.writeFileSync('FAILED', JSON.stringify(results))
    }
  }
}
