import { execFile } from 'node:child_process';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { promisify } from 'node:util';
import { browser } from '@wdio/globals';
import { logInfo, logWarn } from '../test/common/logger.ts';

const envPath = resolve(process.cwd(), process.env.ENV_FILE ?? '.env');
if (existsSync(envPath)) {
    process.loadEnvFile(envPath);
}

export const appiumPort = Number(process.env.APPIUM_PORT ?? 4723);

// Must not exceed the BrowserStack plan's parallel sessions; extra session requests are rejected.
export const browserStackMaxInstances = Number(process.env.BROWSERSTACK_MAX_INSTANCES ?? 2);

export function cleanLogs(): void {
    for (const logDirectory of ['log', 'logs']) {
        rmSync(resolve(process.cwd(), logDirectory), {
            recursive: true,
            force: true,
        });
        mkdirSync(resolve(process.cwd(), logDirectory), { recursive: true });
    }
}

// Runs once in the launcher, before services open their log files; workers re-import this config.
if (!process.env.WDIO_WORKER_ID) {
    cleanLogs();
}

export function cleanReports(): void {
    for (const reportDirectory of ['allure-results', 'allure-report']) {
        rmSync(resolve(process.cwd(), reportDirectory), {
            recursive: true,
            force: true,
        });
    }
    mkdirSync(resolve(process.cwd(), 'allure-results'), { recursive: true });
}

const execFileAsync = promisify(execFile);

export async function uninstallIosApp(bundleId: string, udid?: string): Promise<void> {
    if (!udid) {
        await logWarn('[onPrepare] IOS_UDID not set, skipping iOS app uninstall check');
        return;
    }
    try {
        await execFileAsync('xcrun', ['simctl', 'get_app_container', udid, bundleId]);
    } catch {
        await logInfo(`[onPrepare] iOS app ${bundleId} is not installed, nothing to uninstall`);
        return;
    }
    await logInfo(`[onPrepare] Uninstalling existing iOS app ${bundleId}`);
    try {
        await execFileAsync('xcrun', ['simctl', 'uninstall', udid, bundleId]);
    } catch (err) {
        await logWarn(
            `[onPrepare] Skipped iOS uninstall for ${bundleId}: ${(err as Error).message}`,
        );
    }
}

export const baseConfig: Partial<WebdriverIO.Config> = {
    logLevel: 'info',
    waitforTimeout: 20000,
    connectionRetryCount: 3,
    port: appiumPort,

    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 120000,
    },

    beforeTest: async (test) => {
        await logInfo(`Starting test: ${test.title}`);
    },

    afterTest: async (test, _context, { error }: { error?: unknown }) => {
        if (error) {
            await logWarn(`Test FAILED: ${test.title}`);
            await browser.takeScreenshot();
        } else {
            await logInfo(`Test PASSED: ${test.title}`);
        }
    },

    reporters: [
        'spec',
        [
            'allure',
            {
                outputDir: 'allure-results',
                disableWebdriverStepsReporting: true,
                disableWebdriverScreenshotsReporting: false,
            },
        ],
    ],

    onComplete: (_exitCode, _config, _capabilities, results: { failed: number }) => {
        // !Do Not Remove! entrypoint.sh uses this file to report a failed run to the CDP Portal.
        if (results.failed > 0) {
            writeFileSync('FAILED', JSON.stringify(results));
        }
    },
};

type CapabilityMap = Record<string, unknown>;

const isPlainObject = (value: unknown): value is CapabilityMap =>
    typeof value === 'object' && value !== null && !Array.isArray(value);

export function mergeCommonCapabilities(
    config: WebdriverIO.Config,
    commonCaps: CapabilityMap,
): void {
    if (!Array.isArray(config.capabilities)) {
        return;
    }
    for (const caps of config.capabilities) {
        const cap = caps as CapabilityMap;
        for (const [key, value] of Object.entries(commonCaps)) {
            if (isPlainObject(value)) {
                const existing = cap[key];
                cap[key] = { ...(isPlainObject(existing) ? existing : {}), ...value };
            } else {
                cap[key] ??= value;
            }
        }
    }
}
