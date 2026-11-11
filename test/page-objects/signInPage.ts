import { BasePage } from './basePage.ts';
import { logStep } from '../common/logger.ts';

export class SignInPage extends BasePage {
    get heading() {
        return $('~SignIn.heading');
    }

    get emailLabel() {
        return $('//XCUIElementTypeStaticText[@name="SignIn.emailField"]');
    }

    get emailField() {
        return $('//XCUIElementTypeTextField[@name="SignIn.emailField"]');
    }

    get emailError() {
        return $('~SignIn.emailError');
    }

    get passwordLabel() {
        return $('//XCUIElementTypeStaticText[@name="Password"]');
    }

    get passwordField() {
        return $('~TextInputField.secureInput');
    }

    get passwordError() {
        return $('~SignIn.passwordError');
    }

    get signInError() {
        return $('~Sorry, there is a problem signing in. Try again later');
    }

    get passwordVisibilityToggle() {
        return $('~TextInputField.secureToggle');
    }

    get signInButton() {
        return $('~SignIn.signInButton');
    }

    get troubleSigningInHeading() {
        return $('~SignIn.troubleHeading');
    }

    get forgottenPasswordLink() {
        return $('~SignIn.forgottenPasswordLink');
    }

    get createAccountLink() {
        return $('~SignIn.createAccountLink');
    }

    get createAccountIcon() {
        return $('~chevron.right');
    }

    get vesselOwnerHeading() {
        return $('~Vessel owner:');
    }

    get vesselOwnerGuidance() {
        return $(
            '~You will receive an email invitation to register when your vessel is added to the system.',
        );
    }

    get skipperOrAgentHeading() {
        return $('~Skipper or agent:');
    }

    get skipperOrAgentGuidance() {
        return $('~Ask your vessel owner to add you. They can do this from their account.');
    }

    async enterEmail(email: string) {
        logStep('enterEmail with email: ' + email.substring(0, 3) + '***');
        await this.emailField.setValue(email);
    }

    async enterPassword(password: string) {
        logStep('entering password');
        await this.passwordField.setValue(password);
    }

    async togglePasswordVisibility() {
        logStep('togglePasswordVisibility');
        await this.passwordVisibilityToggle.click();
    }

    async signIn(email: string, password: string) {
        logStep('signIn flow start');
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.signInButton.click();
        await this.dismissSavePasswordPrompt();
    }

    async switchToWelsh() {
        logStep('switchToWelsh');
        await this.languageToggle.click();
    }

    async openForgottenPassword() {
        logStep('openForgottenPassword');
        await this.forgottenPasswordLink.click();
    }

    async openCreateAccount() {
        logStep('openCreateAccount');
        await this.createAccountLink.click();
        await this.vesselOwnerHeading.waitForDisplayed({ timeout: 10000 });
    }

    async tapCreateAccount(times: number) {
        logStep(`tapCreateAccount times=${String(times)}`);
        for (let i = 0; i < times; i++) {
            await this.createAccountLink.click();
        }
    }

    async tapSignIn(times = 1) {
        logStep(`tapSignIn times=${String(times)}`);
        for (let i = 0; i < times; i++) {
            // The button disappears once navigation to home has started
            if (!(await this.signInButton.isDisplayed())) {
                break;
            }
            await this.signInButton.click();
        }
    }
}

export default new SignInPage();
