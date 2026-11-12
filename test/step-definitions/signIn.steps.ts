import { Then, When } from '@wdio/cucumber-framework';
import { getIosTestCredentials } from '../helpers/testCredentials.ts';
import SignInPage from '../page-objects/signInPage.ts';
import type { CatchRecordWorld } from '../support/world.ts';

async function enterCredentials(world: CatchRecordWorld, email: string, password: string) {
    world.enteredEmail = email;
    world.enteredPassword = password;
    await SignInPage.enterEmail(email);
    await SignInPage.enterPassword(password);
}

Then('I should see the sign-in controls', async () => {
    await expect(SignInPage.heading).toBeDisplayed();
    await expect(SignInPage.emailField).toBeDisplayed();
    await expect(SignInPage.passwordField).toBeDisplayed();
    await expect(SignInPage.passwordVisibilityToggle).toBeDisplayed();
    await expect(SignInPage.signInButton).toBeDisplayed();
    await expect(SignInPage.forgottenPasswordLink).toBeDisplayed();
    await expect(SignInPage.createAccountLink).toBeDisplayed();
    await expect(SignInPage.createAccountIcon).toBeDisplayed();
});

When(
    'I enter the email {string} and password {string}',
    async function (this: CatchRecordWorld, email: string, password: string) {
        await enterCredentials(this, email, password);
    },
);

When('I enter the password {string}', async (password: string) => {
    await SignInPage.enterPassword(password);
});

Then('the entered email and password should be retained', async function (this: CatchRecordWorld) {
    expect(await SignInPage.emailField.getAttribute('value')).toBe(this.enteredEmail);
    // The password field is secure, so only its length is observable.
    expect((await SignInPage.passwordField.getAttribute('value'))?.length).toBe(
        this.enteredPassword.length,
    );
});

When('I tap the create an account link', async () => {
    await SignInPage.openCreateAccount();
});

Then('I should see the create an account guidance', async () => {
    await expect(SignInPage.vesselOwnerHeading).toBeDisplayed();
    await expect(SignInPage.vesselOwnerGuidance).toBeDisplayed();
    await expect(SignInPage.skipperOrAgentHeading).toBeDisplayed();
    await expect(SignInPage.skipperOrAgentGuidance).toBeDisplayed();
});

Then('I should not see the create an account guidance', async () => {
    await expect(SignInPage.vesselOwnerHeading).not.toBeDisplayed();
    await expect(SignInPage.vesselOwnerGuidance).not.toBeDisplayed();
    await expect(SignInPage.skipperOrAgentHeading).not.toBeDisplayed();
    await expect(SignInPage.skipperOrAgentGuidance).not.toBeDisplayed();
});

When('I tap the create an account link again', async () => {
    await SignInPage.tapCreateAccount(1);
});

When('I tap the create an account link {int} times', async (times: number) => {
    await SignInPage.tapCreateAccount(times);
});

When('I enter the email {string}', async function (this: CatchRecordWorld, email: string) {
    this.enteredEmail = email;
    await SignInPage.enterEmail(email);
});

Then('the password should be masked', async function (this: CatchRecordWorld) {
    expect(await SignInPage.passwordField.getAttribute('type')).toBe(
        'XCUIElementTypeSecureTextField',
    );
    expect(await SignInPage.passwordField.getAttribute('value')).not.toBe(this.enteredPassword);
});

When('I tap the sign in button', async () => {
    await SignInPage.tapSignIn();
});

When('I tap the sign in button {int} times', async (times: number) => {
    await SignInPage.tapSignIn(times);
    await SignInPage.dismissSavePasswordPrompt();
});

When('I enter valid credentials', async function (this: CatchRecordWorld) {
    const { email, password } = getIosTestCredentials();
    await enterCredentials(this, email, password);
});

When('I sign in with valid credentials', async () => {
    const { email, password } = getIosTestCredentials();
    await SignInPage.signIn(email, password);
});

When('I sign in with the valid email in upper case', async () => {
    const { email, password } = getIosTestCredentials();
    await SignInPage.signIn(email.toUpperCase(), password);
});

When('I sign in with the valid email surrounded by spaces', async () => {
    const { email, password } = getIosTestCredentials();
    await SignInPage.signIn(`  ${email}  `, password);
});

Then('I should see the sign-in error message', async () => {
    await expect(SignInPage.signInError).toBeDisplayed();
});

Then('I should not see the sign-in error message', async () => {
    await expect(SignInPage.signInError).not.toBeDisplayed();
});

Then('I should see the email validation error', async () => {
    await expect(SignInPage.emailError).toBeDisplayed();
});

Then('I should not see the email validation error', async () => {
    await expect(SignInPage.emailError).not.toBeDisplayed();
});

Then('I should see the password validation error', async () => {
    await expect(SignInPage.passwordError).toBeDisplayed();
});

Then('I should not see the password validation error', async () => {
    await expect(SignInPage.passwordError).not.toBeDisplayed();
});

When('I rotate the device to {word}', async (orientation: string) => {
    await driver.setOrientation(orientation.toUpperCase());
});
