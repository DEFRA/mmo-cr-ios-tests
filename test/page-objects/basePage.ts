import { logStep, logInfo, logWarn, logError } from '../common/logger.ts';

export class BasePage {
    protected readonly appId = process.env.IOS_BUNDLE_ID ?? 'mmo.catchrecordingdev.ios';

    async openApp() {
        let lastError: unknown;

        logStep(`Opening app with ID ${this.appId}`);
        for (let attempt = 1; attempt <= 3; attempt++) {
            try {
                await driver.activateApp(this.appId);
                await driver.waitUntil(async () => (await driver.getPageSource()).length > 0, {
                    timeout: 20000,
                    timeoutMsg: 'App did not finish launching.',
                });
                logInfo(`BasePage: Successfully opened app on attempt ${String(attempt)}`);
                return;
            } catch (error) {
                lastError = error;
                logWarn(
                    `BasePage: Failed to open app on attempt ${String(attempt)}. Error: ${String(error)}`,
                );
                if (attempt < 3) {
                    await new Promise((resolve) => setTimeout(resolve, attempt * 2000));
                }
            }
        }

        logError(`BasePage: Failed to activate app ${this.appId} after 3 attempts`);
        throw lastError instanceof Error
            ? lastError
            : new Error(`Failed to activate app ${this.appId}.`);
    }

    async close() {
        logStep(`Terminating app ${this.appId}`);
        await driver.terminateApp(this.appId);
    }

    async navigateTo(tab: string) {
        logStep(`Navigating to tab ${tab}`);
        const tabElement = $(`~${tab}`);
        await tabElement.waitForDisplayed({ timeout: 10000 });
        await tabElement.click();
    }

    async switchContext(contextName: string) {
        await driver.switchContext(contextName);
    }

    async getContexts(): Promise<string[]> {
        return (await driver.getContexts()) as string[];
    }

    async switchToWebview() {
        logStep('Switching to WEBVIEW context');
        const contexts = await this.getContexts();
        const webviewContext = contexts.find((context) => context.includes('WEBVIEW'));
        if (!webviewContext) {
            logError('BasePage: Failed to find WEBVIEW context');
            throw new Error('No webview context found');
        }
        await this.switchContext(webviewContext);
    }

    async switchToNativeContext() {
        logStep('Switching to NATIVE_APP context');
        await this.switchContext('NATIVE_APP');
    }

    async acceptAlert() {
        logStep('Accepting alert');
        await driver.acceptAlert();
    }

    async dismissAlert() {
        logStep('Dismissing alert');
        await driver.dismissAlert();
    }

    async getAlertText(): Promise<string> {
        return await driver.getAlertText();
    }

    async dismissSavePasswordPrompt(): Promise<void> {
        try {
            await driver.waitUntil(() => driver.isAlertOpen(), {
                timeout: 5000,
                interval: 250,
            });
            const alertText = await this.getAlertText();
            if (/save password|password/i.test(alertText)) {
                await this.dismissAlert();
            }
        } catch {
            logInfo('BasePage: No save-password alert to dismiss');
        }
    }

    get languageToggle() {
        return $('~Header.languageToggle');
    }

    get homeTab() {
        return $('~TabBar.home');
    }

    get notificationsTab() {
        return $('~TabBar.notifications');
    }

    get settingsTab() {
        return $('~TabBar.settings');
    }

    selector(name: string) {
        return $(`~${name}`);
    }

    textField(name: string) {
        return $(`//XCUIElementTypeTextField[@name="${name}"]`);
    }

    async scrollToElement(element: ReturnType<typeof $>) {
        logStep('scrollToElement');
        await element.waitForExist();
        await this.scrollToElementIfExisting(element);
        await element.waitForDisplayed();
    }

    async scrollToElementIfExisting(element: ReturnType<typeof $>) {
        if ((await element.isExisting()) && !(await element.isDisplayed())) {
            const selectorStr = element.selector as unknown as string;

            if (typeof selectorStr === 'string' && selectorStr.startsWith('~')) {
                try {
                    await browser.execute('mobile: scroll', {
                        direction: 'down',
                        name: selectorStr.substring(1),
                    });
                    if (await element.isDisplayed()) {
                        return;
                    }
                } catch {
                    // fall through to the next scroll strategy
                }
            }

            const elementId = await element.elementId;

            try {
                await browser.execute('mobile: scrollToElement', {
                    element: elementId,
                });
                if (await element.isDisplayed()) {
                    return;
                }
            } catch {
                // fall through to the next scroll strategy
            }

            // 'mobile: scrollToElement' is missing on older XCUITest drivers (e.g. BrowserStack defaults)
            try {
                await browser.execute('mobile: scroll', {
                    elementId: elementId,
                    toVisible: true,
                });
                if (await element.isDisplayed()) {
                    return;
                }
            } catch {
                // fall back to swiping
            }

            for (let i = 0; i < 10; i++) {
                await browser.execute('mobile: swipe', { direction: 'up' });
                if (await element.isDisplayed()) {
                    return;
                }
            }
        }
    }

    async scrollAndClickIfExisting(element: ReturnType<typeof $>) {
        if (await element.isExisting()) {
            await this.scrollToElementIfExisting(element);
            await element.click();
        }
    }
}
