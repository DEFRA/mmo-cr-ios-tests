import {
    baseConfig,
    browserStackMaxInstances,
    cleanReports,
    mergeCommonCapabilities,
} from './wdio.base.conf.ts';
import { logInfo } from '../test/common/logger.ts';

const {
    BROWSERSTACK_USERNAME,
    BROWSERSTACK_ACCESS_KEY,
    BROWSERSTACK_IOS_APP_URL: appUrl,
} = process.env;
if (!BROWSERSTACK_USERNAME || !BROWSERSTACK_ACCESS_KEY || !appUrl) {
    throw new Error(
        'Set BROWSERSTACK_USERNAME, BROWSERSTACK_ACCESS_KEY and BROWSERSTACK_IOS_APP_URL in your shell or in .env',
    );
}

export const config: WebdriverIO.Config = {
    ...baseConfig,

    user: BROWSERSTACK_USERNAME,
    key: BROWSERSTACK_ACCESS_KEY,
    protocol: 'https',
    hostname: 'hub.browserstack.com',
    port: 443,

    services: [
        [
            'browserstack',
            {
                buildIdentifier: '${BUILD_NUMBER}',
                app: appUrl,
                browserstackLocal: false,
                percy: false,
            },
        ],
    ],

    capabilities: [
        {
            platformName: 'iOS',
            'appium:automationName': 'XCUITest',
            'bstack:options': {
                deviceName: 'iPhone 17',
                osVersion: '26',
                realMobile: true,
            },
        },
    ],

    maxInstances: browserStackMaxInstances,

    onPrepare: () => {
        cleanReports();
        logInfo('BrowserStack iOS session starting...');
    },

    specs: ['../test/specs/**/*.spec.ts'],

    connectionRetryTimeout: 90000,
};

mergeCommonCapabilities(config, {
    'appium:options': {
        orientation: 'PORTRAIT',
        autoDismissAlerts: true,
    },
    'bstack:options': {
        projectName: 'mmo-cr-ios-tests',
        buildName: 'iOS Catch Recording',
        sessionName: 'iOS E2E Tests',
        debug: true,
        networkLogs: true,
    },
});
